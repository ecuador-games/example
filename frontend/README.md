# ModernApp Frontend

Una aplicación web moderna con diseño responsivo, tema claro/oscuro y componentes interactivos construida con las mejores prácticas de desarrollo frontend.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Tema Claro/Oscuro**: Cambio dinámico de tema con persistencia
- **Componentes Modernos**: UI con glassmorphism y animaciones suaves
- **Arquitectura Modular**: Código organizado en módulos ES6+
- **Validación de Formularios**: Validación en tiempo real
- **Gestión de Usuarios**: CRUD completo con API REST
- **Navegación Inteligente**: Scroll suave y navegación activa
- **Animaciones**: Efectos visuales modernos y transiciones

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Módulos, Clases, Async/Await
- **Bootstrap 5**: Framework CSS
- **Font Awesome**: Iconografía
- **Vite**: Build tool y dev server

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes HTML reutilizables
│   │   ├── navbar.html
│   │   ├── hero-section.html
│   │   ├── about-section.html
│   │   ├── contact-form.html
│   │   ├── users-section.html
│   │   └── footer.html
│   ├── styles/              # Archivos CSS modulares
│   │   ├── variables.css    # Variables CSS y temas
│   │   ├── base.css         # Estilos base
│   │   ├── layout.css       # Layout y grid system
│   │   ├── components.css   # Componentes UI
│   │   ├── animations.css   # Animaciones y transiciones
│   │   ├── utilities.css    # Clases utilitarias
│   │   └── main.css         # Archivo principal
│   ├── scripts/             # Módulos JavaScript
│   │   ├── app.js           # Punto de entrada principal
│   │   ├── theme-manager.js # Gestión de temas
│   │   ├── form-manager.js  # Gestión de formularios
│   │   ├── user-manager.js  # Gestión de usuarios
│   │   ├── navigation-manager.js # Navegación
│   │   └── scroll-animations.js  # Animaciones de scroll
│   ├── utils/               # Utilidades
│   │   ├── api.js           # Cliente API
│   │   ├── validation.js    # Validaciones
│   │   └── notification.js  # Sistema de notificaciones
│   ├── config/              # Configuración
│   │   └── config.js        # Configuración de la app
│   └── assets/              # Recursos estáticos
│       ├── images/          # Imágenes
│       ├── css/             # CSS externo
│       ├── js/              # JS externo
│       └── lib/             # Librerías externas
├── index-refactored.html    # Archivo HTML principal refactorizado
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
├── .eslintrc.js             # Configuración de ESLint
├── .prettierrc              # Configuración de Prettier
└── README.md                # Este archivo
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js >= 16.0.0
- npm >= 8.0.0

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la build
- `npm run lint` - Linter de código
- `npm run lint:fix` - Corregir errores de linting
- `npm run format` - Formatear código
- `npm run clean` - Limpiar archivos de build

## 🎨 Personalización

### Temas

Los temas se configuran en `src/styles/variables.css`:

```css
:root {
  --primary: #667eea;
  --bg-primary: #0f172a;
  /* ... más variables */
}

[data-theme="light"] {
  --primary: #4f46e5;
  --bg-primary: #ffffff;
  /* ... variables del tema claro */
}
```

### Configuración

La configuración de la aplicación se encuentra en `src/config/config.js`:

```javascript
export const CONFIG = {
  API: {
    BASE_URL: 'http://localhost:5053/api',
    // ... más configuración
  }
};
```

## 🔧 API Integration

La aplicación se conecta con una API REST. Configura la URL base en `src/config/config.js`:

```javascript
API: {
  BASE_URL: 'http://localhost:5053/api',
  ENDPOINTS: {
    USER: '/user',
    USER_BY_ID: (id) => `/user/${id}`,
    USER_SEARCH: '/user/Search'
  }
}
```

## 📱 Responsive Design

La aplicación está optimizada para:

- **Desktop**: > 1200px
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎯 Características Principales

### Gestión de Temas
- Cambio dinámico entre tema claro y oscuro
- Persistencia de preferencias en localStorage
- Detección automática de preferencias del sistema

### Formularios
- Validación en tiempo real
- Mensajes de error contextuales
- Soporte para modo edición

### Gestión de Usuarios
- Listado con paginación
- Búsqueda en tiempo real
- Operaciones CRUD completas

### Animaciones
- Animaciones al hacer scroll
- Transiciones suaves
- Efectos hover modernos

## 🐛 Debugging

Para debugging, abre las herramientas de desarrollador del navegador. La aplicación incluye logs detallados en la consola.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, por favor abre un issue en el repositorio.
