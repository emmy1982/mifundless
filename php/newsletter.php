<?php
// Configuración de email para newsletter
$to_email = "emmyjose82@hotmail.com"; // Email de destino para newsletter
$subject = "Nueva suscripción al newsletter - Infinita Mente";

// Configuración adicional para iFastNet
ini_set('sendmail_from', 'noreply@' . $_SERVER['HTTP_HOST']);

// Verificar que el formulario fue enviado por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Obtener y limpiar los datos del formulario
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    
    // Validar email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Content-Type: application/json');
        echo json_encode(array('success' => false, 'message' => 'Por favor, ingresa un email válido.'));
        exit;
    }
    
    // Crear el mensaje de email para newsletter
    $email_message = "
    <html>
    <head>
        <title>Nueva Suscripción al Newsletter</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-left: 10px; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>📬 Nueva Suscripción al Newsletter</h2>
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
                    <span class='label'>🕒 Fecha de Suscripción:</span>
                    <span class='value'>" . date('d/m/Y H:i:s') . "</span>
                </div>
            </div>
            
            <div class='footer'>
                <p>Este email fue enviado desde el formulario de newsletter de Infinita Mente</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Configurar headers para email HTML
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $email,
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    );
    
    // Enviar email
    if (mail($to_email, $subject, $email_message, implode("\r\n", $headers))) {
        
        // Aquí puedes agregar lógica adicional para:
        // 1. Guardar el email en una base de datos
        // 2. Enviar un email de bienvenida al suscriptor
        // 3. Integrar con servicios como Mailchimp, ConvertKit, etc.
        
        // Respuesta exitosa
        header('Content-Type: application/json');
        echo json_encode(array(
            'success' => true, 
            'message' => '¡Gracias por suscribirte! Te mantendremos informado sobre nuestros productos y promociones.'
        ));
        
    } else {
        // Error al enviar email
        header('Content-Type: application/json');
        echo json_encode(array(
            'success' => false, 
            'message' => 'Hubo un error al procesar tu suscripción. Por favor, inténtalo de nuevo.'
        ));
    }
    
} else {
    // Si no es POST, redirigir
    header('Location: ../index.html');
    exit;
}
?>
