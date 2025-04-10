const express = require('express');
const fs = require('fs');
const app = express();

// Configuración de la app
app.set('port', 3001);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint GET: Obtener horas disponibles y reservadas
app.get('/horas', (req, res) => {
    fs.readFile('./data/reservas.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer las reservas' });
        }

        const reservas = JSON.parse(data);

        // Generamos el horario entre 10:00 y 17:30 cada 30 minutos
        const horasDisponibles = [];
        for (let i = 10; i <= 17; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hora = `${i}:${j === 0 ? '00' : '30'}`;
                const horaReservada = reservas.some(reserva => reserva.hora === hora);
                if (!horaReservada) {
                    horasDisponibles.push(hora);
                }
            }
        }

        res.json({ horasDisponibles, reservas });
    });
});

// Endpoint POST: Registrar una nueva reserva
app.post('/reservar', (req, res) => {
    const { nombre, email, telefono, motivo, hora } = req.body;

    // Validación básica
    if (!nombre || !email || !telefono || !motivo || !hora) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    fs.readFile('./data/reservas.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer las reservas' });
        }

        const reservas = JSON.parse(data);

        // Validar si la hora ya fue reservada
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

            res.status(201).json({ message: 'Reserva realizada con éxito', reserva: nuevaReserva });
        });
    });
});

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
});