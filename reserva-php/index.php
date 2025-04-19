<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Agendar Consulta</title>
</head>
<body>
  <h1>Reserva de Hora - Estudio Jurídico</h1>

  <form action="reservar.php" method="POST">
    <input type="text" name="nombre" placeholder="Nombre" required><br>
    <input type="email" name="email" placeholder="Correo" required><br>
    <input type="tel" name="telefono" placeholder="Teléfono" required><br>
    <input type="text" name="motivo" placeholder="Motivo" required><br>

    <label for="hora">Seleccione hora:</label>
    <select name="hora" required>
      <option value="09:00">09:00</option>
      <option value="10:00">10:00</option>
      <option value="11:00">11:00</option>
      <option value="12:00">12:00</option>
      <option value="14:00">14:00</option>
      <option value="15:00">15:00</option>
      <option value="16:00">16:00</option>
    </select><br><br>

    <button type="submit">Reservar</button>
  </form>
</body>
</html>
