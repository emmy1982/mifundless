// Configuración de EmailJS para Infinita Mente
// Documentación: https://www.emailjs.com/docs/

// ============================================
// CONFIGURACIÓN - REEMPLAZA CON TUS DATOS
// ============================================
const EMAILJS_CONFIG = {
    publicKey: 'jDFKTFNFLc9mjgB7e',  // Reemplazar con tu Public Key de EmailJS
    serviceId: 'service_sakotif',  // Reemplazar con tu Service ID
    templates: {
        newsletter: 'template_newsletter',      // Template ID para newsletter
        voluntario: 'template_voluntario',      // Template ID para voluntarios
        compra: 'template_compra'              // Template ID para compras
    }
};

// ============================================
// INICIALIZACIÓN
// ============================================
(function() {
    // Inicializar EmailJS cuando el DOM esté listo
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS inicializado correctamente');
    } else {
        console.error('EmailJS SDK no cargado. Asegúrate de incluir el script de EmailJS.');
    }
})();

// ============================================
// MANEJADORES DE FORMULARIOS
// ============================================

// Formulario de Newsletter
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitBtn.disabled = true;

        // Preparar datos del formulario
        const formData = {
            nombre: form.querySelector('[name="nombre"]').value,
            email: form.querySelector('[name="email"]').value,
            tipo: 'Newsletter'
        };

        // Enviar con EmailJS
        emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templates.newsletter,
            formData
        ).then(
            function(response) {
                console.log('Newsletter enviado correctamente', response);
                showSuccessNotification('¡Gracias por suscribirte! Te mantendremos informado.');
                form.reset();
            },
            function(error) {
                console.error('Error al enviar newsletter:', error);
                showErrorNotification('Hubo un error al procesar tu suscripción. Por favor, intenta de nuevo.');
            }
        ).finally(
            function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        );
    });
}

// Formulario de Voluntario (Modal)
function initVoluntarioForm() {
    const form = document.getElementById('voluntarioForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitBtn.disabled = true;

        // Preparar datos del formulario
        const tipoSolicitud = form.querySelector('[name="tipo_solicitud"]').value;
        const formData = {
            nombre: form.querySelector('[name="nombre"]').value,
            email: form.querySelector('[name="email"]').value,
            telefono: form.querySelector('[name="telefono"]').value,
            organizacion: form.querySelector('[name="organizacion"]').value,
            motivacion: form.querySelector('[name="motivacion"]').value,
            tipo_solicitud: tipoSolicitud,
            tipo: 'Voluntario'
        };

        // Enviar con EmailJS
        emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templates.voluntario,
            formData
        ).then(
            function(response) {
                console.log('Solicitud de voluntario enviada correctamente', response);
                showSuccessNotification('¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.');
                form.reset();
                
                // Cerrar modal después de 2 segundos
                setTimeout(function() {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('voluntarioModal'));
                    if (modal) modal.hide();
                }, 2000);
            },
            function(error) {
                console.error('Error al enviar solicitud de voluntario:', error);
                showErrorNotification('Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.');
            }
        ).finally(
            function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        );
    });
}

// Formulario de Contacto/Compra
function initContactoForm() {
    const form = document.getElementById('contactoForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitBtn.disabled = true;

        // Preparar datos del formulario
        const formData = {
            nombre: form.querySelector('[name="nombre"]').value,
            email: form.querySelector('[name="email"]').value,
            telefono: form.querySelector('[name="telefono"]').value,
            ciudad: form.querySelector('[name="ciudad"]').value,
            producto: form.querySelector('[name="producto"]').value,
            cantidad: form.querySelector('[name="cantidad"]').value,
            preferenciaContacto: form.querySelector('[name="preferenciaContacto"]:checked').value,
            mensaje: form.querySelector('[name="mensaje"]').value,
            newsletter: form.querySelector('[name="newsletter"]').checked ? 'Sí' : 'No',
            tipo: 'Compra'
        };

        // Enviar con EmailJS
        emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templates.compra,
            formData
        ).then(
            function(response) {
                console.log('Solicitud de compra enviada correctamente', response);
                showSuccessNotification('¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto para coordinar tu compra.');
                form.reset();
                
                // Scroll suave al inicio de la página
                setTimeout(function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 1500);
            },
            function(error) {
                console.error('Error al enviar solicitud de compra:', error);
                showErrorNotification('Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo o contáctanos directamente.');
            }
        ).finally(
            function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        );
    });
}

// ============================================
// FUNCIONES DE NOTIFICACIÓN
// ============================================

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show emailjs-notification';
    notification.style.cssText = 'position: fixed; top: 100px; right: 20px; z-index: 9999; min-width: 350px; max-width: 500px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); animation: slideInRight 0.5s ease;';
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>¡Éxito!</strong><br>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-danger alert-dismissible fade show emailjs-notification';
    notification.style.cssText = 'position: fixed; top: 100px; right: 20px; z-index: 9999; min-width: 350px; max-width: 500px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); animation: slideInRight 0.5s ease;';
    notification.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Error</strong><br>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 7 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 7000);
}

// ============================================
// INICIALIZACIÓN AUTOMÁTICA
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando formularios con EmailJS...');
    
    // Inicializar todos los formularios
    initNewsletterForm();
    initVoluntarioForm();
    initContactoForm();
    
    console.log('Formularios de EmailJS inicializados');
});

// Estilos para animación de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .emailjs-notification {
        animation: slideInRight 0.5s ease;
    }
`;
document.head.appendChild(style);

