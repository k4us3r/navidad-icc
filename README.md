# Navidad ICC · UNICAH

Postal navideña digital, diseñada primero para teléfonos y lista para publicarse con GitHub Pages. No necesita instalación, dependencias ni proceso de compilación.

## Verla localmente

Abre `index.html` directamente o sirve esta carpeta con cualquier servidor estático. Por ejemplo:

```powershell
python -m http.server 4173
```

Después visita `http://localhost:4173`.

## Publicarla en GitHub Pages

1. Crea un repositorio vacío en GitHub.
2. Sube el contenido de esta carpeta a las ramas `main` o `master`.
3. En **Settings → Pages**, selecciona **GitHub Actions** como origen.
4. El flujo incluido en `.github/workflows/pages.yml` publicará el sitio automáticamente.

La URL final tendrá normalmente el formato `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/` y es la que debe usarse al crear el código QR.

## Personalización rápida

- Mensaje y textos: `index.html`
- Colores, tamaños y animaciones: `styles.css`
- Nieve y destellos interactivos: `script.js`
- Logotipos: carpeta `assets/`

