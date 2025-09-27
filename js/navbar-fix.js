// Fix específico para el problema del menú responsive en hosting real
// Este archivo debe cargarse DESPUÉS de Bootstrap

document.addEventListener('DOMContentLoaded', function() {
    // Función simple y robusta para cerrar el menú
    function closeNavbarMenu() {
        const navbarCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarToggler) {
            // Método directo - remover clases
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.add('collapsed');
            navbarToggler.setAttribute('aria-expanded', 'false');
            
            // Limpiar estilos inline
            navbarCollapse.style.height = '';
            navbarCollapse.style.overflow = '';
            
            // Forzar repaint
            navbarCollapse.offsetHeight;
        }
    }
    
    // Cerrar menú al hacer clic en enlaces
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                setTimeout(closeNavbarMenu, 50);
            }
        });
    });
    
    // Cerrar menú al redimensionar a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeNavbarMenu();
        }
    });
    
    // Cerrar menú al hacer scroll (opcional)
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 991) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    closeNavbarMenu();
                }
            }, 150);
        }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        const navbarCollapse = document.getElementById('navbarNav');
        
        if (window.innerWidth <= 991 && 
            navbarCollapse && 
            navbarCollapse.classList.contains('show') && 
            !navbar.contains(e.target)) {
            closeNavbarMenu();
        }
    });
});
