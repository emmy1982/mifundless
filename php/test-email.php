<?php
// Archivo de prueba para verificar configuración de email en iFastNet

echo "<h2>Prueba de Configuración de Email - iFastNet</h2>";

// Verificar configuración PHP
echo "<h3>Configuración PHP:</h3>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Función mail() disponible: " . (function_exists('mail') ? "SÍ" : "NO") . "<br>";
echo "Sendmail path: " . ini_get('sendmail_path') . "<br>";
echo "SMTP: " . ini_get('SMTP') . "<br>";
echo "smtp_port: " . ini_get('smtp_port') . "<br>";

// Verificar configuración del servidor
echo "<h3>Información del Servidor:</h3>";
echo "HTTP_HOST: " . $_SERVER['HTTP_HOST'] . "<br>";
echo "SERVER_NAME: " . $_SERVER['SERVER_NAME'] . "<br>";
echo "SERVER_SOFTWARE: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";

// Probar envío de email simple
echo "<h3>Prueba de Envío:</h3>";

$to = "emmyjose82@hotmail.com";
$subject = "Prueba de Email - iFastNet";
$message = "Este es un email de prueba desde tu servidor iFastNet.\n\nFecha: " . date('Y-m-d H:i:s');
$headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

echo "Enviando email de prueba a: " . $to . "<br>";

if (mail($to, $subject, $message, $headers)) {
    echo "<strong style='color: green;'>✅ Email enviado correctamente!</strong><br>";
    echo "Revisa tu bandeja de entrada (y spam) en unos minutos.";
} else {
    echo "<strong style='color: red;'>❌ Error al enviar email</strong><br>";
    echo "Revisa los logs de error del servidor.";
}

echo "<br><br><a href='../views/contacto-compra.html'>← Volver al formulario</a>";
?>
