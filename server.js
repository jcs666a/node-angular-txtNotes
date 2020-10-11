const http = require('http');
const express = require('express');
const path = require('path');

const publicDir = path.join(__dirname, 'public/dist/txtnotes');

// Configuración de servidor
const app = express();
const server = http.createServer(app);
const PORT = '3001';

// Configuración de la app
app.use(express.json());

// Rutas
app.use(require('./routes'));
app.use(express.static(publicDir));
app.get('*', (req, res) => res.sendFile(`${publicDir}/index.html`));

server.listen(PORT, () => console.log(`Aplicación escuchando en el puerto ${PORT}`));
