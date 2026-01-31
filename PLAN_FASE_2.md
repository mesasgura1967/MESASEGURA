# Plan de Implementación - Fase 2: Backend y Arquitectura Full Stack

## 🎯 Objetivo
Transformar el prototipo actual (Frontend + localStorage) en una aplicación web robusta con un Backend real, API RESTful y persistencia de datos profesional.

## 🏗️ Stack Tecnológico
Siguiendo la hoja de ruta del README:
- **Entorno de Ejecución**: Node.js
- **Framework Web**: Express.js (por su robustez y simplicidad)
- **Base de Datos**:
  - *Inicial (Desarrollo)*: `lowdb` (Base de datos JSON local básica para no requerir instalación de servidores externos durante el desarrollo).
  - *Producción (Futuro)*: MongoDB (fácil migración desde el esquema JSON).
- **Seguridad**: JWT (JSON Web Tokens) para autenticación si es necesario.

## 📋 Pasos de Implementación

### 1. Configuración del Servidor (Server Setup)
- [ ] Inicializar proyecto Node.js (`npm init -y`)
- [ ] Instalar dependencias clave: `express`, `cors`, `body-parser`, `lowdb` (o similar).
- [ ] Crear estructura de carpetas:
  - `/server` (código backend)
  - `/server/routes` (endpoints)
  - `/server/models` (esquema de datos)
  - `/server/db` (archivos de datos)

### 2. Definición de la API (Endpoints)
Crearemos una API REST completa para sustituir las llamadas directas de JS.

**Restaurantes:**
- `GET /api/restaurants` - Obtener lista de restaurantes (con filtros).
- `GET /api/restaurants/:id` - Obtener detalles de un restaurante.

**Reservas:**
- `GET /api/bookings` - Ver reservas del usuario/restaurante.
- `POST /api/bookings` - Crear nueva reserva (y procesar "pago").
- `POST /api/bookings/:id/cancel` - Cancelar reserva.
- `POST /api/bookings/:id/checkin` - Confirmar asistencia (Restaurante).

### 3. Migración de Datos (Data Migration)
- [ ] Mover los datos "hardcodeados" en `booking-app.js` a la base de datos del servidor.
- [ ] Crear scripts de "seed" para poblar la base de datos inicial.

### 4. Conexión Frontend-Backend
- [ ] Refactorizar `booking-app.js` para usar `fetch()` en lugar de leer arrays locales.
- [ ] Refactorizar `dashboard.js` para obtener datos reales del servidor.
- [ ] Refactorizar `user-dashboard.js` para sincronizar con la API.

### 5. Simulación de Pagos (Backend)
- [ ] Crear un endpoint simulado `/api/payments/charge` que valide tarjetas y "reserve" el dinero.
- [ ] Crear un endpoint `/api/payments/refund` para la devolución automática.

## 🚀 Ejecución
Para comenzar, iniciaremos inicializando el entorno de servidor en la raíz del proyecto.
