# Provincia Fondos Front-End

> Aplicación web de inversiones desarrollada con Next.js, React y Tailwind CSS para Banco Provincia.

---

## 🏗️ Proyecto

**Provincia Fondos** es la plataforma de inversión online de Banco Provincia. Esta interfaz consume nuestra API REST, mostrando carteras, noticias, simuladores y contenido institucional de forma responsiva y accesible.

---

## 🚀 Tecnologías

- **Framework:** Next.js 15 (App Router)
- **Librerías UI:** React 19, Tailwind CSS, Framer Motion, Lucide Icons
- **Estado & Contexto:** React Context (AppProvider)
- **Estilos:** Tailwind CSS (configuración custom en `tailwind.config.ts`)
- **Componentes:** Storybook v8 (+ addons Essentials, Interactions, Onboarding, Chromatic)
- **Testing:** Jest + Testing Library, Storybook Testing
- **Build & Lint:** ESLint, Prettier
- **Scripts:** Node.js v22, npm

---

## 📦 Instalación

1. **Clonar el repositorio**

   ```bash
    git clone https://github.com/PB-PF-Web/fondos-frontend.git
    cd fondos-frontend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Variables de entorno**  
   Crea un archivo `.env.local` en la raíz con al menos:

   ```
   NEXT_PUBLIC_API_BASE_URL=https://provincia-prod-api.teocoop.site
   ```

4. **Formateo y linting antes de commitear**
   ```bash
   npm run format    # prettier --write .
   npm run lint      # eslint .
   ```

---

## 📖 Scripts

| Comando                    | Descripción                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `npm run dev`              | Levanta el servidor de desarrollo en `localhost:3000`        |
| `npm run build`            | Compila para producción                                      |
| `npm run start`            | Inicia la app en modo producción                             |
| `npm run storybook`        | Inicia Storybook en `localhost:6006`                         |
| `npm run build-storybook`  | Compila Storybook                                            |
| `npm run generate-stories` | Genera automáticamente `.stories.tsx` desde `src/components` |
| `npm run test`             | Ejecuta pruebas unitarias (Jest)                             |
| `npm run coverage`         | Genera reporte de cobertura                                  |
| `npm run format`           | Prettier — formato obligatorio antes de comitear             |
| `npm run lint`             | ESLint — chequeo de calidad del código                       |

---

## 📁 Estructura de Carpetas

```bash
└── 📁src
    ├── app/                     # Páginas y rutas de Next.js
    │   ├── contacto/            # Página de contacto y asistentes
    │   ├── info/                # Información y FAQ
    │   ├── institucional/       # Institucional + detalle de autoridades
    │   ├── noticias/            # Noticias con detalle
    │   ├── nuestros-fondos/     # Fondos y detalle de cuotapartes
    │   ├── proteccion-datos-personales/
    │   ├── simulador/           # Simulador de inversión
    │   ├── test-inversor/       # Test de perfil + resultado
    │   └── tutoriales/          # Tutoriales en video
    ├── components/              # Componentes UI
    │   ├── cartera/             # Gráficos de carteras (PieChart, ChartSection)
    │   ├── contacto/            # ContactBox, AsistentesSection
    │   ├── info/                # AccordionFaq, VideosSection
    │   ├── institucional/       # Autoridades, Cards, Accordions
    │   ├── inviarta/            # Fondos, productos y secciones de landing
    │   ├── noticias/            # Cards, filtros y grilla de noticias
    │   ├── shared/              # UI compartida (Navbar, Footer, Hero, Buttons, etc.)
    │   ├── simulador/           # Sección simulador
    │   └── test-inversor/       # Formulario, resultados, progress bar
    ├── context/                 # Contextos globales
    ├── hooks/                   # Custom hooks
    ├── services/                # Llamadas a API (fondos, noticias, institucional, etc.)
    ├── stories/                 # Storybook stories y assets
    ├── styles/                  # Estilos globales (Tailwind + SCSS)
    ├── types/                   # Tipos TS (ej. Fondo.ts)
    └── utils/                   # Helpers (dateUtils, colores)
```

---

## 📚 Storybook

- **Arranque:** `npm run storybook`
- **Configuración:**
  - Importa tus estilos en `.storybook/preview.tsx`:
    ```ts
    import '../src/app/globals.css';
    ```
  - Decorador global para tu contexto:
    ```tsx
    export const decorators = [
      (Story) => (
        <AppProvider>
          <Story />
        </AppProvider>
      ),
    ];
    ```
- **Generación automática:**  
  Nuestro script `npm run generate-stories` crea stubs básicos de stories y exporta handlers con `fn()`.

---

## 🧪 Testing

- **Unit & Integration:** Jest + Testing Library
- **Coverage:** `npm run coverage`
- **Storybook Interactions:** Usa los addons de interacción para pruebas visuales.

---

## 🤝 Contribuciones

1. **Fork & Branch**  
   Crea una rama descriptiva:
   ```bash
   git checkout -b feat/nombre-de-la-feature
   ```
2. **Commits claros**  
   Usa mensajes en estilo Conventional Commits:
   ```
   feat(component): agregar botón primario
   fix(navbar): corregir collapse en móvil
   ```
3. **Pull Request**  
   Abre un MR contra `main`, asigna revisores y describe los cambios.
4. **Pipeline exitoso**  
   Asegúrate de que lint, tests y build pasen antes de mergear.

---

## 📞 Contacto

**Cristian Varela**  
✉️ [cvarelagarcia@gmail.com](mailto:cvarelagarcia@gmail.com)  
🌐 [github.com/VarelaCristianFacundo](https://github.com/VarelaCristianFacundo)

**Sol Zapata**  
✉️ [szapata@proyectowow.com](mailto:szapata@proyectowow.com)  
🌐 [github.com/solzapata](https://github.com/solzapata)

Gracias por tu interés en Provincia Fondos 💚.
