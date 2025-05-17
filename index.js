const express = require('express');
const cors = require('cors');
const pool = require('./database');
const app = express();

// Configuración de la app
app.set('port', process.env.PORT || 3001);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint GET: Obtener todas las reservas
app.get('/reservas', (req, res) => {
  pool.query('SELECT * FROM reservas', (err, results) => {
    if (err) {
      console.error("Error al obtener reservas:", err);
      return res.status(500).json({ message: 'Error al obtener las reservas' });
    }
    res.json(results);
  });
});

// Endpoint POST: Registrar una nueva reserva
app.post('/reservas', (req, res) => {
  const { fecha, hora, motivo, usuario_id } = req.body;

  if (!fecha || !hora || !motivo || !usuario_id) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  const query = 'INSERT INTO reservas (fecha, hora, motivo, usuario_id) VALUES (?, ?, ?, ?)';
  pool.query(query, [fecha, hora, motivo, usuario_id], (err, result) => {
    if (err) {
      console.error("Error al registrar reserva:", err);
      return res.status(500).json({ message: 'Error al registrar la reserva' });
    }

    res.status(201).json({
      message: 'Reserva registrada con éxito',
      reserva: {
        id: result.insertId,
        fecha,
        hora,
        motivo,
        usuario_id
      }
    });
  });
});

// Endpoint PUT: Actualizar una reserva existente
app.put('/reservas/:id', (req, res) => {
  const { fecha, hora, motivo, usuario_id } = req.body;
  const { id } = req.params;

  const query = 'UPDATE reservas SET fecha=?, hora=?, motivo=?, usuario_id=? WHERE id=?';
  pool.query(query, [fecha, hora, motivo, usuario_id, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar reserva:", err);
      return res.status(500).json({ message: 'Error al actualizar la reserva' });
    }

    res.json({ message: 'Reserva actualizada correctamente' });
  });
});

// Endpoint DELETE: Eliminar una reserva
app.delete('/reservas/:id', (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM reservas WHERE id=?', [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar reserva:", err);
      return res.status(500).json({ message: 'Error al eliminar la reserva' });
    }

    res.json({ message: 'Reserva eliminada correctamente' });
  });
});

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
});

