// database.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // tu contraseña si tienes una
  database: 'reserva_horas'
});

module.exports = pool;
