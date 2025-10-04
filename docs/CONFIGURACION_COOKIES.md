# 🍪 Configuración del Banner de Cookies - Infinita Mente

## 📋 Descripción General

Este documento explica el funcionamiento del banner de cookies implementado en el sitio web de Infinita Mente, incluyendo su configuración, personalización y gestión.

## ✨ Características Principales

### 1. Banner de Cookies
- **Diseño moderno y responsive**: Se adapta perfectamente a dispositivos móviles y desktop
- **Animación suave**: Aparece desde la parte inferior con una animación elegante
- **Tres opciones principales**:
  - ✅ Aceptar Todas: Acepta todas las cookies
  - ❌ Rechazar Todas: Solo mantiene las cookies necesarias
  - ⚙️ Configurar: Permite personalizar las preferencias

### 2. Modal de Configuración
- **4 tipos de cookies**:
  1. **Cookies Necesarias** (siempre activas)
  2. **Cookies Analíticas** (Google Analytics)
  3. **Cookies de Funcionalidad** (preferencias del usuario)
  4. **Cookies de Marketing** (Facebook Pixel, Google Ads)

- **Switches interactivos**: Activa/desactiva cada tipo de cookie
- **Información detallada**: Descripción clara de cada tipo de cookie

### 3. Almacenamiento de Preferencias
- Las preferencias se guardan en una cookie llamada `infinitamente_cookies_consent`
- Duración: 365 días
- Si el usuario acepta, no se vuelve a mostrar el banner

## 📁 Archivos Creados

### 1. Página de Política de Cookies
```
views/politica-cookies.html
```
- Página completa con información detallada sobre cookies
- Tabla con todas las cookies utilizadas
- Botón para abrir el panel de configuración
- Enlaces a políticas de terceros (Google, Facebook)

### 2. JavaScript del Banner
```
js/cookie-banner.js
```
- Clase `CookieBanner` que maneja toda la lógica
- Crea el HTML del banner y modal dinámicamente
- Gestiona el almacenamiento de preferencias
- Aplica las preferencias (habilita/deshabilita Google Analytics, Facebook Pixel)

### 3. Estilos CSS
```
css/styles.css (líneas 2595-3040)
```
- Estilos para el banner de cookies
- Estilos para el modal de configuración
- Diseño responsive para móviles
- Animaciones y transiciones suaves

## 🎨 Personalización del Banner

### Colores
El banner utiliza las variables CSS del sitio:
```css
--primary-color: #F5A623;  /* Naranja principal */
--tertiary-color: #ff873d;  /* Naranja secundario */
--text-dark: #1D4F91;       /* Texto oscuro */
```

### Posición
El banner aparece en la parte inferior de la pantalla (`position: fixed; bottom: 0;`)

### Duración de la Cookie
Para cambiar la duración del almacenamiento de preferencias, modifica:
```javascript
// En js/cookie-banner.js, línea 11
const COOKIE_EXPIRY_DAYS = 365; // Cambiar a los días deseados
```

## 🔧 Integración con Google Analytics y Facebook Pixel

### Google Analytics
Para habilitar Google Analytics, edita `js/cookie-banner.js` (líneas 340-354):

```javascript
enableGoogleAnalytics() {
    // Descomenta y reemplaza GA_MEASUREMENT_ID con tu ID real
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
}
```

### Facebook Pixel
Para habilitar Facebook Pixel, edita `js/cookie-banner.js` (líneas 370-390):

```javascript
enableFacebookPixel() {
    // Descomenta y reemplaza YOUR_PIXEL_ID con tu ID real
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
}
```

## 📝 Cómo Usar

### Para Usuarios del Sitio
1. Al visitar el sitio, aparece el banner de cookies
2. Pueden elegir:
   - **Aceptar Todas**: Acepta todas las cookies
   - **Rechazar Todas**: Solo cookies necesarias
   - **Configurar**: Personalizar preferencias

3. Las preferencias se guardan automáticamente

### Abrir Configuración Manualmente
Desde cualquier página, los usuarios pueden abrir el panel de configuración:
- Botón en la página de política de cookies
- Llamando a: `window.openCookieSettings()`

## 🌐 Páginas Actualizadas

Se agregó el script del banner en todas las páginas HTML:

```html
<!-- Cookie Banner -->
<script src="js/cookie-banner.js"></script>
<!-- o -->
<script src="../js/cookie-banner.js"></script>
```

### Páginas con el Banner:
- ✅ `index.html`
- ✅ `views/politica-privacidad.html`
- ✅ `views/politica-cookies.html`
- ✅ `views/contacto-compra.html`
- ✅ `views/sabermas.html`

### Footer Actualizado:
Todas las páginas ahora tienen un enlace a la política de cookies:
```html
<li><a href="./views/politica-cookies.html">Política de Cookies</a></li>
```

## 🔍 Debugging

### Ver Preferencias Actuales
Abre la consola del navegador y ejecuta:
```javascript
document.cookie.split(';').find(c => c.includes('infinitamente_cookies_consent'))
```

### Ver Logs en Consola
El sistema muestra mensajes útiles en la consola:
- ✅ Todas las cookies aceptadas
- ❌ Cookies opcionales rechazadas
- 💾 Preferencias guardadas
- ⚙️ Preferencias aplicadas
- 📊 Google Analytics habilitado/deshabilitado
- 📱 Facebook Pixel habilitado/deshabilitado

### Resetear Preferencias
Para probar el banner nuevamente, borra la cookie:
```javascript
document.cookie = "infinitamente_cookies_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
location.reload();
```

## 📱 Responsive Design

El banner se adapta perfectamente a diferentes dispositivos:

### Desktop (>992px)
- Banner horizontal con todos los elementos en línea
- Modal centrado con ancho máximo de 700px

### Tablet (768px - 992px)
- Banner con elementos apilados verticalmente
- Botones en una fila

### Mobile (<768px)
- Banner compacto con todos los elementos apilados
- Botones en columna (uno debajo del otro)
- Modal de pantalla completa con padding reducido

## ⚖️ Cumplimiento Legal

### RGPD y Leyes de México
El banner cumple con:
- ✅ Consentimiento explícito del usuario
- ✅ Información clara sobre el uso de cookies
- ✅ Opción para rechazar cookies no esenciales
- ✅ Almacenamiento de preferencias
- ✅ Enlace a política de cookies detallada

## 🎯 Mejores Prácticas Implementadas

1. **Cookies necesarias siempre activas**: No se pueden desactivar porque son esenciales
2. **Consentimiento granular**: Los usuarios pueden elegir qué tipos de cookies aceptar
3. **Información transparente**: Descripción clara de cada tipo de cookie
4. **Acceso fácil**: Enlace en el footer para cambiar preferencias
5. **Duración razonable**: Las preferencias se guardan por 1 año
6. **No intrusivo**: El banner no bloquea el contenido pero es claramente visible

## 🚀 Próximos Pasos Recomendados

1. **Agregar tus IDs reales**:
   - Google Analytics Measurement ID
   - Facebook Pixel ID
   - Otros servicios de terceros

2. **Personalizar textos**: Ajusta los textos según tus necesidades específicas

3. **Agregar más servicios**: Si usas otros servicios de terceros (Twitter Pixel, LinkedIn Insight Tag, etc.), agrégalos al sistema

4. **Testing**: Prueba el banner en diferentes navegadores y dispositivos

## 📞 Soporte

Si necesitas ayuda con la configuración:
- 📧 Email: soporte@infinitamente.org
- 📄 Ver: `views/politica-cookies.html` para más información

## 📜 Licencia

Este código es parte del proyecto Infinita Mente y está protegido por sus términos de uso.

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0

