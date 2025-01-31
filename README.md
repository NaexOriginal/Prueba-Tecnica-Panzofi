# Panzofi - Prueba Técnica

## 📌 Descripción del Proyecto

Este proyecto es una aplicación web que permite gestionar la actividad de 35 usuarios dentro de un sistema administrado. Se implementa un sistema de autenticación con JWT, roles de usuario (ADMIN y USER) y registro de actividad, incluyendo inicio de sesión, tiempo de conexión y clics en botones.

- **Backend:** Django + Django REST Framework
- **Frontend:** React + Tailwind CSS
- **Base de Datos:** SQLite (por defecto en Django)
- **Autenticación:** JWT (JSON Web Token)
- **Gráficas:** Chart.js

## 🚀 Instalación y Ejecución

### 🔧 Requisitos Previos

- Python 3.9+
- Node.js 18+
- Git
- Table Plus (Recomendado)

### 🖥️ Configuración del Backend

```sh
# Clonar el repositorio
$ git clone <URL_DEL_REPO>
$ cd backend

# Crear y activar un entorno virtual
$ python -m venv venv
$ source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
$ pip install -r requirements.txt

# Configurar variables de entorno
$ cp .env.example .env
# Editar .env con credenciales de base de datos

# Aplicar migraciones
$ python manage.py migrate

# Ejecutar servidor
$ python manage.py runserver
```

### 🌐 Configuración del Frontend

Se puede utilizar cualquier gestor de dependencias (`npm`, `yarn`, `bun`), pero se recomienda usar `Bun` por su rapidez y eficiencia.

```sh
# Ir a la carpeta del frontend
$ cd frontend

# Instalar dependencias
$ npm install

# Configurar variables de entorno
$ cp .env.example .env
# Editar .env con la URL del backend

# Ejecutar en modo desarrollo
$ npm run dev
```

## 📂 Estructura del Proyecto

```
Panzofi/
│── backend/       # Backend con Django
│   ├── admin_console/  # Aplicación principal
│   ├── users/     # Aplicación secundaria (módulo de usuarios)
│   ├── manage.py
│   ├── db.sqlite3
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   ├── correos.txt
│   ├── script.py
│
│── frontend/      # Frontend con React
│   ├── public/
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── hooks/        # Hooks personalizados
│   │   ├── pages/        # Páginas principales
│   │   ├── routes/       # Configuración de rutas
│   │   ├── index.css     # Estilos globales
│   │   ├── main.jsx      # Entrada principal de React
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── eslint.config.js
│   ├── bun.lock
|
|── .gitignore
|── README.md
```

## 🖥️ Backend (Django)

### 📌 Modelos de Base de Datos

- **CustomUser:** Modelo de usuario con UUID, email y roles (`ADMIN`, `USER`).
- **SessionLog:** Registra inicio y cierre de sesión.
- **ButtonClick:** Registra los clics de los usuarios en los botones.

### 📌 Endpoints Principales

| Método | Ruta                   | Descripción                     |
| ------ | ---------------------- | ------------------------------- |
| `POST` | `/users/login/`        | Inicia sesión y devuelve el JWT |
| `GET`  | `/users/list-users/`   | Lista usuarios y su actividad   |
| `POST` | `/users/button-click/` | Registra clic en botones        |
| `POST` | `/users/logout/`       | Cierra sesión                   |

### 📌 Flujo de Autenticación

1. El usuario ingresa su **email y contraseña** en el login.
2. Si las credenciales son correctas, el backend genera un **JWT**.
3. El frontend almacena el JWT y permite el acceso a las rutas protegidas.
4. El backend valida el JWT en cada solicitud y devuelve los datos del usuario.
5. El usuario puede cerrar sesión, eliminando el JWT.

## 🖥️ Creación de Usuarios y Acceso a la Base de Datos

### 📌 Ejecución del Script de Creación de Usuarios

Para generar los 35 usuarios regulares y el usuario administrador, se debe ejecutar el script `script.py` dentro del backend. Este script creará automáticamente los usuarios con sus credenciales en la base de datos.

```sh
$ python backend/script.py
```

Esto asegurará que los usuarios ya estén creados y listos para autenticarse en el sistema.

### 📌 Acceso a la Base de Datos

Dado que se están utilizando **Custom Users**, la interfaz predeterminada de administración de Django (`/admin`) **no estará funcional**. Por esta razón, se recomienda el uso de **Table Plus** para acceder y gestionar la base de datos de una manera más segura y visual.

---

✉️ **Desarrollado por:**  *Rafael Piedrahita*

