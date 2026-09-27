# Mantenimiento

## Organización

- `src/pages/`: páginas; registrar rutas en `src/App.tsx` y metadatos en `src/data/seo.json`.
- `src/components/`: componentes compartidos. `ui/` contiene primitivas y `v2/` la experiencia actual.
- `src/constants/`: precios, contacto y configuración pública.
- `src/data/`: contenido de clientes, retos, eventos y colaboraciones.
- `src/assets/`: imágenes importadas por la aplicación y originales necesarios para regenerarlas.
- `public/`: archivos accesibles directamente desde la web. Nunca guardar documentos privados aquí.
- `scripts/`: generación de recursos y comprobaciones reproducibles; no herramientas temporales.
- `docs/`: instrucciones vigentes de mantenimiento, revisión y versiones.
- `local/` y `qa.local/`: notas, capturas y pruebas locales, excluidas de Git.

Las licencias y archivos `SOURCES.md` se conservan junto a sus recursos. El código y la documentación de V1 siguen disponibles en sus tags; consultar [VERSIONES.md](VERSIONES.md).

## Formulario

Las variables públicas disponibles están en [`.env.example`](../.env.example). Usar `.env.local` para configuración local y Repository Variables para Actions. La configuración `VITE_*` se incluye en el navegador: no sirve para ocultar secretos.

La plantilla EmailJS debe aceptar `from_name`, `from_email`, `phone` y `message`, con destinatario fijo. Revisar los parámetros efectivos en `src/pages/Contact.tsx` y `src/pages/Checkout.tsx` al cambiar la plantilla. Restringir los orígenes, revisar cuotas y configurar las credenciales privadas exclusivamente en el proveedor. Si se activa CAPTCHA, su clave secreta nunca debe estar en el frontend.

`npm run test:site` intercepta EmailJS; no confirma entrega real de correo. Cualquier prueba real debe ser deliberada y usar datos de prueba autorizados.

## Antes de publicar

1. Ejecutar `npm run check:repo`, `npm run typecheck`, `npm run lint -- --quiet`, `npm run build` y `npm run test:site`.
2. Revisar `git status --short` y `git diff`. Añadir rutas concretas, no todo el directorio indiscriminadamente.
3. Revisar `git diff --cached --stat` y `git diff --cached` antes del commit.
4. No incluir credenciales, bases de datos, exportaciones de clientes, HAR, capturas privadas ni registros de formularios. Los datos públicos de la web son intencionadamente públicos.

El control de repositorio detecta nombres de archivo de riesgo y algunos patrones conocidos de claves; no garantiza ausencia de información sensible ni analiza el historial remoto. `.gitignore` tampoco elimina archivos ya publicados. Ante una credencial filtrada, revocarla o rotarla primero y coordinar la limpieza del historial por separado; no reescribir tags de versiones sin evaluar su recuperación.
