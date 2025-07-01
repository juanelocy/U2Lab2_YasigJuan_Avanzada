const express = require('express');
const router = express.Router();
const conexion = require('../conexion');


// Consultar usuario por cédula
router.get('/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  const query = 'SELECT * FROM usuario WHERE cedula = ?';

  conexion.query(query, [cedula], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la consulta' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(results[0]);
  });
});

// Crear nuevo usuario
router.post('/', (req, res) => {
  const { cedula, nombre, correo } = req.body;

  // Validación básica
  if (!cedula || !nombre || !correo) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO usuario (cedula, nombre, correo) VALUES (?, ?, ?)';

  conexion.query(query, [cedula, nombre, correo], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al insertar usuario' });
    }

    res.status(201).json({ mensaje: 'Usuario creado exitosamente', id: result.insertId });
  });
});

router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuario';
  conexion.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });

    console.log('Usuarios desde la base:', results); // 👈 Muestra en consola del servidor
    res.json(results);
  });
});

router.put('/:cedula', (req, res) => {
  const { nombre, correo } = req.body;
  const cedula = req.params.cedula;

  const query = 'UPDATE usuario SET nombre = ?, correo = ? WHERE cedula = ?';
  conexion.query(query, [nombre, correo, cedula], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  });
});

router.delete('/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  const query = 'DELETE FROM usuario WHERE cedula = ?';
  conexion.query(query, [cedula], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  });
});


module.exports = router;
