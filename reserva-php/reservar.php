<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $motivo = htmlspecialchars($_POST["motivo"]);
    $hora = htmlspecialchars($_POST["hora"]);

    // Guardar datos en archivo de texto plano
    $registro = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nMotivo: $motivo\nHora: $hora\n---\n";

    file_put_contents("reservas.txt", $registro, FILE_APPEND);

    echo "<h2>¡Reserva registrada con éxito!</h2>";
    echo "<a href='index.php'>Volver</a>";
} else {
    echo "Acceso no permitido.";
}
?>
