# 🔐 Configurar Segunda Cuenta EmailJS para Voluntario

## 📋 Situación

El plan gratuito de EmailJS solo permite **2 templates por cuenta**. Ya tienes:
- ✅ Newsletter (Cuenta 1)
- ✅ Compra (Cuenta 1)
- ❌ Voluntario (necesita una segunda cuenta)

## 🎯 Solución

Usar **dos cuentas de EmailJS**: una para Newsletter/Compra y otra solo para Voluntario.

---

## 🚀 Pasos para Configurar la Segunda Cuenta

### PASO 1: Crear Segunda Cuenta de EmailJS

1. **Cierra sesión** de tu cuenta actual de EmailJS
2. Abre tu navegador en **modo incógnito** o usa otro navegador
3. Ve a: https://www.emailjs.com/
4. **Regístrate con otro email** (puedes usar un email temporal o secundario)
5. Confirma el email de verificación

> 💡 **Tip:** Puedes usar variantes de tu email como:
> - `tuemail+voluntario@gmail.com`
> - `tuemail2@gmail.com`
> - Un email temporal de servicios como Mailinator

---

### PASO 2: Configurar el Servicio de Email

En tu **segunda cuenta**:

1. Ve a: **Email Services** → **Add New Service**
2. Selecciona tu proveedor (Gmail recomendado)
3. Autoriza tu cuenta de email
4. **COPIA EL SERVICE ID** (ej: `service_xyz1234`)

---

### PASO 3: Crear Template de Voluntario

1. Ve a: **Email Templates** → **Create New Template**
2. Configura el template:

```
From Name: {{from_name}}
From Email: {{from_email}}
To Email: tu-email@gmail.com  (donde quieres recibir las solicitudes)

Subject: 
Nueva solicitud de {{tipo_solicitud}} - Infinita Mente

Content:
════════════════════════════════════════
  NUEVA SOLICITUD DE VOLUNTARIO
════════════════════════════════════════

Tipo de solicitud: {{tipo_solicitud}}

📋 DATOS DEL SOLICITANTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre:        {{from_name}}
Email:         {{from_email}}
Teléfono:      {{telefono}}
Organización:  {{organizacion}}

💬 MOTIVACIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

════════════════════════════════════════
  Infinita Mente - Salud Emocional Infantil
════════════════════════════════════════
```

3. **GUARDA** el template
4. **COPIA EL TEMPLATE ID** (ej: `template_abc1234`)

---

### PASO 4: Obtener la Public Key

1. Ve a: **Account** → **General**
2. Busca **"Public Key"**
3. **COPIA LA PUBLIC KEY** (ej: `AbC123XyZ456`)

---

### PASO 5: Actualizar el Código

Abre `js/emailjs-config.js` y busca esta sección:

```javascript
// CUENTA 2: Voluntario (segunda cuenta de EmailJS)
const EMAILJS_CONFIG_VOLUNTARIO = {
    publicKey: 'TU_SEGUNDA_PUBLIC_KEY_AQUI',
    serviceId: 'TU_SEGUNDO_SERVICE_ID_AQUI',
    templateId: 'TU_TEMPLATE_VOLUNTARIO_AQUI'
};
```

Reemplaza con tus datos de la **segunda cuenta**:

```javascript
// CUENTA 2: Voluntario (segunda cuenta de EmailJS)
const EMAILJS_CONFIG_VOLUNTARIO = {
    publicKey: 'AbC123XyZ456',           // 👈 Public Key de cuenta 2
    serviceId: 'service_xyz1234',        // 👈 Service ID de cuenta 2
    templateId: 'template_abc1234'       // 👈 Template ID del voluntario
};
```

---

## ✅ Probar que Funciona

1. **Recarga tu página web** (Ctrl + Shift + R)
2. **Abre el modal de voluntario**
3. **Llena el formulario** con datos de prueba
4. **Envía**

Deberías ver:
- ✅ Alert: "¡Solicitud enviada! Te contactaremos pronto."
- ✅ Email recibido en 1-2 minutos (revisa spam)

---

## 🔍 Verificar en Ambas Cuentas

### Cuenta 1 (Newsletter y Compra):
- Ve a: https://dashboard.emailjs.com/admin/logs
- Deberías ver los envíos de Newsletter y Compra

### Cuenta 2 (Voluntario):
- Inicia sesión en la segunda cuenta
- Ve a: https://dashboard.emailjs.com/admin/logs
- Deberías ver los envíos de Voluntario

---

## 📊 Resumen de Configuración

| Formulario  | Cuenta  | Public Key       | Service ID       | Template ID       |
|-------------|---------|------------------|------------------|-------------------|
| Newsletter  | Cuenta 1| 9Tasc0Yx2Xd3c9oDp | service_evmu12o  | template_gwytxgs  |
| Compra      | Cuenta 1| 9Tasc0Yx2Xd3c9oDp | service_evmu12o  | template_1t4skkx  |
| Voluntario  | Cuenta 2| *Tu nueva key*    | *Tu nuevo ID*    | *Tu nuevo template*|

---

## 💡 Cómo Funciona Técnicamente

El código ahora:

1. **Inicia** con la Cuenta 1 (newsletter y compra)
2. Cuando se envía el **formulario de voluntario**:
   - Cambia temporalmente a la Cuenta 2
   - Envía el email
   - Regresa a la Cuenta 1
3. Los formularios de **newsletter y compra** siguen usando la Cuenta 1 normalmente

---

## ⚠️ Importante

- Las dos cuentas son **completamente independientes**
- Cada cuenta tiene su límite de **200 emails/mes**
- Total disponible: **400 emails/mes** (200 por cuenta)

---

## ❓ Solución de Problemas

### Error: "Public Key is not valid"
→ Verifica que copiaste correctamente la Public Key de la **segunda cuenta**

### Error: "Service ID is not valid"
→ Verifica que copiaste el Service ID de la **segunda cuenta**

### Error: "Template ID not found"
→ Verifica que:
  1. Creaste el template en la **segunda cuenta**
  2. El template está guardado
  3. Copiaste el Template ID correcto

### No llega el email
→ Revisa:
  1. El email de destino en el template de la cuenta 2
  2. La carpeta de spam
  3. Los logs en la segunda cuenta: https://dashboard.emailjs.com/admin/logs

---

**Última actualización:** Octubre 2025

