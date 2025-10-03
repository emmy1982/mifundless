# 📧 Guía de Configuración de EmailJS para Infinita Mente

Esta guía te ayudará a configurar EmailJS para que los formularios de tu sitio web funcionen correctamente y los mensajes lleguen a tu correo electrónico.

## 📋 Índice

1. [Crear una cuenta en EmailJS](#1-crear-una-cuenta-en-emailjs)
2. [Conectar tu servicio de correo](#2-conectar-tu-servicio-de-correo)
3. [Crear las plantillas de email](#3-crear-las-plantillas-de-email)
4. [Configurar el código](#4-configurar-el-código)
5. [Probar los formularios](#5-probar-los-formularios)
6. [Solución de problemas](#6-solución-de-problemas)

---

## 1. Crear una cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"** (Registrarse)
3. Puedes registrarte con tu email o usar Google/GitHub
4. Confirma tu cuenta de correo electrónico
5. Inicia sesión en tu cuenta de EmailJS

**Nota:** El plan gratuito incluye 200 emails por mes, que es suficiente para empezar.

---

## 2. Conectar tu servicio de correo

1. Una vez dentro de tu cuenta, ve a **"Email Services"** en el menú lateral
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de correo (Gmail recomendado para empezar)
4. Sigue las instrucciones para conectar tu cuenta:
   - **Para Gmail:** Tendrás que autorizar a EmailJS a enviar correos desde tu cuenta
   - **Para otros servicios:** Sigue las instrucciones específicas
5. Una vez conectado, verás tu **Service ID** (algo como `service_xxxxxxx`)
6. **Guarda este Service ID**, lo necesitarás después

---

## 3. Crear las plantillas de email

Necesitas crear **3 plantillas diferentes**, una para cada formulario:

### 3.1. Plantilla para Newsletter

1. Ve a **"Email Templates"** en el menú lateral
2. Haz clic en **"Create New Template"**
3. Nombra la plantilla: `template_newsletter`
4. Configura el contenido:

**Subject (Asunto):**
```
Nueva suscripción al Newsletter - Infinita Mente
```

**Content (Contenido):**
```
Hola,

Has recibido una nueva suscripción al newsletter de Infinita Mente:

Nombre: {{nombre}}
Email: {{email}}

¡Un nuevo suscriptor se ha unido!

---
Infinita Mente
Mentes Tranquilas, Futuros Brillantes
```

5. En **"To Email"** (Destinatario), ingresa tu correo donde quieres recibir las notificaciones
6. Haz clic en **"Save"**
7. **Copia el Template ID** (aparece arriba, algo como `template_newsletter`)

### 3.2. Plantilla para Voluntarios

1. Crea una nueva plantilla
2. Nombra la plantilla: `template_voluntario`
3. Configura el contenido:

**Subject (Asunto):**
```
Nueva solicitud de {{tipo_solicitud}} - Infinita Mente
```

**Content (Contenido):**
```
Hola,

Has recibido una nueva solicitud de participación en Infinita Mente:

DATOS DEL SOLICITANTE:
━━━━━━━━━━━━━━━━━━━━━━
Tipo de solicitud: {{tipo_solicitud}}
Nombre: {{nombre}}
Email: {{email}}
Teléfono: {{telefono}}
Organización: {{organizacion}}

MOTIVACIÓN:
━━━━━━━━━━━━━━━━━━━━━━
{{motivacion}}

---
Por favor, responde a esta solicitud lo antes posible.

Infinita Mente
Mentes Tranquilas, Futuros Brillantes
```

4. En **"To Email"**, ingresa tu correo
5. Haz clic en **"Save"**
6. **Copia el Template ID**

### 3.3. Plantilla para Compras

1. Crea una nueva plantilla
2. Nombra la plantilla: `template_compra`
3. Configura el contenido:

**Subject (Asunto):**
```
Nueva solicitud de compra - {{producto}} - Infinita Mente
```

**Content (Contenido):**
```
Hola,

Has recibido una nueva solicitud de compra en Infinita Mente:

DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━
Nombre: {{nombre}}
Email: {{email}}
Teléfono: {{telefono}}
Ciudad/País: {{ciudad}}

DETALLES DE LA COMPRA:
━━━━━━━━━━━━━━━━━━━━━━
Producto: {{producto}}
Cantidad: {{cantidad}}
Preferencia de contacto: {{preferenciaContacto}}
Newsletter: {{newsletter}}

MENSAJE ADICIONAL:
━━━━━━━━━━━━━━━━━━━━━━
{{mensaje}}

---
Por favor, contacta al cliente lo antes posible.

Infinita Mente
Mentes Tranquilas, Futuros Brillantes
```

4. En **"To Email"**, ingresa tu correo
5. Haz clic en **"Save"**
6. **Copia el Template ID**

---

## 4. Configurar el código

Ahora necesitas poner tus credenciales en el archivo de configuración:

1. Abre el archivo `js/emailjs-config.js`
2. Localiza la sección de configuración al inicio del archivo:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'TU_PUBLIC_KEY',  // Reemplazar con tu Public Key de EmailJS
    serviceId: 'TU_SERVICE_ID',  // Reemplazar con tu Service ID
    templates: {
        newsletter: 'template_newsletter',      // Template ID para newsletter
        voluntario: 'template_voluntario',      // Template ID para voluntarios
        compra: 'template_compra'              // Template ID para compras
    }
};
```

3. **Reemplaza los valores:**

   - **Public Key:** 
     - Ve a **"Account"** → **"General"** en EmailJS
     - Copia tu **Public Key** (antes llamado User ID)
     - Pégalo reemplazando `'TU_PUBLIC_KEY'`
   
   - **Service ID:**
     - Copia el Service ID que guardaste en el paso 2
     - Pégalo reemplazando `'TU_SERVICE_ID'`
   
   - **Template IDs:**
     - Reemplaza los valores si usaste nombres diferentes
     - Por defecto son: `template_newsletter`, `template_voluntario`, `template_compra`

4. **Ejemplo de configuración completa:**

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'WXyZ123AbCdEfGhI',           // ✅ Tu Public Key real
    serviceId: 'service_abc1234',            // ✅ Tu Service ID real
    templates: {
        newsletter: 'template_newsletter',    // ✅ ID de tu plantilla
        voluntario: 'template_voluntario',    // ✅ ID de tu plantilla
        compra: 'template_compra'            // ✅ ID de tu plantilla
    }
};
```

5. Guarda el archivo

---

## 5. Probar los formularios

### 5.1. Prueba local

1. Abre tu sitio web en el navegador (puede ser en local o en el servidor)
2. Abre la **Consola del Navegador** (F12 → Console)
3. Verifica que aparezcan estos mensajes:
   ```
   EmailJS inicializado correctamente
   Inicializando formularios con EmailJS...
   Formularios de EmailJS inicializados
   ```

### 5.2. Probar cada formulario

**Newsletter:**
1. Ve a la sección de contacto en `index.html`
2. Completa el formulario de newsletter
3. Haz clic en "Suscribirse"
4. Deberías ver un mensaje de éxito
5. Revisa tu correo electrónico

**Voluntario:**
1. Haz clic en cualquiera de los botones "Ser embajador", "Ser voluntario" o "Regalos"
2. Completa el formulario del modal
3. Haz clic en "Enviar Solicitud"
4. Deberías ver un mensaje de éxito
5. Revisa tu correo electrónico

**Compra:**
1. Ve a `views/contacto-compra.html`
2. Completa el formulario de compra
3. Haz clic en "Enviar Solicitud"
4. Deberías ver un mensaje de éxito
5. Revisa tu correo electrónico

---

## 6. Solución de problemas

### ❌ Error: "EmailJS SDK no cargado"

**Solución:**
- Verifica que los scripts estén en el orden correcto en tus archivos HTML
- Debe estar primero el SDK de EmailJS antes de `emailjs-config.js`

### ❌ Error: "Failed to send email"

**Solución:**
- Verifica que tu Public Key, Service ID y Template IDs sean correctos
- Asegúrate de que tu servicio de email esté activo en EmailJS
- Revisa que no hayas alcanzado el límite de emails del plan gratuito (200/mes)

### ❌ Los emails no llegan

**Solución:**
1. Revisa la carpeta de spam/correo no deseado
2. Ve a EmailJS Dashboard → "Email Log" para ver si el email se envió
3. Verifica que el email destino esté correcto en las plantillas
4. Si usas Gmail, verifica que hayas autorizado a EmailJS correctamente

### ❌ Error en la consola del navegador

**Solución:**
1. Abre la consola (F12 → Console)
2. Lee el mensaje de error completo
3. Verifica que todos los nombres de campos coincidan entre el formulario HTML y la plantilla de EmailJS

### 🔍 Verificar que todo funciona:

1. **Consola del navegador:** No debe mostrar errores rojos
2. **EmailJS Dashboard:** Ve a "Email Log" para ver todos los emails enviados
3. **Tu bandeja de entrada:** Debes recibir los emails de prueba

---

## 📊 Monitoreo y estadísticas

EmailJS te proporciona un dashboard donde puedes:

1. Ver cuántos emails has enviado
2. Revisar el historial de emails (Email Log)
3. Ver errores si los hay
4. Monitorear tu cuota mensual

Accede a: [https://dashboard.emailjs.com](https://dashboard.emailjs.com)

---

## 💡 Consejos adicionales

1. **Personaliza las plantillas:** Puedes agregar tu logo, cambiar colores, etc.
2. **Auto-respuesta:** Crea plantillas adicionales para enviar confirmaciones a los usuarios
3. **Seguridad:** Tu Public Key puede ser visible en el código, es normal y seguro
4. **Límites:** El plan gratuito tiene 200 emails/mes. Si necesitas más, considera un plan de pago
5. **Spam:** Considera agregar un captcha si recibes spam

---

## 📞 Soporte

- **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **EmailJS FAQ:** [https://www.emailjs.com/docs/faq/](https://www.emailjs.com/docs/faq/)
- **EmailJS Support:** [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

## ✅ Checklist Final

Antes de publicar tu sitio, verifica:

- [ ] Cuenta de EmailJS creada y verificada
- [ ] Servicio de email conectado (Gmail u otro)
- [ ] 3 plantillas creadas (newsletter, voluntario, compra)
- [ ] Public Key configurada en `js/emailjs-config.js`
- [ ] Service ID configurado
- [ ] Template IDs configurados
- [ ] Los 3 formularios probados y funcionando
- [ ] Emails recibidos correctamente en tu bandeja de entrada
- [ ] No hay errores en la consola del navegador

---

¡Listo! Ahora tus formularios están completamente funcionales con EmailJS. 🎉

**Infinita Mente**  
*Mentes Tranquilas, Futuros Brillantes*

