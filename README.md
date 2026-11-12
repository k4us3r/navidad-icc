# Navidad ICC · UNICAH

Experiencia navideña digital, diseñada primero para teléfonos y publicada con GitHub Pages. Incluye una bienvenida institucional y un creador de muñecos de nieve pixel art. No necesita instalación, dependencias ni proceso de compilación.

## Experiencia interactiva

- Personalización en tiempo real de cuerpo, ojos, nariz, boca, sombrero, bufanda, brazos, detalles y escenario.
- Generador aleatorio y guardado local del progreso.
- Nombre personalizado con compatibilidad para español.
- Postal PNG de 1080 × 1920 píxeles generada completamente en el navegador.
- Descarga directa, alternativa para iOS y Web Share API para compartir el archivo.
- Interfaz táctil mobile-first y soporte para `prefers-reduced-motion`.

## Verla localmente

Abre `index.html` directamente o sirve esta carpeta con cualquier servidor estático. Por ejemplo:

```powershell
python -m http.server 4173
```

Después visita `http://localhost:4173`.

## Publicarla en GitHub Pages

El repositorio utiliza el flujo incluido en `.github/workflows/pages.yml`. Cada cambio enviado a `main` o `master` publica automáticamente una nueva versión.

La URL final tendrá normalmente el formato `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/` y es la que debe usarse al crear el código QR.

## Personalización rápida

- Mensaje y textos: `index.html`
- Colores, tamaños y animaciones: `styles.css`
- Nieve y destellos interactivos: `script.js`
- Creador de muñecos: `crear.html`, `crear.css` y `crear.js`
- Logotipos: carpeta `assets/`

