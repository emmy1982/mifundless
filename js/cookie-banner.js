/**
 * INFINITA MENTE - GESTIÓN DE BANNER DE COOKIES
 * Sistema completo de gestión de consentimiento de cookies
 */

(function() {
    'use strict';

    // Nombre de la cookie para almacenar las preferencias
    const COOKIE_NAME = 'infinitamente_cookies_consent';
    const COOKIE_EXPIRY_DAYS = 365;

    class CookieBanner {
        constructor() {
            this.preferences = this.loadPreferences();
            this.init();
        }

        /**
         * Inicializa el banner de cookies
         */
        init() {
            // Crear el HTML del banner
            this.createBannerHTML();
            this.createSettingsModalHTML();

            // Verificar si ya hay consentimiento
            if (!this.preferences) {
                this.showBanner();
            } else {
                this.applyPreferences();
            }

            // Agregar event listeners
            this.attachEventListeners();
        }

        /**
         * Crea el HTML del banner de cookies
         */
        createBannerHTML() {
            const bannerHTML = `
                <div id="cookieBanner" class="cookie-banner" style="display: none;">
                    <div class="cookie-banner-content">
                        <div class="cookie-banner-text">
                            <h4>Usamos Cookies</h4>
                            <p>
                                Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación y 
                                analizar el uso de nuestro sitio web. 
                                <a href="views/politica-cookies.html" target="_blank">Más información</a>
                            </p>
                        </div>
                        <div class="cookie-banner-buttons">
                            <button id="cookieAcceptAll" class="btn btn-primary w-75 mx-auto rounded-4">
                                <i class="fas fa-check me-2"></i>Aceptar Todas
                            </button>
                            <button id="cookieRejectAll" class="btn btn-outline-secondary w-75 mx-auto rounded-4" style="color: var(--text-dark);">
                                <i class="fas fa-times me-2"></i>Rechazar Todas
                            </button>
                            <button id="cookieSettings" class="btn btn-outline-primary w-75 mx-auto rounded-4" style="color: var(--text-dark);">
                                <i class="fas fa-cog me-2"></i>Configurar
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', bannerHTML);
        }

        /**
         * Crea el modal de configuración de cookies
         */
        createSettingsModalHTML() {
            const modalHTML = `
                <div id="cookieSettingsModal" class="cookie-modal" style="display: none;">
                    <div class="cookie-modal-overlay"></div>
                    <div class="cookie-modal-content">
                        <div class="cookie-modal-header">
                            <h3><i class="fas fa-cog me-2"></i>Configuración de Cookies</h3>
                            <button class="cookie-modal-close" id="closeSettingsModal">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="cookie-modal-body">
                            <p class="mb-4">
                                Personaliza tus preferencias de cookies. Las cookies necesarias siempre están activas 
                                porque son esenciales para el funcionamiento del sitio web.
                            </p>

                            <!-- Cookies Necesarias -->
                            <div class="cookie-setting-item">
                                <div class="cookie-setting-header">
                                    <div>
                                        <h5>
                                            <i class="fas fa-shield-alt text-success me-2"></i>
                                            Cookies Necesarias
                                        </h5>
                                        <p class="text-muted small mb-0">
                                            Estas cookies son esenciales para el funcionamiento del sitio web.
                                        </p>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="cookieNecessary" checked disabled>
                                        <label class="form-check-label" for="cookieNecessary">
                                            <span class="badge bg-success">Siempre activas</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="cookie-setting-details">
                                    <small>
                                        <strong>Ejemplos:</strong> Cookies de sesión, seguridad, accesibilidad.
                                    </small>
                                </div>
                            </div>

                            <!-- Cookies Analíticas -->
                            <div class="cookie-setting-item">
                                <div class="cookie-setting-header">
                                    <div>
                                        <h5>
                                            <i class="fas fa-chart-line text-info me-2"></i>
                                            Cookies Analíticas
                                        </h5>
                                        <p class="text-muted small mb-0">
                                            Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio.
                                        </p>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="cookieAnalytics">
                                        <label class="form-check-label" for="cookieAnalytics"></label>
                                    </div>
                                </div>
                                <div class="cookie-setting-details">
                                    <small>
                                        <strong>Ejemplos:</strong> Google Analytics, estadísticas de uso.
                                    </small>
                                </div>
                            </div>

                            <!-- Cookies de Funcionalidad -->
                            <div class="cookie-setting-item">
                                <div class="cookie-setting-header">
                                    <div>
                                        <h5>
                                            <i class="fas fa-sliders-h text-purple me-2"></i>
                                            Cookies de Funcionalidad
                                        </h5>
                                        <p class="text-muted small mb-0">
                                            Permiten recordar tus preferencias y personalizar tu experiencia.
                                        </p>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="cookieFunctionality">
                                        <label class="form-check-label" for="cookieFunctionality"></label>
                                    </div>
                                </div>
                                <div class="cookie-setting-details">
                                    <small>
                                        <strong>Ejemplos:</strong> Idioma, preferencias de visualización.
                                    </small>
                                </div>
                            </div>

                            <!-- Cookies de Marketing -->
                            <div class="cookie-setting-item">
                                <div class="cookie-setting-header">
                                    <div>
                                        <h5>
                                            <i class="fas fa-bullhorn text-warning me-2"></i>
                                            Cookies de Marketing
                                        </h5>
                                        <p class="text-muted small mb-0">
                                            Se utilizan para mostrar publicidad relevante.
                                        </p>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="cookieMarketing">
                                        <label class="form-check-label" for="cookieMarketing"></label>
                                    </div>
                                </div>
                                <div class="cookie-setting-details">
                                    <small>
                                        <strong>Ejemplos:</strong> Facebook Pixel, Google Ads, redes sociales.
                                    </small>
                                </div>
                            </div>

                            <div class="mt-4">
                                <a href="views/politica-cookies.html" target="_blank" class="btn btn-link">
                                    <i class="fas fa-info-circle me-2"></i>Más información sobre cookies
                                </a>
                            </div>
                        </div>
                        <div class="cookie-modal-footer">
                            <button id="saveSettings" class="btn btn-primary">
                                <i class="fas fa-save me-2"></i>Guardar Preferencias
                            </button>
                            <button id="acceptAllSettings" class="btn btn-success">
                                <i class="fas fa-check-double me-2"></i>Aceptar Todas
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        /**
         * Adjunta los event listeners a los botones
         */
        attachEventListeners() {
            // Botones del banner
            const acceptAllBtn = document.getElementById('cookieAcceptAll');
            const rejectAllBtn = document.getElementById('cookieRejectAll');
            const settingsBtn = document.getElementById('cookieSettings');

            if (acceptAllBtn) {
                acceptAllBtn.addEventListener('click', () => this.acceptAll());
            }

            if (rejectAllBtn) {
                rejectAllBtn.addEventListener('click', () => this.rejectAll());
            }

            if (settingsBtn) {
                settingsBtn.addEventListener('click', () => this.showSettings());
            }

            // Botones del modal
            const closeModalBtn = document.getElementById('closeSettingsModal');
            const saveSettingsBtn = document.getElementById('saveSettings');
            const acceptAllSettingsBtn = document.getElementById('acceptAllSettings');
            const modalOverlay = document.querySelector('.cookie-modal-overlay');

            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', () => this.hideSettings());
            }

            if (modalOverlay) {
                modalOverlay.addEventListener('click', () => this.hideSettings());
            }

            if (saveSettingsBtn) {
                saveSettingsBtn.addEventListener('click', () => this.saveSettings());
            }

            if (acceptAllSettingsBtn) {
                acceptAllSettingsBtn.addEventListener('click', () => {
                    this.acceptAll();
                    this.hideSettings();
                });
            }
        }

        /**
         * Muestra el banner de cookies
         */
        showBanner() {
            const banner = document.getElementById('cookieBanner');
            if (banner) {
                banner.style.display = 'block';
                // Animación de entrada
                setTimeout(() => {
                    banner.classList.add('show');
                }, 100);
            }
        }

        /**
         * Oculta el banner de cookies
         */
        hideBanner() {
            const banner = document.getElementById('cookieBanner');
            if (banner) {
                banner.classList.remove('show');
                setTimeout(() => {
                    banner.style.display = 'none';
                }, 300);
            }
        }

        /**
         * Muestra el modal de configuración
         */
        showSettings() {
            const modal = document.getElementById('cookieSettingsModal');
            if (modal) {
                // Cargar preferencias actuales
                if (this.preferences) {
                    document.getElementById('cookieAnalytics').checked = this.preferences.analytics;
                    document.getElementById('cookieFunctionality').checked = this.preferences.functionality;
                    document.getElementById('cookieMarketing').checked = this.preferences.marketing;
                }

                modal.style.display = 'block';
                // Animación de entrada
                setTimeout(() => {
                    modal.classList.add('show');
                }, 100);

                // Prevenir scroll del body
                document.body.style.overflow = 'hidden';
            }
        }

        /**
         * Oculta el modal de configuración
         */
        hideSettings() {
            const modal = document.getElementById('cookieSettingsModal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        }

        /**
         * Acepta todas las cookies
         */
        acceptAll() {
            const preferences = {
                necessary: true,
                analytics: true,
                functionality: true,
                marketing: true,
                timestamp: Date.now()
            };

            this.savePreferences(preferences);
            this.applyPreferences();
            this.hideBanner();

            console.log('✅ Todas las cookies aceptadas');
        }

        /**
         * Rechaza todas las cookies opcionales
         */
        rejectAll() {
            const preferences = {
                necessary: true,
                analytics: false,
                functionality: false,
                marketing: false,
                timestamp: Date.now()
            };

            this.savePreferences(preferences);
            this.applyPreferences();
            this.hideBanner();

            console.log('❌ Cookies opcionales rechazadas');
        }

        /**
         * Guarda las preferencias personalizadas
         */
        saveSettings() {
            const preferences = {
                necessary: true,
                analytics: document.getElementById('cookieAnalytics').checked,
                functionality: document.getElementById('cookieFunctionality').checked,
                marketing: document.getElementById('cookieMarketing').checked,
                timestamp: Date.now()
            };

            this.savePreferences(preferences);
            this.applyPreferences();
            this.hideBanner();
            this.hideSettings();

            console.log('💾 Preferencias guardadas:', preferences);
        }

        /**
         * Guarda las preferencias en una cookie
         */
        savePreferences(preferences) {
            this.preferences = preferences;
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000));
            
            document.cookie = `${COOKIE_NAME}=${JSON.stringify(preferences)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
        }

        /**
         * Carga las preferencias desde la cookie
         */
        loadPreferences() {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === COOKIE_NAME) {
                    try {
                        return JSON.parse(decodeURIComponent(value));
                    } catch (e) {
                        console.error('Error al parsear preferencias de cookies:', e);
                        return null;
                    }
                }
            }
            return null;
        }

        /**
         * Aplica las preferencias de cookies
         */
        applyPreferences() {
            if (!this.preferences) return;

            // Google Analytics
            if (this.preferences.analytics) {
                this.enableGoogleAnalytics();
            } else {
                this.disableGoogleAnalytics();
            }

            // Facebook Pixel
            if (this.preferences.marketing) {
                this.enableFacebookPixel();
            } else {
                this.disableFacebookPixel();
            }

            console.log('⚙️ Preferencias aplicadas:', this.preferences);
        }

        /**
         * Habilita Google Analytics
         */
        enableGoogleAnalytics() {
            // Verificar si ya existe
            if (window.gtag) {
                console.log('📊 Google Analytics ya está cargado');
                return;
            }

            // Aquí puedes agregar tu código de Google Analytics
            // Ejemplo (reemplaza GA_MEASUREMENT_ID con tu ID real):
            /*
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
            */

            console.log('📊 Google Analytics habilitado');
        }

        /**
         * Deshabilita Google Analytics
         */
        disableGoogleAnalytics() {
            // Deshabilitar Google Analytics
            if (window.gtag) {
                window['ga-disable-GA_MEASUREMENT_ID'] = true;
            }
            console.log('🚫 Google Analytics deshabilitado');
        }

        /**
         * Habilita Facebook Pixel
         */
        enableFacebookPixel() {
            if (window.fbq) {
                console.log('📱 Facebook Pixel ya está cargado');
                return;
            }

            // Aquí puedes agregar tu código de Facebook Pixel
            // Ejemplo (reemplaza YOUR_PIXEL_ID con tu ID real):
            /*
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
            */

            console.log('📱 Facebook Pixel habilitado');
        }

        /**
         * Deshabilita Facebook Pixel
         */
        disableFacebookPixel() {
            // Deshabilitar Facebook Pixel
            if (window.fbq) {
                window.fbq = function() {};
            }
            console.log('🚫 Facebook Pixel deshabilitado');
        }

        /**
         * Método público para abrir configuración desde cualquier parte
         */
        openSettings() {
            this.showSettings();
        }
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.cookieBanner = new CookieBanner();
        });
    } else {
        window.cookieBanner = new CookieBanner();
    }

    // Exponer método para abrir configuración desde botones en la página
    window.openCookieSettings = function() {
        if (window.cookieBanner) {
            window.cookieBanner.openSettings();
        }
    };

})();

