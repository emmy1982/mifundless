# 📧 Configuración de Email para Infinita Mente

## 🚀 Pasos para Configurar el Sistema de Email

### 1. **Configurar tu Email de Empresa**

Edita los siguientes archivos y cambia `tu-email@empresa.com` por tu email real:

#### Archivo: `php/enviar_contacto.php`
```php
$to_email = "tu-email@empresa.com"; // CAMBIA ESTO por tu email real
```

#### Archivo: `php/newsletter.php`
```php
$to_email = "tu-email@empresa.com"; // CAMBIA ESTO por tu email real
```

### 2. **Configuración del Servidor de Hosting**

#### Opción A: Hosting Compartido (Recomendado para principiantes)
- **Hostinger, GoDaddy, SiteGround, etc.**
- Sube todos los archivos a tu servidor
- Asegúrate de que PHP esté habilitado
- El sistema funcionará automáticamente

#### Opción B: Servicios de Email Profesional
Para mayor confiabilidad, puedes usar:

**Formspree (Gratis hasta 50 envíos/mes)**
1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Reemplaza en `views/contacto-compra.html`:
```html
<form id="contactoForm" action="https://formspree.io/f/TU_FORM_ID" method="POST">
```

**EmailJS (Gratis hasta 200 envíos/mes)**
1. Ve a [emailjs.com](https://emailjs.com)
2. Configura tu servicio de email
3. Reemplaza el JavaScript con el código de EmailJS

### 3. **Configuración de Newsletter**

#### Opción A: Mailchimp (Recomendado)
1. Crea cuenta en [mailchimp.com](https://mailchimp.com)
2. Obtén tu API key
3. Modifica `php/newsletter.php` para integrar con Mailchimp

#### Opción B: ConvertKit
1. Crea cuenta en [convertkit.com](https://convertkit.com)
2. Configura la integración similar a Mailchimp

### 4. **Verificación de Funcionamiento**

1. **Sube todos los archivos a tu servidor**
2. **Prueba el formulario de contacto:**
   - Ve a `tu-dominio.com/views/contacto-compra.html`
   - Completa el formulario
   - Verifica que recibas el email

3. **Prueba el newsletter:**
   - Ve a la sección de contacto en tu página principal
   - Suscríbete al newsletter
   - Verifica que recibas la notificación

### 5. **Personalización Adicional**

#### Cambiar el Email de Contacto en el Footer
Edita `views/contacto-compra.html` y `index.html`:
```html
<p class="text-white-50 mb-1">
    <i class="fas fa-envelope me-2"></i>tu-email@empresa.com
</p>
```

#### Añadir Más Campos al Formulario
1. Añade el campo HTML en `views/contacto-compra.html`
2. Añade la validación en `php/enviar_contacto.php`
3. Incluye el campo en el email que se envía

### 6. **Seguridad y Mejores Prácticas**

#### Protección contra Spam
- Añade reCAPTCHA (recomendado)
- Implementa rate limiting
- Valida todos los inputs

#### Ejemplo de reCAPTCHA:
1. Ve a [google.com/recaptcha](https://google.com/recaptcha)
2. Registra tu sitio
3. Añade el código a tus formularios

### 7. **Solución de Problemas Comunes**

#### El formulario no envía emails:
- Verifica que PHP esté habilitado en tu servidor
- Comprueba que el email esté configurado correctamente
- Revisa los logs de error del servidor

#### Los emails van a spam:
- Configura SPF, DKIM y DMARC en tu dominio
- Usa un servicio de email profesional
- Evita palabras que activan filtros de spam

#### El formulario no se ve bien en móviles:
- Los estilos CSS ya están optimizados
- Si hay problemas, revisa la configuración responsive

### 8. **Próximos Pasos Recomendados**

1. **Configurar Analytics:** Google Analytics para tracking
2. **SEO:** Optimizar meta tags y estructura
3. **Backup:** Configurar respaldos automáticos
4. **SSL:** Asegurar que tu sitio use HTTPS
5. **Base de Datos:** Para almacenar contactos y newsletter

## 📞 Soporte

Si necesitas ayuda con la configuración:
1. Revisa los logs de error de tu servidor
2. Verifica que todos los archivos estén subidos correctamente
3. Comprueba que PHP esté funcionando en tu hosting

## 🎯 Resultado Final

Una vez configurado, tendrás:
- ✅ Formulario de contacto funcional
- ✅ Sistema de newsletter
- ✅ Emails automáticos a tu bandeja de entrada
- ✅ Interfaz profesional y responsive
- ✅ Validación de formularios
- ✅ Mensajes de confirmación para usuarios

¡Tu sistema de contacto estará listo para recibir pedidos de clientes!
