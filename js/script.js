// JavaScript para Infinita Mente - Funcionalidades interactivas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0,
        disable: function() {
            // Deshabilitar AOS en pantallas muy pequeñas para evitar problemas
            return window.innerWidth < 480;
        }
    });
    
    // Inicializar todas las funcionalidades
    initSmoothScrolling();
    initNavbarScroll();
    initAnimationsOnScroll();
    initCarouselControls();
    initFormValidation();
    initModalHandlers();
    initLoadingStates();
    initParallaxEffects();
    initScrollToTop();
});

// Smooth scrolling para navegación
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efectos de navbar al hacer scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Cambiar fondo del navbar
                if (scrollTop > 50) {
                    navbar.classList.add('navbar-scrolled');
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.classList.remove('navbar-scrolled');
                    navbar.style.background = 'transparent';
                    navbar.style.backdropFilter = 'none';
                    navbar.style.boxShadow = 'none';
                }
                
                // Ocultar/mostrar navbar al hacer scroll
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling hacia abajo - ocultar navbar
                    navbar.style.transform = 'translateY(-120%)';
                } else {
                    // Scrolling hacia arriba - mostrar navbar
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Animaciones al hacer scroll
function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.offer-card, .how-it-works-card, .product-card, .testimonial-card, .solution-card, .mindfulness-card');
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Controles del carrusel personalizados
function initCarouselControls() {
    const carousel = document.querySelector('#eventosCarousel');
    if (carousel && window.innerWidth < 992) { // Solo en móvil/tablet
        // Auto-play del carrusel
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 4000,
            wrap: true
        });
        
        // Pausar al hover
        carousel.addEventListener('mouseenter', function() {
            carouselInstance.pause();
        });
        
        carousel.addEventListener('mouseleave', function() {
            carouselInstance.cycle();
        });
    }
}

// Validación de formularios
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                showSuccessMessage();
                this.reset();
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'Este campo es requerido');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showFieldError(input, 'Ingresa un email válido');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    input.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        ¡Gracias! Tu mensaje ha sido enviado correctamente.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Manejo de modales
function initModalHandlers() {
    const voluntarioModal = document.getElementById('voluntarioModal');
    if (voluntarioModal) {
        const modal = new bootstrap.Modal(voluntarioModal);
        
        // Limpiar formulario al cerrar modal
        voluntarioModal.addEventListener('hidden.bs.modal', function() {
            const form = this.querySelector('form');
            if (form) {
                form.reset();
                // Limpiar errores de validación
                const invalidFields = form.querySelectorAll('.is-invalid');
                invalidFields.forEach(field => clearFieldError(field));
            }
        });
    }
}

// Estados de carga para botones
function initLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        if (button.type === 'submit' || button.textContent.includes('Enviar')) {
            button.addEventListener('click', function() {
                if (this.closest('form').checkValidity()) {
                    showLoadingState(this);
                }
            });
        }
    });
}

function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    button.disabled = true;
    
    // Simular envío (reemplazar con lógica real)
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Efectos parallax
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.2; // Reducido de -0.5 a -0.2
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Funciones utilitarias
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Contador animado para estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    });
}

// Función para mostrar/ocultar elementos con animación
function toggleElement(element, show = true) {
    if (show) {
        element.style.display = 'block';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
    } else {
        element.style.transition = 'all 0.3s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }
}

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    // Aquí podrías enviar el error a un servicio de monitoreo
});

// Función para copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccessMessage('¡Copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// Botón de subir (Scroll to Top)
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    let ticking = false;
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Funcionalidad del botón
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar lazy loading si hay imágenes
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// Exportar funciones para uso global si es necesario
window.InfinitaMente = {
    showSuccessMessage,
    showLoadingState,
    toggleElement,
    copyToClipboard,
    animateCounters
};
