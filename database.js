const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'guga',
  password: '1234',
  database: 'reserva_horas'
});

module.exports = pool;
