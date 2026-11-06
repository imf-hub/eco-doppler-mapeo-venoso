# Instalación en Hostinger

1. Construir con `npm ci` y `npm run build` si se parte del código fuente. El paquete entregado ya contiene la versión construida.
2. Abrir el administrador de archivos del sitio en Hostinger.
3. Subir y extraer `imf-eco-doppler-hostinger.zip` en `public_html` (o la subcarpeta elegida).
4. Verificar que `index.html`, `assets/`, `media/`, `favicon.svg` y los avisos de licencias queden directamente en esa ubicación.
5. Abrir el dominio con HTTPS. Probar fundamentos, ecógrafo, anatomía 3D, cartografía y exportaciones.

El ZIP contiene los archivos del sitio, no una carpeta adicional envolvente. Los recursos usan rutas relativas. No hace falta una base de datos, variables de entorno, claves ni un servicio Node en producción. Si se usa una carpeta existente, revisar los archivos que contiene antes de sustituirlos.

No se ha realizado aquí una instalación en Hostinger: la cuenta, el dominio y el destino no se han proporcionado para esta entrega. El sitio usa el almacenamiento del navegador; no existe una base central de alumnos.

## Publicar una actualización

Cambiar el contenido, ejecutar pruebas y construir. Volver a subir el contenido de `dist/`. Los archivos con nombre nuevo evitan conservar código anterior en caché. Conservar una copia de la versión anterior para reversión.

## Verificación académica

La revisión documental se realizó el 6 de noviembre de 2026. Antes de su adopción formal, un docente debe revisar las reglas cartográficas, maniobras, nomenclatura y ejemplos con el protocolo de su laboratorio. La plataforma no está validada para diagnóstico, tratamiento o certificación de competencia.
