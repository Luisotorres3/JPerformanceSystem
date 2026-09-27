<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="src/assets/jps-white.webp" />
  <img src="src/assets/jps-dark.webp" alt="J Performance System" width="220" />
</picture>

# J Performance System

**La web de entrenamiento personal de Juan Pasquau.**

Running, fuerza y preparación física, con una experiencia centrada en elegir un plan y dar el primer paso.

[Web actual](https://jperformancesystem.es/) · [Explorar V1](https://jperformancesystem.es/v1/) · [Releases](https://github.com/Luisotorres3/JPerformanceSystem/releases) · [Documentación](docs/VERSIONES.md)

[![Revisión](https://github.com/Luisotorres3/JPerformanceSystem/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Luisotorres3/JPerformanceSystem/actions/workflows/ci.yml)
[![Publicación](https://github.com/Luisotorres3/JPerformanceSystem/actions/workflows/pages.yml/badge.svg)](https://github.com/Luisotorres3/JPerformanceSystem/actions/workflows/pages.yml)
[![Última release](https://img.shields.io/github/v/release/Luisotorres3/JPerformanceSystem)](https://github.com/Luisotorres3/JPerformanceSystem/releases/latest)

</div>

---

## El proyecto

Sitio web responsive que presenta el trabajo de Juan Pasquau y permite consultar sus servicios, conocer a sus clientes y contactar con un objetivo concreto. La V2 combina la identidad blanca, azul y dorada de JPS con navegación compacta, imágenes propias y contenido organizado por necesidades de entrenamiento.

- **Planes personalizados:** running, gimnasio, gimnasio + carrera y oposiciones; packs de entrenamiento y nutrición con JF Nutrición.
- **Precios y bienvenida:** selección mensual, trimestral y semestral, descuentos y regalo correspondiente a cada duración.
- **Clientes, retos y eventos:** galería de clientes, objetivos de running y fuerza y enlaces para añadir eventos al calendario.
- **Contacto con contexto:** las solicitudes conservan el reto o motivo de consulta; formulario validado y acceso a WhatsApp.
- **Reserva de entrevista:** resumen del plan e integración con Calendly, sin cobro al reservar.
- **Experiencia cuidada:** estados de carga, imágenes optimizadas, navegación adaptable y metadatos por página.

## Versiones disponibles

| Versión                   | Acceso                                                     | Referencia                                                                                                 |
| ------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **V2 actual**             | [Abrir la web](https://jperformancesystem.es/)             | `main`; release [`v2.0.0`](https://github.com/Luisotorres3/JPerformanceSystem/releases/tag/v2.0.0)       |
| **V1 histórica**          | [Abrir la vista previa](https://jperformancesystem.es/v1/) | `version/v1`; release [`v1.0.0`](https://github.com/Luisotorres3/JPerformanceSystem/releases/tag/v1.0.0) |
| **V1 original publicada** | Restauración desde Actions                                 | Tag `v1-pages-snapshot`; copia descargable en la release V1                                                |

La vista previa de V1 se compila desde su código conservado, con recursos aislados en `/v1/`. El snapshot mantiene los archivos originales para una restauración exacta. **V1 contiene información y precios históricos, no la oferta comercial vigente.**

Cambiar la versión publicada no borra código ni modifica el historial de `main`. Consulta la [guía de versiones y restauración](docs/VERSIONES.md).

## Tecnología

| Área                  | Herramientas                                              |
| --------------------- | --------------------------------------------------------- |
| Aplicación            | React 18, TypeScript, Vite                                |
| Interfaz              | Tailwind CSS, Radix UI / shadcn/ui, Lucide, Framer Motion |
| Navegación            | React Router; rutas limpias en V2 y HashRouter en V1      |
| Contacto y validación | EmailJS, Zod, Calendly                                    |
| Calidad               | ESLint, Prettier, Playwright, axe-core                    |
| Publicación           | GitHub Actions y GitHub Pages con dominio propio y HTTPS  |

Las dependencias exactas están en [`package.json`](package.json) y [`package-lock.json`](package-lock.json).

## Empezar en local

**Requisitos:** Node.js 22 y npm. CI utiliza `package-lock.json` como referencia de instalación.

```sh
git clone https://github.com/Luisotorres3/JPerformanceSystem.git
cd JPerformanceSystem
npm ci
npm run dev
```

Vite utiliza por defecto **http://127.0.0.1:8080**. Si el puerto está ocupado, consulta la dirección que muestra la terminal.

### Configuración

Las integraciones opcionales se documentan en [`.env.example`](.env.example). Para personalizarlas localmente, utiliza `.env.local`, excluido de Git.

| Variables                                                                        | Uso                                                                               |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` | Identificadores públicos de EmailJS; existen valores de respaldo en la aplicación |
| `VITE_GA_MEASUREMENT_ID`                                                         | Analítica opcional, condicionada al consentimiento                                |
| `VITE_RECAPTCHA_SITE_KEY`                                                        | Clave pública de reCAPTCHA v2; requiere configuración adicional en EmailJS        |

**Todo valor `VITE_*` es visible en el navegador. Nunca debe contener contraseñas, tokens privados ni la clave secreta de CAPTCHA.** En Actions se utilizan Repository Variables con los mismos nombres. Sin configuración real, GA4 y CAPTCHA permanecen desactivados.

## Comandos habituales

| Comando             | Función                                                                  |
| ------------------- | ------------------------------------------------------------------------ |
| `npm run dev`       | Iniciar el servidor de desarrollo                                        |
| `npm run typecheck` | Comprobar los tipos de la aplicación y la configuración                  |
| `npm run lint`      | Revisar el código con ESLint                                             |
| `npm run build`     | Generar `dist/`, entradas HTML por ruta, metadatos, sitemap y página 404 |
| `npm run preview`   | Servir localmente el build de producción                                 |
| `npm run test:site` | Revisar el build con navegador, accesibilidad y pruebas funcionales      |
| `npm run deploy`    | Solicitar la publicación de `main` mediante GitHub CLI autenticado       |

## Verificación

```sh
npm run typecheck
npm run lint -- --quiet
npm run build
npx playwright install chromium
npm run test:site
```

Las pruebas arrancan y detienen su propio servidor de preview. Comprueban rutas, enlaces internos, imágenes, desbordamientos, accesibilidad automatizada, selección de planes y regalos, reserva y validación del formulario.

- Resoluciones de revisión: **320, 390, 768 y 1440 px**.
- Envíos de EmailJS **simulados**, sin mensajes reales.
- Capturas e informes en `qa.local/`, excluidos del repositorio.
- En CI, los resultados se adjuntan a la ejecución como artefactos.

En Windows se utiliza Edge por defecto. Para usar Chromium, define `BROWSER_CHANNEL=chromium` antes de ejecutar las pruebas. `TEST_PORT` permite cambiar el puerto de preview, cuyo valor predeterminado es `4175`.

El [informe de revisión](docs/REVISION-V2.md) detalla el alcance y los límites. Las pruebas automatizadas no equivalen a una certificación legal, de seguridad o de accesibilidad. Los avisos de dependencias pendientes se siguen en la [incidencia #12](https://github.com/Luisotorres3/JPerformanceSystem/issues/12).

## Publicación y restauración

La publicación es **manual e independiente del merge**. Integrar cambios no sobrescribe automáticamente una versión restaurada.

1. Abrir [Actions → Publish website](https://github.com/Luisotorres3/JPerformanceSystem/actions/workflows/pages.yml).
2. Pulsar **Run workflow** y mantener la rama **`main`**.
3. Elegir la versión y ejecutar el workflow.

| Opción              | Resultado                                                     |
| ------------------- | ------------------------------------------------------------- |
| `main`              | Publica el código actual e incluye la vista previa V1         |
| `v2.0.0`            | Publica la release inicial de V2 e incluye la vista previa V1 |
| `v1-pages-snapshot` | Restaura exactamente la web original V1                       |

Cada despliegue V2 compila y ejecuta las pruebas antes de publicar. Restaurar V1 utiliza los archivos conservados, sin instalar dependencias antiguas. Tras restaurar V1 en la raíz, la vista previa `/v1/` deja de estar disponible hasta volver a V2.

No utilizar el antiguo comando `gh-pages -d dist`: la publicación se gestiona desde Actions. Las instrucciones completas, incluidos comandos de GitHub CLI y trabajo local con ambas versiones, están en [VERSIONES.md](docs/VERSIONES.md).

## Estructura del repositorio

```text
.github/workflows/    Revisión de PR y publicación reversible
docs/                Operación, versiones e informe de revisión
public/              Archivos públicos, fuentes y configuración del dominio
scripts/             Generación estática, pruebas y empaquetado de V1
src/
  assets/            Fotografías, logos y recursos de marca
  components/        Componentes compartidos, UI y experiencia V2
  constants/         Planes, precios, contacto y configuración
  data/              Clientes, retos, eventos y metadatos
  lib/               Utilidades y validación
  pages/             Páginas y rutas
  styles/            Estilos globales y por sección
```

`dist/`, `node_modules/`, archivos de entorno y resultados locales no se versionan. Las notas privadas y entregables temporales deben guardarse en `local/` o `qa.local/`, excluidos de Git. La documentación histórica se conserva en los tags de V1, no se duplica en `main`.

La [guía de mantenimiento](docs/MANTENIMIENTO.md) recoge dónde editar cada contenido, configurar el formulario y revisar archivos antes de publicarlos. Ejecuta `npm run check:repo` antes de una PR: comprueba archivos excluidos y patrones de credenciales sin mostrar sus valores. No sustituye una auditoría del historial ni un detector completo de secretos.

## Flujo de cambios

Crear una rama desde `main`, mantener los commits enfocados y abrir una pull request. La revisión de Actions debe pasar antes de integrar. Los tags de release se conservan sin sobrescribirlos; las siguientes entregas deben usar nuevas versiones.

## Créditos

**J Performance System** · Entrenamiento personal de **Juan Pasquau**.

Diseño y desarrollo web por **[Luis Soto Torres · Luisotorres3](https://luisotorres3.github.io/)**.

Las referencias de recursos de terceros se conservan junto a los [recursos de planes](src/assets/plans/SOURCES.md), los [medios de pago](src/assets/payments/SOURCES.md) y la [licencia de la tipografía](public/fonts/ANTON-LICENSE.txt).
