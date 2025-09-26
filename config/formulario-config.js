// Configuración del formulario de contacto
const FORMULARIO_CONFIG = {
    // Configuración principal (PHP)
    php: {
        enabled: true,
        action: '../php/enviar_contacto.php',
        method: 'POST'
    },
    
    // Configuración de respaldo (Formspree)
    formspree: {
        enabled: true,
        action: 'https://formspree.io/f/YOUR_FORM_ID', // Reemplazar con tu ID de Formspree
        method: 'POST'
    },
    
    // Configuración de respaldo (EmailJS)
    emailjs: {
        enabled: false,
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID',
        userId: 'YOUR_USER_ID'
    }
};

// Función para detectar si PHP está disponible
async function detectarPHP() {
    try {
        const response = await fetch('../php/enviar_contacto.php', {
            method: 'HEAD'
        });
        return response.ok;
    } catch (error) {
        console.log('PHP no disponible:', error);
        return false;
    }
}

// Función para obtener la configuración activa
async function obtenerConfiguracionActiva() {
    if (FORMULARIO_CONFIG.php.enabled) {
        const phpDisponible = await detectarPHP();
        if (phpDisponible) {
            return FORMULARIO_CONFIG.php;
        }
    }
    
    if (FORMULARIO_CONFIG.formspree.enabled) {
        return FORMULARIO_CONFIG.formspree;
    }
    
    if (FORMULARIO_CONFIG.emailjs.enabled) {
        return FORMULARIO_CONFIG.emailjs;
    }
    
    // Fallback a PHP por defecto
    return FORMULARIO_CONFIG.php;
}
