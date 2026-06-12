# -*- coding: utf-8 -*-
"""Reemplaza el logo SVG generico 'PT' (data URI) por el logo real de la
marca (/favicon-96x96.png) en todas las paginas, en header y footer."""
import glob
import re

# Solo los data-URI del circulo con texto PT (no toca otros SVG si los hay)
PATRON = re.compile(r'src="data:image/svg\+xml,[^"]*%3EPT%3C[^"]*"')
REEMPLAZO = 'src="/favicon-96x96.png"'

total_paginas, total_logos = 0, 0
for ruta in glob.glob("**/*.html", recursive=True):
    with open(ruta, encoding="utf-8") as f:
        h = f.read()
    nuevos, n = PATRON.subn(REEMPLAZO, h)
    if n:
        nuevos = nuevos.replace('alt="Logo"', 'alt="Páginas Web Total"')
        with open(ruta, "w", encoding="utf-8") as f:
            f.write(nuevos)
        total_paginas += 1
        total_logos += n

print(f"Paginas actualizadas: {total_paginas} | logos reemplazados: {total_logos}")
