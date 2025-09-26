<?php
// Configuración de email
$to_email = "tu-email@empresa.com"; // CAMBIA ESTO por tu email real
$subject = "Nueva solicitud de compra - Infinita Mente";

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
    
    // Crear el mensaje de email
    $email_message = "
    <html>
    <head>
        <title>Nueva Solicitud de Compra</title>
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
                <h2>🛒 Nueva Solicitud de Compra</h2>
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
