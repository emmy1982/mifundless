// Configuración de Swiper para Noticias
document.addEventListener('DOMContentLoaded', function () {
    const noticiasSwiper = new Swiper('.noticias-swiper', {
        // Configuración responsive
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        // Breakpoints responsive
        breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },

        // Navegación
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Paginación
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Efectos
        effect: 'slide',
        speed: 600,

        // Touch
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
    });
});
