# 🚀 Guía Completa: Desplegar Frontend en Vercel

## 📋 PREPARACIÓN

### ✅ Archivos Creados:
- `vercel.json` - Configuración de Vercel para Vite/React
- `.env.example` - Ejemplo de variables de entorno
- `src/config/api.config.ts` - Actualizado para usar variables de entorno

---

## 🔧 PASO 1: CONFIGURAR VARIABLES DE ENTORNO

### Opción A: Crear archivo .env.production (Local)

Crea un archivo `.env.production` en la raíz del proyecto:

```bash
VITE_API_URL=https://venta-lotes-backend.vercel.app/api
```

### Opción B: Configurar en Vercel Dashboard (Recomendado)

Después de crear el proyecto en Vercel, agrega la variable de entorno:

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Agrega:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://venta-lotes-backend.vercel.app/api`
   - **Environments:** Marca **Production**, **Preview**, **Development**
4. Click en **Save**

---

## 🚀 PASO 2: DESPLEGAR EN VERCEL

### Método 1: Desde el Dashboard de Vercel (Recomendado)

1. **Ve a Vercel:** https://vercel.com/dashboard
2. **Click en "Add New..."** → **Project**
3. **Import Git Repository:**
   - Si tu proyecto está en GitHub, selecciona el repositorio
   - Si no, sube el proyecto manualmente
4. **Configurar el Proyecto:**
   - **Project Name:** `venta-lotes-frontend` (o el nombre que prefieras)
   - **Framework Preset:** Vite (debería detectarlo automáticamente)
   - **Root Directory:** `./` (o la carpeta del frontend si está en un monorepo)
   - **Build Command:** `npm run build` (ya configurado)
   - **Output Directory:** `dist` (ya configurado)
5. **Environment Variables:**
   - Click en **Environment Variables**
   - Agrega: `VITE_API_URL` = `https://venta-lotes-backend.vercel.app/api`
6. **Click en "Deploy"**
7. **Espera** a que termine el build (2-3 minutos)

### Método 2: Desde la CLI de Vercel

```bash
# Navega al directorio del frontend
cd "c:\Users\Admin\Desktop\Proyectpersonal\Personal Futuro\ProyectVentaLotes\Frontend-Venta-Lotes"

# Instala Vercel CLI (si no lo tienes)
npm install -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

Durante el deploy, la CLI te preguntará:
- **Set up and deploy?** → Yes
- **Which scope?** → Tu cuenta personal
- **Link to existing project?** → No
- **Project name?** → venta-lotes-frontend
- **Directory?** → ./
- **Override settings?** → No

---

## 🔗 PASO 3: CONECTAR FRONTEND CON BACKEND

### 1. Actualizar CORS en el Backend

El backend debe permitir requests desde el frontend. Verifica que el backend tenga CORS habilitado:

**En el backend (`src/main.ts`):**
```typescript
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://venta-lotes-frontend.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true,
});
```

### 2. Verificar la URL del Backend

Asegúrate de que la variable de entorno en Vercel apunte a la URL correcta:

```
VITE_API_URL=https://venta-lotes-backend.vercel.app/api
```

**Nota:** Si tu backend tiene un prefijo `/api`, inclúyelo en la URL.

### 3. Redeploy si es necesario

Si cambiaste variables de entorno:
1. Ve a **Deployments** en Vercel
2. Click en **Redeploy** en el último deployment

---

## 🧪 PASO 4: PROBAR LA APLICACIÓN

### 1. Accede a tu aplicación:
```
https://venta-lotes-frontend.vercel.app
```

### 2. Prueba el Login:
- Email: `admin@ventadelotes.com`
- Password: `admin123`

### 3. Verifica la Consola del Navegador:
- Abre DevTools (F12)
- Ve a la pestaña **Console**
- Verifica que no haya errores de CORS
- Verifica que las peticiones vayan a la URL correcta del backend

### 4. Verifica la Pestaña Network:
- Ve a **Network** en DevTools
- Intenta hacer login
- Verifica que las peticiones vayan a:
  ```
  https://venta-lotes-backend.vercel.app/api/auth/login
  ```

---

## ⚠️ SOLUCIÓN DE PROBLEMAS COMUNES

### Problema 1: Error de CORS

**Síntoma:**
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
```

**Solución:**
1. Actualiza el CORS en el backend para incluir la URL del frontend
2. Redeploy el backend
3. Limpia la caché del navegador (Ctrl + Shift + R)

### Problema 2: 404 Not Found en rutas

**Síntoma:** Al recargar la página en una ruta como `/dashboard`, sale 404

**Solución:** Ya está configurado en `vercel.json` con rewrites. Si persiste:
1. Verifica que `vercel.json` esté en la raíz del proyecto
2. Redeploy el proyecto

### Problema 3: Variables de entorno no se cargan

**Síntoma:** La app sigue apuntando a `localhost:3000`

**Solución:**
1. Verifica que la variable se llame `VITE_API_URL` (con el prefijo `VITE_`)
2. Verifica que esté configurada en Vercel para **Production**
3. Redeploy el proyecto

### Problema 4: Build falla

**Síntoma:** El build en Vercel falla con errores de TypeScript

**Solución:**
1. Verifica que no haya errores de TypeScript localmente:
   ```bash
   npm run build
   ```
2. Corrige los errores
3. Commit y push
4. Vercel hará deploy automáticamente

---

## 🔄 ACTUALIZAR EL FRONTEND

### Si usas GitHub:
```bash
git add .
git commit -m "feat: actualización del frontend"
git push origin main
```

Vercel detectará el push y hará deploy automáticamente.

### Si usas la CLI:
```bash
vercel --prod
```

---

## 📊 MONITOREAR EL DEPLOY

### Ver Logs en Tiempo Real:
1. Ve a tu proyecto en Vercel
2. Click en **Deployments**
3. Click en el deployment en progreso
4. Ve los logs en tiempo real

### Ver Logs de Errores:
1. Ve a **Deployments**
2. Click en el deployment con error
3. Revisa los logs para identificar el problema

---

## ✅ CHECKLIST FINAL

- [ ] Archivo `vercel.json` creado
- [ ] Variable de entorno `VITE_API_URL` configurada
- [ ] Proyecto desplegado en Vercel
- [ ] CORS configurado en el backend
- [ ] Login funciona correctamente
- [ ] Todas las rutas funcionan (sin 404)
- [ ] No hay errores en la consola del navegador

---

## 🎉 ¡LISTO!

Tu aplicación debería estar funcionando en:
- **Frontend:** https://venta-lotes-frontend.vercel.app
- **Backend:** https://venta-lotes-backend.vercel.app/api

---

## 💡 TIPS ADICIONALES

### Dominios Personalizados:
1. Ve a **Settings** → **Domains** en Vercel
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones

### Preview Deployments:
- Cada push a una rama crea un preview deployment
- Útil para probar cambios antes de producción

### Analytics:
- Vercel ofrece analytics gratuitos
- Ve a **Analytics** en tu proyecto

---

## 🆘 SI NECESITAS AYUDA

Si tienes problemas:
1. Revisa los logs en Vercel
2. Verifica la consola del navegador
3. Verifica que el backend esté funcionando
4. Verifica las variables de entorno

**Recuerda:** El frontend y el backend deben estar en proyectos separados en Vercel.
