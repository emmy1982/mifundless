// JavaScript para Infinita Mente - Funcionalidades interactivas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50,
        delay: 0,
        disable: function() {
            // Deshabilitar AOS solo en pantallas extremadamente pequeñas
            return window.innerWidth < 320;
        }
    });
    
    // Inicializar todas las funcionalidades
    initSmoothScrolling();
    initNavbarCloseOnClick();
    initNavbarResponsive();
    initNavbarScroll();
    initAnimationsOnScroll();
    initCarouselControls();
    initFormValidation();
    initModalHandlers();
    initLoadingStates();
    initParallaxEffects();
    initScrollToTop();
    initChartAnimations();
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
                
                // Cerrar el menú móvil después del scroll
                setTimeout(() => {
                    closeMobileMenu();
                }, 100);
            }
        });
    });
}

// Cerrar menú móvil al hacer clic en enlaces del navbar
function initNavbarCloseOnClick() {
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo cerrar si estamos en modo móvil (menú colapsado)
            if (window.innerWidth <= 991) {
                // Cerrar el menú móvil inmediatamente
                closeMobileMenu();
                
                // También cerrar con un pequeño delay como respaldo
                setTimeout(() => {
                    closeMobileMenu();
                }, 100);
            }
        });
    });
}

// Función para cerrar el menú móvil - Versión robusta
function closeMobileMenu() {
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarToggler) {
        // Método 1: Verificar si el menú está abierto
        const isMenuOpen = navbarCollapse.classList.contains('show') || 
                          navbarCollapse.classList.contains('collapsing');
        
        if (isMenuOpen) {
            // Método directo: remover todas las clases relacionadas
            navbarCollapse.classList.remove('show', 'collapsing');
            
            // Actualizar el estado del botón toggler
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarToggler.classList.add('collapsed');
            
            // Forzar el estilo inline para asegurar que se cierre
            navbarCollapse.style.height = '';
            navbarCollapse.style.overflow = '';
            
            // Método 2: Usar Bootstrap Collapse si está disponible
            setTimeout(() => {
                try {
                    if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                        // Verificar si ya existe una instancia
                        const existingCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (existingCollapse) {
                            existingCollapse.hide();
                        } else {
                            // Crear nueva instancia
                            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                                toggle: false
                            });
                            bsCollapse.hide();
                        }
                    }
                } catch (e) {
                    console.log('Bootstrap Collapse no disponible, usando método directo');
                }
            }, 50);
        }
    }
}

// Manejo responsive del navbar
function initNavbarResponsive() {
    // Cerrar menú móvil cuando se redimensiona la ventana a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            // Si cambiamos a desktop, cerrar el menú móvil
            const navbarCollapse = document.getElementById('navbarNav');
            const navbarToggler = document.querySelector('.navbar-toggler');
            
            if (navbarCollapse && navbarToggler) {
                navbarCollapse.classList.remove('show', 'collapsing');
                navbarToggler.setAttribute('aria-expanded', 'false');
                navbarToggler.classList.add('collapsed');
                navbarCollapse.style.height = '';
                navbarCollapse.style.overflow = '';
            }
        }
    });
    
    // Manejar clic fuera del menú para cerrarlo
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.getElementById('navbarNav');
        
        if (navbar && navbarToggler && navbarCollapse) {
            // Si el menú está abierto y se hace clic fuera del navbar
            if (navbarCollapse.classList.contains('show') && 
                !navbar.contains(e.target) && 
                window.innerWidth <= 991) {
                closeMobileMenu();
            }
        }
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
    // La validación de formularios ahora es manejada por emailjs-config.js
    // Este código se mantiene solo para validación visual en tiempo real
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Agregar validación en tiempo real a los campos
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    showFieldError(this, 'Este campo es requerido');
                } else if (this.type === 'email' && !isValidEmail(this.value)) {
                    showFieldError(this, 'Ingresa un email válido');
                } else {
                    clearFieldError(this);
                }
            });
            
            // Limpiar error al empezar a escribir
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.value.trim()) {
                    clearFieldError(this);
                }
            });
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
        
        // Configuraciones para cada tipo de voluntariado
        const voluntarioConfigs = {
            'embajador': {
                title: 'Quiero ser Embajador',
                description: '¡Lleva Infinita Mente a tu escuela! Como embajador, podrás compartir nuestras técnicas de mindfulness con tu comunidad educativa.',
                subject: 'Nueva solicitud de embajador - Infinita Mente'
            },
            'voluntario': {
                title: 'Ser Voluntario',
                description: 'Recibe un kit para promocionar Infinita Mente en tu escuela, club o empresa. Únete a nuestro movimiento de bienestar emocional.',
                subject: 'Nueva solicitud de voluntario - Infinita Mente'
            },
            'regalos': {
                title: 'Regalos Empresariales',
                description: 'Entrega un obsequio que transforma y estrecha vínculos con tus colaboradores y sus familias. Perfecto para posadas, festejos y aniversarios.',
                subject: 'Consulta sobre regalos empresariales - Infinita Mente'
            }
        };
        
        // Manejar clic en botones de voluntariado
        document.addEventListener('click', function(e) {
            if (e.target.matches('[data-bs-toggle="modal"][data-bs-target="#voluntarioModal"]')) {
                const tipo = e.target.getAttribute('data-voluntario-type');
                const config = voluntarioConfigs[tipo];
                
                if (config) {
                    // Actualizar título del modal
                    const modalTitle = document.getElementById('modalTitle');
                    if (modalTitle) {
                        modalTitle.textContent = config.title;
                    }
                    
                    // Actualizar descripción del modal
                    const modalDescription = document.getElementById('modalDescription');
                    if (modalDescription) {
                        modalDescription.innerHTML = `<p class="text-muted">${config.description}</p>`;
                    }
                    
                    // Actualizar tipo de solicitud
                    const tipoSolicitud = document.getElementById('tipoSolicitud');
                    if (tipoSolicitud) {
                        tipoSolicitud.value = tipo;
                    }
                    
                    // Actualizar subject del formulario
                    const form = document.getElementById('voluntarioForm');
                    if (form) {
                        const subjectInput = form.querySelector('input[name="_subject"]');
                        if (subjectInput) {
                            subjectInput.value = config.subject;
                        }
                    }
                }
            }
        });
        
        // Limpiar formulario al cerrar modal
        voluntarioModal.addEventListener('hidden.bs.modal', function() {
            const form = this.querySelector('form');
            if (form) {
                form.reset();
                // Limpiar errores de validación
                const invalidFields = form.querySelectorAll('.is-invalid');
                invalidFields.forEach(field => clearFieldError(field));
            }
            
            // Resetear modal a estado por defecto
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            if (modalTitle) modalTitle.textContent = 'Únete Al Movimiento';
            if (modalDescription) modalDescription.innerHTML = '<p class="text-muted">Completa el formulario y nos pondremos en contacto contigo.</p>';
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
    
    // Verificar si el elemento existe antes de continuar
    if (!scrollToTopBtn) {
        console.log('Botón scrollToTop no encontrado, saltando inicialización');
        return;
    }
    
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

// Animación de barras de gráfica
function initChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar-fill');
    
    if (chartBars.length === 0) {
        return; // No hay gráficas para animar
    }
    
    // Crear observer para detectar cuando la gráfica entra en vista
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChartBar(entry.target);
                chartObserver.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, {
        threshold: 0.3, // Animar cuando el 30% de la gráfica sea visible
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar cada barra de la gráfica
    chartBars.forEach(bar => {
        // Guardar el ancho original antes de inicializar
        const originalStyle = bar.getAttribute('style');
        const widthMatch = originalStyle ? originalStyle.match(/width:\s*(\d+)%/) : null;
        
        if (widthMatch) {
            // Guardar el ancho objetivo
            bar.setAttribute('data-target-width', widthMatch[1]);
            // Inicializar con ancho 0 para la animación
            bar.style.width = '0%';
            chartObserver.observe(bar);
        }
    });
}

function animateChartBar(barElement) {
    // Obtener el ancho objetivo del atributo data
    const targetPercentage = parseInt(barElement.getAttribute('data-target-width'));
    
    if (!targetPercentage) {
        return; // No se encontró el ancho objetivo
    }
    
    const duration = 2000; // 2 segundos
    const startTime = performance.now();
    
    // Obtener el elemento de porcentaje para animarlo también
    const percentageElement = barElement.querySelector('.chart-percentage');
    const percentageText = percentageElement ? percentageElement.textContent : '';
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Función de easing suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentWidth = easeOutQuart * targetPercentage;
        
        // Actualizar el ancho de la barra
        barElement.style.width = currentWidth + '%';
        
        // Animar el porcentaje si existe
        if (percentageElement && percentageText) {
            const currentPercentage = Math.round(easeOutQuart * parseInt(percentageText.replace('%', '')));
            percentageElement.textContent = currentPercentage + '%';
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Asegurar que termine en el valor exacto
            barElement.style.width = targetPercentage + '%';
            if (percentageElement && percentageText) {
                percentageElement.textContent = percentageText;
            }
        }
    }
    
    requestAnimationFrame(animate);
}

// Exportar funciones para uso global si es necesario
window.InfinitaMente = {
    showSuccessMessage,
    showLoadingState,
    toggleElement,
    copyToClipboard,
    animateCounters,
    animateChartBar
};
