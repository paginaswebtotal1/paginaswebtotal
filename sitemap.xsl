<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Sitemap · Páginas Web Total</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;800&amp;family=Plus+Jakarta+Sans:wght@400;600&amp;display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#0a0a0f;color:#e2e8f0;padding:2rem 1rem}
.wrap{max-width:1000px;margin:0 auto}
h1{font-family:'Space Grotesk',sans-serif;font-size:1.8rem;font-weight:800}
h1 b{color:#ccff00}
.sub{color:#a0aec0;margin:.4rem 0 1.5rem;font-size:.95rem}
.count{display:inline-block;background:#111827;border:1px solid #1f2937;border-radius:8px;padding:.4rem .9rem;color:#ccff00;font-weight:700;margin-bottom:1.5rem}
table{width:100%;border-collapse:collapse;background:#111827;border:1px solid #1f2937;border-radius:12px;overflow:hidden}
th{background:#1e293b;text-align:left;padding:.8rem 1rem;font-family:'Space Grotesk',sans-serif;font-size:.85rem;color:#cbd5e1}
td{padding:.7rem 1rem;border-top:1px solid #1f2937;font-size:.9rem;vertical-align:top}
td a{color:#ccff00;text-decoration:none;word-break:break-all}
td a:hover{text-decoration:underline}
.lang{color:#b967ff;font-weight:600}
.muted{color:#64748b;font-size:.82rem}
footer{color:#475569;font-size:.8rem;margin-top:1.5rem;text-align:center}
</style>
</head>
<body>
<div class="wrap">
<h1>Páginas Web <b>Total</b> · Sitemap</h1>
<p class="sub">Mapa del sitio para buscadores y motores de IA. Generado automáticamente.</p>
<div class="count"><xsl:value-of select="count(s:urlset/s:url)"/> URLs indexadas</div>
<table>
<tr><th>URL</th><th>Idiomas</th><th>Última modificación</th><th>Prioridad</th></tr>
<xsl:for-each select="s:urlset/s:url">
<tr>
<td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
<td><span class="lang"><xsl:value-of select="count(xhtml:link)"/></span> <span class="muted">hreflang</span></td>
<td class="muted"><xsl:value-of select="s:lastmod"/></td>
<td class="muted"><xsl:value-of select="s:priority"/></td>
</tr>
</xsl:for-each>
</table>
<footer>https://paginaswebtotal.com · Sitemap protocol 0.9 + hreflang + image</footer>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
