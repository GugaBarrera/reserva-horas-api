# Sistema de Reservas de Hora – API REST con MySQL

Este proyecto corresponde a una actividad evaluativa del módulo **Plataformas Web (Semana 9)**. Consiste en el desarrollo de una **API RESTful** que permite gestionar la reserva de horas para un estudio jurídico, utilizando tecnologías modernas como **Node.js**, **Express** y **MySQL**.

## ✨ Tecnologías utilizadas

- Node.js
- Express
- MySQL (MariaDB)
- Librería `mysql2` para conexión
- Postman (para pruebas CRUD)
- DBeaver (para visualización de datos)
- Git y GitHub (versionamiento)

## 🗃️ Estructura de la base de datos

El sistema cuenta con dos entidades principales:

- **usuarios**
  - `id` (INT, PK, auto_increment)
  - `nombre` (VARCHAR)
  - `email` (VARCHAR)
  - `password` (VARCHAR)

- **reservas**
  - `id` (INT, PK, auto_increment)
  - `fecha` (DATE)
  - `hora` (VARCHAR)
  - `motivo` (TEXT)
  - `usuario_id` (INT, FK → usuarios)

## ⚙️ Funcionalidades de la API

- `GET /reservas` → Listar todas las reservas
- `POST /reservas` → Crear una nueva reserva
- `PUT /reservas/:id` → Actualizar una reserva existente
- `DELETE /reservas/:id` → Eliminar una reserva

## 🧪 Pruebas realizadas

Las operaciones CRUD fueron validadas utilizando **Postman**, y las inserciones pudieron visualizarse correctamente desde DBeaver.

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/GugaBarrera/reserva-horas-api.git
   cd reserva-horas-api

