const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../'))); // Servir archivos estáticos del frontend

// Base de datos simple (JSON)
const DB_FILE = path.join(__dirname, 'db', 'database.json');

// Inicializar DB si no existe
if (!fs.existsSync(path.dirname(DB_FILE))) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
    const initialData = {
        restaurants: [], // Se poblará luego
        bookings: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

// Helpers de DB
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// Rutas API
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MesaSegura Backend funcionando' });
});

// Arrancar servdor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
