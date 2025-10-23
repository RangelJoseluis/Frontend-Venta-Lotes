# ⚡ Guía Rápida: Deploy Frontend en 5 Minutos

## 🚀 PASOS RÁPIDOS

### 1. Ve a Vercel Dashboard
👉 https://vercel.com/dashboard

### 2. Click en "Add New..." → "Project"

### 3. Importa tu Repositorio
- Si está en GitHub: Selecciona el repo
- Si no: Sube manualmente

### 4. Configura el Proyecto
- **Project Name:** `venta-lotes-frontend`
- **Framework:** Vite (auto-detectado)
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 5. Agrega Variable de Entorno
Click en **Environment Variables** y agrega:

```
VITE_API_URL=https://venta-lotes-backend.vercel.app/api
```

Marca: **Production**, **Preview**, **Development**

### 6. Click en "Deploy"
Espera 2-3 minutos...

### 7. ¡Listo! 🎉
Tu app estará en: `https://venta-lotes-frontend.vercel.app`

---

## 🧪 PROBAR

1. Abre tu app: `https://venta-lotes-frontend.vercel.app`
2. Intenta hacer login:
   - Email: `admin@ventadelotes.com`
   - Password: `admin123`

---

## ⚠️ SI HAY ERRORES DE CORS

Actualiza el backend para permitir tu frontend:

**En el backend (`src/main.ts` o `api/index.ts`):**
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

Luego redeploy el backend.

---

## 📝 ARCHIVOS YA CONFIGURADOS

✅ `vercel.json` - Configuración de Vercel
✅ `.env.example` - Ejemplo de variables
✅ `api.config.ts` - Usa variables de entorno

---

## 🔗 URLs FINALES

- **Frontend:** https://venta-lotes-frontend.vercel.app
- **Backend:** https://venta-lotes-backend.vercel.app/api

---

**¿Problemas?** Lee `DEPLOY_FRONTEND.md` para la guía completa.
