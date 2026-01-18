# AsadoMaster 🔥

**AsadoMaster** es la aplicación definitiva para organizar y gestionar los gastos de tus asados (o cualquier tipo de reunión grupal). Olvídate de las planillas complicadas y los cálculos manuales; AsadoMaster hace todo el trabajo pesado por ti con una interfaz moderna y eficiente.

## 🚀 Características Principales

-   **👥 Gestión de Participantes:** Agrega amigos o grupos familiares. Puedes especificar cuántas personas integran cada grupo (ej: una pareja cuenta como 2) para que la división sea justa.
-   **💰 Registro de Gastos:** Carga fácilmente quién compró qué y cuánto dinero puso. La app vincula automáticamente cada gasto con el participante correspondiente.
-   **⚖️ Liquidación Inteligente:** Utiliza un algoritmo de optimización de deudas para decirte exactamente quién debe pagarle a quién, minimizando la cantidad de transacciones necesarias.
-   **📊 Resumen en Tiempo Real:** Visualiza el costo total, el costo por persona y el estado de pagos de todos los invitados de forma instantánea.
-   **📜 Historial de Asados:** Guarda tus asados finalizados para consultar quiénes asistieron y cuáles fueron los costos totales en encuentros anteriores.
-   **💾 Persistencia Local:** Tus datos se guardan automáticamente en tu navegador (`localStorage`), por lo que no perderás la información si recargas la página.
-   **📱 Diseño Responsive y Premium:** Una experiencia de usuario fluida tanto en computadoras como en dispositivos móviles, con una estética limpia y moderna.

## 🛠️ Tecnologías Utilizadas

-   **React** con **TypeScript** para una lógica robusta y segura.
-   **Tailwind CSS** para un diseño estilizado y altamente responsive.
-   **Lucide React** para una iconografía clara y profesional.
-   **Vite** como entorno de desarrollo ultra rápido.

## ⚙️ Instalación y Ejecución

Si deseas ejecutar el proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd asadomaster
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar en modo desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Generar el build de producción:**
    ```bash
    npm run build
    ```

## 📐 Estructura del Proyecto

-   `App.tsx`: Componente principal que maneja el estado y la interfaz de usuario.
-   `types.ts`: Definición de interfaces para participantes, gastos, historial y balances.
-   `components/`: Componentes modulares de la interfaz (Cards, botones, etc.).
-   `utils/calculations.ts`: Lógica pura para el cálculo de balances y el algoritmo de saltado de deudas.

---
Creado con ❤️ para los amantes del asado. ¡Disfruta de tu próximo encuentro sin preocupaciones matemáticas! 🥩🍷
