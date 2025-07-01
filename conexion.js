const mysql = require('mysql');

// Configuración de la conexión
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Reemplaza con tu usuario de MySQL
  password: '', // Reemplaza con tu contraseña de MySQL
  database: 'u2lab2_yasig' // Reemplaza con el nombre de tu base
});

// Verificar la conexión
conexion.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = conexion;
