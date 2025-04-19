const express = require('express');
const fs = require('fs');
const https = require('https'); // ✅ Agregado
const cors = require('cors');
const app = express();

// Leer certificados SSL autofirmados
const options = {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.crt')
};

// Configuración de la app
app.set('port', process.env.PORT || 3001);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint GET: Obtener horas disponibles y reservadas
app.get('/horas', (req, res) => {
  fs.readFile('./data/reservas.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer las reservas' });
    }

    const reservas = JSON.parse(data);

    const horasDisponibles = [];
    for (let hora = 9; hora < 17; hora++) {
      if (hora === 13) continue; // Saltar la hora de colación

      const bloques = [`${hora}:00`, `${hora}:30`];
      for (const h of bloques) {
        const horaReservada = reservas.some(reserva => reserva.hora === h);
        if (!horaReservada) {
          horasDisponibles.push(h);
        }
      }
    }

    res.json({ horasDisponibles, reservas });
  });
});

// Endpoint POST: Registrar una nueva reserva
app.post('/reservar', (req, res) => {
  const { nombre, email, telefono, motivo, hora } = req.body;

  if (!nombre || !email || !telefono || !motivo || !hora) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  fs.readFile('./data/reservas.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer las reservas' });
    }

    const reservas = JSON.parse(data);
    const horaReservada = reservas.some(reserva => reserva.hora === hora);
    if (horaReservada) {
      return res.status(400).json({ message: 'La hora seleccionada ya está reservada' });
    }

    const nuevaReserva = { nombre, email, telefono, motivo, hora };
    reservas.push(nuevaReserva);

    fs.writeFile('./data/reservas.json', JSON.stringify(reservas, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar la reserva' });
      }

      console.log("Reserva recibida:", nuevaReserva); // 👀 Agregado por consola

      res.status(201).json({ message: 'Reserva realizada con éxito', reserva: nuevaReserva });
    });
  });
});

// Iniciar servidor HTTPS
https.createServer(options, app).listen(app.get('port'), () => {
  console.log(`Servidor HTTPS iniciado en el puerto ${app.get('port')}`);
});
