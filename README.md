# 🍋 Lemoncode - Master Continuo - Módulo 8: Cloud - Manual

Este repositorio contiene la solución del laboratorio del **Módulo 8 (Cloud - Manual)** del Master Front-End Continuo de Lemoncode.

Base de este proyecto: **Entregable 4 de Angular** del Módulo 4.

## 👤 Información del Estudiante

* **Nombre Completo:** Cristian Moreno

---

## 🚀 Despliegue en GitHub Pages

### Página en Vivo
🌐 **[Acceder a la aplicación](https://cmoreno-dev.github.io/lemoncode-master-continuo-laboratorio-m8-cloud-manual/#/home)**

### 📝 Enunciado del Ejercicio

Desplegar en Github Pages de forma manual:
- Tenemos un repo en Github.
- Queremos desplegar una app.
- Realizar el despliegue manual.

### 🔧 Pasos Realizados para el Despliegue Manual

#### 1. **Configurar HashLocationStrategy**
Para que GitHub Pages funcione correctamente con el routing de Angular, es necesario usar `HashLocationStrategy` en lugar de `PathLocationStrategy`:

- Archivo: `src/app/app.config.ts`
- Se agregó:
  ```typescript
  import { HashLocationStrategy, LocationStrategy } from '@angular/common';
  
  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(rutas),
      provideAnimations(),
      { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
  };
  ```
- **Razón:** GitHub Pages no soporta rutas sin hash en cliente-side routing. Con esta configuración, las URLs usarán formato `/#/dashboard` en lugar de `/dashboard`.

#### 2. **Actualizar el Base Href**
Para que los recursos (JS, CSS, imágenes) se carguen correctamente desde el subdirectorio:

- Archivo: `src/index.html`
- Se cambió:
  ```html
  <base href="/lemoncode-master-continuo-laboratorio-m8-cloud-manual/">
  ```
- **Razón:** El proyecto se aloja en un subdirectorio de GitHub Pages, no en la raíz.

#### 3. **Compilar la Aplicación**
Ejecutar el build de Angular:
```bash
npm run build
```
- Esto genera los archivos compilados en: `dist/mini-app/browser/`
- Archivos generados:
  - `index.html` (HTML principal con base href actualizado)
  - `main-*.js` (código de la aplicación)
  - `polyfills-*.js` (polyfills del navegador)
  - `styles-*.css` (estilos compilados)
  - `favicon.ico` (icono de la pestaña)
  - `assets/` (imágenes y recursos estáticos)

#### 4. **Crear la Rama gh-pages**
Crear una rama huérfana limpia (sin historial):
```bash
git checkout --orphan gh-pages
git rm -rf .
```
- **Ventaja:** La rama gh-pages queda limpia, sin archivo de desarrollo (src/, node_modules/, package.json, etc.)

#### 5. **Copiar Archivos Imprescindibles**
Del directorio `dist/mini-app/browser/` se copiaron solo los archivos necesarios:
- ✅ `index.html`
- ✅ `main-*.js`
- ✅ `polyfills-*.js`
- ✅ `styles-*.css`
- ✅ `favicon.ico`
- ✅ `assets/` (carpeta completa con imágenes)
- ❌ `3rdpartylicenses.txt` (no necesario)
- ❌ `node_modules/` (excluido mediante `.gitignore`)
- ❌ `src/` (excluido)
- ❌ `package.json` (excluido)

#### 6. **Crear Archivo .nojekyll**
Crear un archivo vacío `.nojekyll` en la raíz de la rama gh-pages:
```bash
echo > .nojekyll
```
- **Razón:** GitHub Pages usa Jekyll por defecto, este archivo lo desactiva. Necesario para que Angular funcione correctamente.

#### 7. **Crear .gitignore para gh-pages**
Crear archivo `.gitignore` con:
```
node_modules/
dist/
.angular/
src/
*.json
*.txt
!assets/
```
- Esto evita que se suban archivos innecesarios a la rama gh-pages.

#### 8. **Hacer Commit en rama gh-pages**
Agregar todos los archivos imprescindibles y hacer commit:
```bash
git add .gitignore .nojekyll index.html favicon.ico *.js *.css assets/
git commit -m "Deploy to GitHub Pages - Initial release"
```

#### 9. **Push a Rama Remota gh-pages**
Subir la rama a GitHub:
```bash
git push -u origin gh-pages
```

#### 10. **Configurar GitHub Pages en Repositorio**
En la página del repositorio en GitHub:
1. Ir a **Settings** → **Pages**
2. En **Source** seleccionar:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
3. Click en **Save**
4. Esperar 2-5 minutos para que GitHub genere el sitio
5. El URL aparecerá en el banner: `https://cmoreno-dev.github.io/lemoncode-master-continuo-laboratorio-m8-cloud-manual/`

---