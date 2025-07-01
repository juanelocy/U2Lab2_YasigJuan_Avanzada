const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // <-- Necesario para POST

app.use('/usuario', require('./routes/usuario')); // 👈 ¡IMPORTANTE!


// Importar rutas
const usuarioRoutes = require('./routes/usuario');
app.use('/usuario', usuarioRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor API REST con MySQL');
});

// Arrancar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
