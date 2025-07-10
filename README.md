# 🎣 VAMOS AL PIQUE - Tienda de Pesca - Ecommerce React

**Tienda online especializada en artículos de pesca**, diseñada para ofrecer una experiencia de compra moderna, clara y completa. Ideal para principiantes, aficionados y expertos que buscan equiparse con confianza, asesoramiento personalizado y productos de alta calidad.

---

## 📦 Descripción del Proyecto

Este ecommerce fue desarrollado con **React.js** utilizando componentes reutilizables, estado global mediante `React Context`, y almacenamiento dinámico en **Firebase Firestore**. Brinda funcionalidades completas para navegación por categorías, carrito de compras, gestión de órdenes y finalización de compra.

---

## 🧭 Funcionalidades

- ✅ Catálogo dinámico conectado a Firebase
- ✅ Navegación por categorías
- ✅ Detalle de productos con stock, descripción y precio
- ✅ Carrito de compras persistente (en memoria mientras dure la sesión)
- ✅ Modificación de cantidades en el carrito
- ✅ Eliminación de productos individuales o vaciado completo con confirmación (modal)
- ✅ Finalización de compra con formulario validado
- ✅ Registro de órdenes en Firestore
- ✅ Página de administración (/admin) con listado de órdenes y exportación a Excel
- ✅ Estilo visual basado en **Bootstrap 5** y diseño responsive
- ✅ Notificaciones con `react-toastify`

---

## 🛠️ Tecnologías utilizadas

| Tecnología            | Rol                                   |
|-----------------------|---------------------------------------|
| React.js              | Librería principal                    |
| React Router          | Navegación por rutas dinámicas        |
| Firebase Firestore    | Base de datos en tiempo real          |
| Bootstrap 5           | Estilos y componentes UI              |
| React Context         | Manejo global del carrito             |
| React Toastify        | Notificaciones amigables              |
| XLSX.js               | Exportación de datos a Excel          |

---

## 🛒 Estructura del proyecto

```bash
/src
├── components/
│   ├── NavBar/
│   ├── Footer/
│   ├── ItemListContainer/
│   ├── Item/
│   ├── ItemDetail/
│   ├── Cart/
│   └── Checkout/
├── context/
│   └── context.js
├── firebaseConfig.js
├── App.jsx
└── main.jsx


---

## 🔐 Sección Admin

- Ruta: `/admin`
- Visualiza todas las órdenes generadas por clientes
- Elimina órdenes individualmente
- Exporta todas las órdenes a Excel (`ordenes.xlsx`)

---

## 🧾 Datos de prueba para Firestore

Podés cargar productos manualmente desde la consola de Firebase o usando el botón `cargarProductoNuevo()` desde el código.

Ejemplo de estructura de producto:

```json
{
  "id": "1",
  "title": "Caña telescópica 3.5m",
  "text": "Ideal para pesca de costa o muelle",
  "price": 18900,
  "img": "https://...",
  "stock": 20,
  "category": "cañas"
}
```

---

## 🚀 Cómo correr el proyecto

1. Cloná el repositorio:

```bash
git git@github.com:emilianomp/react-flex-entrega-01.git
```

2. Instalá dependencias:

```bash
npm install
```

3. Configurá Firebase:

- Renombrá `.env.example` a `.env`
- Agregá tus credenciales de Firebase

4. Ejecutá el proyecto:

```bash
npm run dev
```

---

## ✉️ Contacto

¿Querés contribuir o tenés dudas?

📧 Contacto: [vamosalpique2025@gmail.com]  
💻 Desarrollado por: [Emiliano Mendoza Peña]

---

## 🐟 Acerca de la tienda

**Tienda online especializada en artículos de pesca para todos los niveles**, con un catálogo completo de productos de alta calidad, atención personalizada, envíos a todo el país y contenido educativo.

---
