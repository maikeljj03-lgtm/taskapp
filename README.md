# TaskApp

Aplicación híbrida para organizar tareas académicas, desarrollada con Ionic, Angular y Capacitor.

## Requisitos

- Node.js en una versión LTS compatible con Angular y npm.
- Ionic CLI.
- Git, si vas a clonar el repositorio.

## Instalar y ejecutar en desarrollo

Abre una terminal en la carpeta del proyecto, donde está `package.json`, y ejecuta:

```bash
npm install
ionic serve
```

Ionic iniciará el servidor de desarrollo y mostrará la dirección local, normalmente `http://localhost:8100`.

### Comandos para Windows PowerShell

Si PowerShell bloquea `npm.ps1` o `ionic.ps1`, usa los ejecutables `.cmd`:

```powershell
npm.cmd install
ionic.cmd serve
```

Si Ionic CLI todavía no está instalado, instálalo una vez con:

```powershell
npm.cmd install -g @ionic/cli
```

Después de instalar Node.js, abre una terminal nueva para que Windows actualice el PATH.

## Funciones

- Consultar tareas con título, descripción y prioridad alta, media o baja.
- Crear tareas mediante un formulario reactivo con validación del título.
- Marcar tareas como completadas o eliminarlas.
- Guardar y recuperar los cambios con `localStorage`.

## Estructura principal

```text
src/app/
├── home/                 # Página principal y lista de tareas
├── models/tarea.ts       # Modelo e información de prioridad
├── services/             # Operaciones y persistencia de tareas
└── tarea-form/           # Componente del formulario de creación
```

## Preparar la app Android (opcional)

El proyecto incluye la plataforma Android de Capacitor. Para abrirla se requiere Android Studio con el SDK de Android instalado:

```bash
ionic build
npx cap sync android
npx cap open android
```

## GitHub

La carpeta `node_modules` no se debe subir al repositorio; está excluida en `.gitignore`. Las dependencias se instalan de nuevo con `npm install` a partir de `package.json` y `package-lock.json`.
