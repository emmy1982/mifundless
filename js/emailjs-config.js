// ============================================
// CONFIGURACIÓN MÚLTIPLES CUENTAS DE EMAILJS
// ============================================

// CUENTA 1: Newsletter y Compra
const EMAILJS_CONFIG = {
    publicKey: '9Tasc0Yx2Xd3c9oDp',
    serviceId: 'service_evmu12o',
    templates: {
        newsletter: 'template_gwytxgs',
        compra: 'template_s0h5exh' 
    }
};

// CUENTA 2: Voluntario (segunda cuenta de EmailJS)
const EMAILJS_CONFIG_VOLUNTARIO = {
    publicKey: 'EEIWWmrJv7IKBH2g0',      // 👈 Pon la Public Key de tu segunda cuenta
    serviceId: 'service_7sdd8p3',      // 👈 Pon el Service ID de tu segunda cuenta
    templateId: 'template_tlvw0xp'     // 👈 Pon el Template ID del voluntario
};

// Inicializar EmailJS con la primera cuenta (se reinicializará cuando sea necesario)
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    } else {
        console.error('❌ EmailJS no cargado');
    }
})();

// ============================================
// FORMULARIOS - VERSIÓN SIMPLE
// ============================================

// Esperar a que TODO esté cargado
window.addEventListener('load', function() {
    
    // ========== FORMULARIO NEWSLETTER ==========
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        // Remover cualquier listener anterior
        const newForm = newsletterForm.cloneNode(true);
        newsletterForm.parentNode.replaceChild(newForm, newsletterForm);
        
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            
            const nombre = this.querySelector('[name="nombre"]').value;
            const email = this.querySelector('[name="email"]').value;
            
            const datosEnviar = {
                from_name: nombre,
                from_email: email,
                message: 'Nueva suscripción al newsletter'
            };
            
            emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templates.newsletter,
                datosEnviar
            ).then(function(response) {
                alert('¡Suscripción exitosa! Revisa tu email.');
                newForm.reset();
                btn.disabled = false;
                btn.textContent = originalText;
            }).catch(function(error) {
                console.error('❌ Error al enviar newsletter:', error);
                alert('Error: ' + (error.text || 'No se pudo enviar'));
                btn.disabled = false;
                btn.textContent = originalText;
            });
        });
    }
    
    // ========== FORMULARIO VOLUNTARIO (Segunda Cuenta) ==========
    const voluntarioForm = document.getElementById('voluntarioForm');
    if (voluntarioForm) {
        // Remover cualquier listener anterior
        const newVolForm = voluntarioForm.cloneNode(true);
        voluntarioForm.parentNode.replaceChild(newVolForm, voluntarioForm);
        
        newVolForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            
            const formData = {
                from_name: this.querySelector('[name="nombre"]').value,
                from_email: this.querySelector('[name="email"]').value,
                telefono: this.querySelector('[name="telefono"]').value,
                organizacion: this.querySelector('[name="organizacion"]').value || 'No especificado',
                message: this.querySelector('[name="motivacion"]').value,
                tipo_solicitud: this.querySelector('[name="tipo_solicitud"]').value
            };
            
            // Reinicializar EmailJS con la segunda cuenta
            emailjs.init(EMAILJS_CONFIG_VOLUNTARIO.publicKey);
            
            emailjs.send(
                EMAILJS_CONFIG_VOLUNTARIO.serviceId,
                EMAILJS_CONFIG_VOLUNTARIO.templateId,
                formData
            ).then(function(response) {
                alert('¡Solicitud enviada! Te contactaremos pronto.');
                newVolForm.reset();
                btn.disabled = false;
                btn.innerHTML = originalText;
                
                // Volver a inicializar con la cuenta principal
                emailjs.init(EMAILJS_CONFIG.publicKey);
                
                // Cerrar modal si existe
                setTimeout(function() {
                    const modal = document.getElementById('voluntarioModal');
                    if (modal) {
                        const bsModal = bootstrap.Modal.getInstance(modal);
                        if (bsModal) bsModal.hide();
                    }
                }, 1000);
            }).catch(function(error) {
                console.error('❌ Error al enviar formulario de voluntario:', error);
                alert('Error: ' + (error.text || 'No se pudo enviar'));
                btn.disabled = false;
                btn.innerHTML = originalText;
                
                // Volver a inicializar con la cuenta principal
                emailjs.init(EMAILJS_CONFIG.publicKey);
            });
        });
    }
    
    // ========== FORMULARIO COMPRA ==========
    const contactoForm = document.getElementById('contactoForm');
    if (contactoForm) {
        // Remover cualquier listener anterior
        const newContactoForm = contactoForm.cloneNode(true);
        contactoForm.parentNode.replaceChild(newContactoForm, contactoForm);
        
        newContactoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            
            const preferenciaContacto = this.querySelector('[name="preferenciaContacto"]:checked');
            
            const formData = {
                from_name: this.querySelector('[name="nombre"]').value,
                from_email: this.querySelector('[name="email"]').value,
                telefono: this.querySelector('[name="telefono"]').value,
                ciudad: this.querySelector('[name="ciudad"]').value,
                producto: this.querySelector('[name="producto"]').value,
                cantidad: this.querySelector('[name="cantidad"]').value,
                preferenciaContacto: preferenciaContacto ? preferenciaContacto.value : 'email',
                message: this.querySelector('[name="mensaje"]').value || 'Sin mensaje',
                newsletter: this.querySelector('[name="newsletter"]').checked ? 'Sí' : 'No'
            };
            
            emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templates.compra,
                formData
            ).then(function(response) {
                alert('¡Solicitud enviada! Te contactaremos pronto.');
                newContactoForm.reset();
                btn.disabled = false;
                btn.innerHTML = originalText;
            }).catch(function(error) {
                console.error('❌ Error al enviar formulario de compra:', error);
                alert('Error: ' + (error.text || 'No se pudo enviar'));
                btn.disabled = false;
                btn.innerHTML = originalText;
            });
        });
    }
});
