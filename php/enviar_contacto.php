<?php
// Configuración de email para iFastNet
$to_email = "emmyjose82@hotmail.com"; // Email de destino para solicitudes de compra
$subject = "Nueva solicitud de compra - Infinita Mente";

// Configuración adicional para iFastNet
ini_set('sendmail_from', 'noreply@' . $_SERVER['HTTP_HOST']);

// Verificar que el formulario fue enviado por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Obtener y limpiar los datos del formulario
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
    $ciudad = isset($_POST['ciudad']) ? trim($_POST['ciudad']) : '';
    $producto = isset($_POST['producto']) ? trim($_POST['producto']) : '';
    $cantidad = isset($_POST['cantidad']) ? trim($_POST['cantidad']) : '';
    $preferenciaContacto = isset($_POST['preferenciaContacto']) ? trim($_POST['preferenciaContacto']) : '';
    $mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';
    $newsletter = isset($_POST['newsletter']) ? 'Sí' : 'No';
    
    // Validar campos requeridos
    $errors = array();
    
    if (empty($nombre)) {
        $errors[] = "El nombre es requerido";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El email es requerido y debe ser válido";
    }
    
    if (empty($telefono)) {
        $errors[] = "El teléfono es requerido";
    }
    
    if (empty($ciudad)) {
        $errors[] = "La ciudad/país es requerido";
    }
    
    if (empty($producto)) {
        $errors[] = "Debe seleccionar un producto";
    }
    
    // Si hay errores, devolver JSON con errores
    if (!empty($errors)) {
        header('Content-Type: application/json');
        echo json_encode(array('success' => false, 'errors' => $errors));
        exit;
    }
    
    // Crear el mensaje de email (optimizado para evitar spam)
    $email_message = "
    <html>
    <head>
        <title>Nueva Solicitud de Compra - Infinita Mente</title>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #D0006F; color: white; padding: 20px; text-align: center; }
            .content { background: #ffffff; padding: 20px; border: 1px solid #e0e0e0; }
            .field { margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-radius: 5px; }
            .label { font-weight: bold; color: #D0006F; display: block; margin-bottom: 5px; }
            .value { color: #333; }
            .footer { background: #1D4F91; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nueva Solicitud de Compra</h2>
                <p>Infinita Mente - Salud Emocional para Niños</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <span class='label'>👤 Nombre:</span>
                    <span class='value'>" . htmlspecialchars($nombre) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>📧 Email:</span>
                    <span class='value'>" . htmlspecialchars($email) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>📱 Teléfono:</span>
                    <span class='value'>" . htmlspecialchars($telefono) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>🌍 Ciudad/País:</span>
                    <span class='value'>" . htmlspecialchars($ciudad) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>🛍️ Producto:</span>
                    <span class='value'>" . htmlspecialchars($producto) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>📦 Cantidad:</span>
                    <span class='value'>" . htmlspecialchars($cantidad) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>📞 Preferencia de Contacto:</span>
                    <span class='value'>" . htmlspecialchars($preferenciaContacto) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>📝 Mensaje:</span>
                    <span class='value'>" . nl2br(htmlspecialchars($mensaje)) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>📬 Newsletter:</span>
                    <span class='value'>" . $newsletter . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>🕒 Fecha:</span>
                    <span class='value'>" . date('d/m/Y H:i:s') . "</span>
                </div>
            </div>
            
            <div class='footer'>
                <p>Este email fue enviado desde el formulario de contacto de Infinita Mente</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Configurar headers para email HTML (optimizado para evitar spam)
    $from_email = 'noreply@' . $_SERVER['HTTP_HOST'];
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Infinita Mente <' . $from_email . '>',
        'Reply-To: ' . $nombre . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 3',
        'Return-Path: ' . $from_email,
        'Message-ID: <' . time() . '.' . rand(1000, 9999) . '@' . $_SERVER['HTTP_HOST'] . '>',
        'Date: ' . date('r'),
        'X-Sender: ' . $from_email,
        'X-Originating-IP: ' . $_SERVER['SERVER_ADDR']
    );
    
    // Log para debugging
    $log_message = "Intento de envío de email a: " . $to_email . " desde: " . $email . " - " . date('Y-m-d H:i:s');
    error_log($log_message);
    
    // Crear versión de texto plano
    $text_message = "Nueva Solicitud de Compra - Infinita Mente\n\n";
    $text_message .= "Nombre: " . $nombre . "\n";
    $text_message .= "Email: " . $email . "\n";
    $text_message .= "Teléfono: " . $telefono . "\n";
    $text_message .= "Ciudad/País: " . $ciudad . "\n";
    $text_message .= "Producto: " . $producto . "\n";
    $text_message .= "Cantidad: " . $cantidad . "\n";
    $text_message .= "Preferencia de Contacto: " . $preferenciaContacto . "\n";
    $text_message .= "Mensaje: " . $mensaje . "\n";
    $text_message .= "Newsletter: " . $newsletter . "\n";
    $text_message .= "Fecha: " . date('d/m/Y H:i:s') . "\n\n";
    $text_message .= "Este email fue enviado desde el formulario de contacto de Infinita Mente";
    
    // Crear email multipart (HTML + texto)
    $boundary = md5(uniqid(time()));
    $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
    
    $email_body = "--" . $boundary . "\r\n";
    $email_body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $email_body .= $text_message . "\r\n\r\n";
    $email_body .= "--" . $boundary . "\r\n";
    $email_body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $email_body .= $email_message . "\r\n\r\n";
    $email_body .= "--" . $boundary . "--\r\n";
    
    // Enviar email
    $mail_sent = mail($to_email, $subject, $email_body, implode("\r\n", $headers));
    
    // Log del resultado
    error_log("Resultado del envío: " . ($mail_sent ? "ÉXITO" : "FALLO"));
    
    if ($mail_sent) {
        
        // Si el usuario quiere newsletter, agregarlo a la lista
        if (isset($_POST['newsletter'])) {
            // Aquí puedes agregar lógica para suscribir al newsletter
            // Por ejemplo, guardar en una base de datos o enviar a un servicio como Mailchimp
        }
        
        // Respuesta exitosa
        header('Content-Type: application/json');
        echo json_encode(array(
            'success' => true, 
            'message' => '¡Gracias por tu solicitud! Nos pondremos en contacto contigo pronto.'
        ));
        
    } else {
        // Error al enviar email
        header('Content-Type: application/json');
        echo json_encode(array(
            'success' => false, 
            'message' => 'Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo o contáctanos directamente.'
        ));
    }
    
} else {
    // Si no es POST, redirigir
    header('Location: ../views/contacto-compra.html');
    exit;
}
?>
