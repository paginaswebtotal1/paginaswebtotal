# -*- coding: utf-8 -*-
"""Inserta las etiquetas de favicon en el <head> de todas las paginas HTML.
Idempotente: si la pagina ya referencia favicon.ico, no la toca."""
import glob
import re

BLOQUE = """<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">"""

actualizadas, ya_tenian = 0, 0
for ruta in glob.glob("**/*.html", recursive=True):
    with open(ruta, encoding="utf-8") as f:
        h = f.read()
    if "favicon.ico" in h:
        ya_tenian += 1
        continue
    # Insertar despues del <meta charset> si existe; si no, tras <head>
    m = re.search(r"<meta\s+charset=[^>]*>", h, re.IGNORECASE)
    if m:
        nuevo = h[:m.end()] + "\n" + BLOQUE + h[m.end():]
    else:
        m = re.search(r"<head[^>]*>", h, re.IGNORECASE)
        if not m:
            print(f"  SIN <head>: {ruta} (omitida)")
            continue
        nuevo = h[:m.end()] + "\n" + BLOQUE + h[m.end():]
    with open(ruta, "w", encoding="utf-8") as f:
        f.write(nuevo)
    actualizadas += 1

print(f"Paginas actualizadas: {actualizadas} | ya tenian favicon: {ya_tenian}")
