# 🔍 Guía para Diagnosticar Problemas con EmailJS

## ⚠️ PROBLEMA DETECTADO

Veo que solo tienes **1 template configurado** de los 3 necesarios:

- ✅ **voluntario:** `template_u7jlsan` (Configurado)
- ❌ **newsletter:** `template_newsletter` (Falta crear en EmailJS)
- ❌ **compra:** `template_compra` (Falta crear en EmailJS)

---

## 🚨 PASOS URGENTES PARA ARREGLAR

### Paso 1: Verificar en la Consola del Navegador

1. Abre tu sitio web
2. Presiona **F12** 
3. Ve a la pestaña **"Console"**
4. Intenta enviar un formulario
5. **Anota todos los mensajes** que aparecen en rojo

#### ¿Qué mensajes deberías ver?

**Si todo está bien:**
```
✅ EmailJS inicializado correctamente
✅ Inicializando formularios con EmailJS...
✅ Formulario de newsletter inicializado
✅ Formulario de voluntario inicializado
✅ Formulario de contacto/compra inicializado
```

**Al enviar un formulario:**
```
📧 Intentando enviar [tipo de formulario]...
📋 Datos del formulario: {...}
🔑 Service ID: service_sakotif
📄 Template ID: [template_id]
✅ [Tipo] enviado correctamente
```

### Paso 2: Errores Comunes y Soluciones

#### ❌ Error: "Template ID not found"
**Causa:** El template no existe en EmailJS  
**Solución:** Crea el template en EmailJS Dashboard

#### ❌ Error: "Service ID is not valid"
**Causa:** El Service ID está mal configurado  
**Solución:** Verifica en EmailJS → Email Services → Copia el Service ID correcto

#### ❌ Error: "Public Key is not valid"  
**Causa:** El Public Key está mal configurado  
**Solución:** Ve a EmailJS → Account → General → Copia el Public Key

#### ❌ Error: "Invalid email address"
**Causa:** El campo de email en el formulario está vacío o mal formateado  
**Solución:** Verifica que el campo email tenga un valor válido

---

## 📝 PASO A PASO: Crear los Templates Faltantes

### 1. Crear Template de Newsletter

1. Ve a: https://dashboard.emailjs.com/admin
2. Click en **"Email Templates"**
3. Click en **"Create New Template"**
4. Configura:

**Template Name:** Newsletter  
**Template ID:** Déjalo como está (por ejemplo: `template_abc123`)

**Subject:**
```
Nueva suscripción al Newsletter - Infinita Mente
```

**Content:**
```html
Hola,

Has recibido una nueva suscripción al newsletter de Infinita Mente:

━━━━━━━━━━━━━━━━━━━━━━
DATOS DEL SUSCRIPTOR
━━━━━━━━━━━━━━━━━━━━━━

Nombre: {{from_name}}
Email: {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━

¡Un nuevo suscriptor se ha unido a tu comunidad!

---
Infinita Mente
Mentes Tranquilas, Futuros Brillantes
```

**To Email:** tu-email@gmail.com (pon TU email aquí)

5. Click en **"Save"**
6. **COPIA el Template ID** (aparece arriba)
7. Ve a `js/emailjs-config.js` y reemplaza:
   ```javascript
   newsletter: 'template_abc123',  // ← Pon aquí el Template ID que copiaste
   ```

### 2. Crear Template de Compra

1. Crea otro nuevo template
2. Configura:

**Template Name:** Compra  
**Template ID:** Déjalo como está

**Subject:**
```
Nueva solicitud de compra - {{producto}} - Infinita Mente
```

**Content:**
```html
Hola,

Has recibido una nueva solicitud de compra:

━━━━━━━━━━━━━━━━━━━━━━
DATOS DEL CLIENTE
━━━━━━━━━━━━━━━━━━━━━━

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{telefono}}
Ciudad/País: {{ciudad}}

━━━━━━━━━━━━━━━━━━━━━━
DETALLES DE LA COMPRA
━━━━━━━━━━━━━━━━━━━━━━

Producto: {{producto}}
Cantidad: {{cantidad}}
Preferencia de contacto: {{preferenciaContacto}}
Suscripción al newsletter: {{newsletter}}

MENSAJE ADICIONAL:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━

Por favor, contacta al cliente lo antes posible.

---
Infinita Mente
Mentes Tranquilas, Futuros Brillantes
```

**To Email:** tu-email@gmail.com

3. Click en **"Save"**
4. **COPIA el Template ID**
5. Ve a `js/emailjs-config.js` y reemplaza:
   ```javascript
   compra: 'template_xyz789',  // ← Pon aquí el Template ID que copiaste
   ```

---

## 🧪 PROBAR PASO A PASO

### Test 1: Newsletter (index.html)

1. Abre `index.html`
2. Ve a la sección de contacto (scroll hasta abajo)
3. Llena el formulario de newsletter
4. **ANTES de dar click en "Suscribirse":**
   - Abre la consola (F12)
   - Mantén la consola abierta
5. Click en **"Suscribirse"**
6. **Observa la consola:**
   - ¿Dice "✅ Newsletter enviado correctamente"?
   - ¿O hay un error en rojo?
7. **Anota el mensaje**

### Test 2: Voluntario (index.html - Modal)

1. En `index.html`, busca los botones de voluntario
2. Click en **"Ser embajador"** o cualquier otro
3. Llena el formulario del modal
4. **Mantén la consola abierta (F12)**
5. Click en **"Enviar Solicitud"**
6. **Observa la consola**
7. **Anota el mensaje**

### Test 3: Compra (contacto-compra.html)

1. Abre `views/contacto-compra.html`
2. Llena el formulario de compra
3. **Mantén la consola abierta (F12)**
4. Click en **"Enviar Solicitud"**
5. **Observa la consola**
6. **Anota el mensaje**

---

## ✅ VERIFICAR QUE LOS EMAILS LLEGUEN

Después de enviar cada formulario:

1. Espera 1-2 minutos
2. Revisa tu bandeja de entrada
3. **Revisa la carpeta de SPAM** ← MUY IMPORTANTE
4. Si no llega nada, ve a EmailJS Dashboard → **Email Log**
   - URL: https://dashboard.emailjs.com/admin/logs
   - Aquí verás si el email se envió o hubo algún error

---

## 📊 Configuración Actual

Tu configuración actual en `js/emailjs-config.js` es:

```javascript
const EMAILJS_CONFIG = {
    publicKey: '2MFRCWmp00Z2lskgh',    // ✅ Configurado
    serviceId: 'service_sakotif',      // ✅ Configurado
    templates: {
        newsletter: 'template_newsletter',  // ❌ NECESITAS CREAR ESTE TEMPLATE
        voluntario: 'template_u7jlsan',     // ✅ Ya creado
        compra: 'template_compra'          // ❌ NECESITAS CREAR ESTE TEMPLATE
    }
};
```

---

## 🎯 RESUMEN DE LO QUE DEBES HACER AHORA

1. ✅ **Verificar en consola** - Presiona F12 e intenta enviar cada formulario
2. ✅ **Crear los 2 templates faltantes** en EmailJS:
   - Newsletter
   - Compra
3. ✅ **Actualizar** `js/emailjs-config.js` con los nuevos Template IDs
4. ✅ **Probar nuevamente** cada formulario
5. ✅ **Revisar spam** en tu email
6. ✅ **Verificar EmailJS Dashboard → Email Log**

---

## 💬 Envíame esta información

Para ayudarte mejor, envíame:

1. **Screenshot de la consola** (F12) cuando envías un formulario
2. **Los Template IDs** que creaste
3. **¿Algún mensaje de error?** Copia y pega todo el texto

---

## 🆘 Enlaces Útiles

- EmailJS Dashboard: https://dashboard.emailjs.com/admin
- Email Templates: https://dashboard.emailjs.com/admin/templates
- Email Services: https://dashboard.emailjs.com/admin/integration
- Email Log: https://dashboard.emailjs.com/admin/logs
- Tu cuenta: https://dashboard.emailjs.com/admin/account

---

¡No te preocupes! Los errores son normales cuando se configura por primera vez. Con estos pasos lo resolveremos. 💪

