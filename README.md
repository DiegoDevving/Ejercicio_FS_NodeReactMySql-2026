# Sistema Punto de Venta (POS)

Aplicación web de Punto de Venta desarrollada con **Node.js**, **Express**, **React (Vite)** y **MySQL**.

## Tecnologías utilizadas

### Backend

* Node.js
* Express
* MySQL2
* Cors
* Dotenv

### Frontend

* React
* Vite
* Axios

### Base de datos

* MySQL Server 8.x
* MySQL Workbench

---

# Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js 18 o superior
* MySQL Server
* MySQL Workbench (opcional)
* Git (opcional)

---

# Clonar el proyecto

```bash
git clone <url-del-repositorio>
```

Entrar a la carpeta del proyecto:

```bash
cd punto-de-venta
```

---

# Configuración de la base de datos

Ingresar a MySQL y crear la base de datos:

```sql
CREATE DATABASE pos_db;

USE pos_db;
```

Crear las tablas:

```sql
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(20) DEFAULT 'efectivo'
);

CREATE TABLE venta_detalle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
```

Agregar algunos productos de prueba:

```sql
INSERT INTO productos(nombre, precio, stock, categoria)
VALUES
('Laptop Lenovo',15000,5,'Computadoras'),
('Mouse Logitech',350,20,'Periféricos'),
('Teclado Redragon',900,15,'Periféricos');
```

---

# Configuración del Backend

Entrar a la carpeta del backend.

```bash
cd backend
```

Instalar dependencias.

```bash
npm install
```

Si se requiere instalar manualmente:

```bash
npm install express mysql2 cors dotenv
```

Crear el archivo **.env**

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=pos_db

PORT=5000
```

Iniciar el servidor.

```bash
npm start
```

El backend estará disponible en:

```
http://localhost:5000
```

---

# Configuración del Frontend

Abrir otra terminal.

Entrar a la carpeta del frontend.

```bash
cd backend/frontend
```

Instalar dependencias.

```bash
npm install
```

Instalar Axios.

```bash
npm install axios
```

Ejecutar el proyecto.

```bash
npm run dev
```

El frontend estará disponible en:

```
http://localhost:5173
```

---

# Funcionalidades

* Catálogo de productos.
* Búsqueda por nombre.
* Carrito de compras.
* Validación de stock.
* Registro de ventas.
* Actualización automática del inventario.
* Ticket imprimible.
* Reporte de ventas del día.

---

# Endpoints

## Productos

| Método | Endpoint           | Descripción             |
| ------ | ------------------ | ----------------------- |
| GET    | /api/productos     | Lista productos activos |
| GET    | /api/productos/:id | Obtiene un producto     |
| POST   | /api/productos     | Crea un producto        |
| PUT    | /api/productos/:id | Actualiza un producto   |
| DELETE | /api/productos/:id | Eliminación lógica      |

## Ventas

| Método | Endpoint        | Descripción               |
| ------ | --------------- | ------------------------- |
| POST   | /api/ventas     | Registrar venta           |
| GET    | /api/ventas/hoy | Reporte de ventas del día |

---

# Estructura del proyecto

```
punto-de-venta
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   └── routes
│   ├── package.json
│   ├── server.js
│   └── .env
│
└── frontend
    ├── src
    │   ├── components
    │   ├── services
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

# Autor

Proyecto desarrollado como práctica académica para la implementación de un Sistema Punto de Venta utilizando Node.js, React y MySQL.
