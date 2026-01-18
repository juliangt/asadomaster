# AsadoMaster 🔥

**AsadoMaster** es la aplicación para organizar y gestionar los gastos de tus asados (o cualquier tipo de reunión grupal) en un solo lugar. 

## 🚀 Características Principales

-   **👥 Gestión de Participantes:** Agrega amigos o grupos familiares. Puedes especificar cuántas personas integran cada grupo (ej: una pareja cuenta como 2) para que la división sea justa.
-   **💰 Registro de Gastos:** Carga fácilmente quién compró qué y cuánto dinero puso. La app vincula automáticamente cada gasto con el participante correspondiente.
-   **⚖️ Liquidación Inteligente:** Utiliza un algoritmo de optimización de deudas para decirte exactamente quién debe pagarle a quién, minimizando la cantidad de transacciones.
-   **📊 Resumen en Tiempo Real:** Visualiza el costo total, el costo por persona y el estado de pagos de todos los invitados.
-   **📜 Historial de Asados:** Guarda tus asados finalizados para consultar quiénes asistieron y cuáles fueron los costos totales.
-   **💾 Persistencia Local:** Tus datos se guardan automáticamente en el navegador (`localStorage`).
-   **📜 Sistema de Logging:** Trazabilidad completa de acciones y cambios de estado para depuración y auditoría.
-   **🧪 Testing Suite:** Cobertura de tests unitarios y de componentes para asegurar la integridad de los cálculos.

## 🧠 Lógica de Liquidación de Deudas

El algoritmo de liquidación de deudas (`settleDebts`) está diseñado para resolver las cuentas con el **mínimo número de transacciones posibles**. Su funcionamiento se basa en:

1.  **Cálculo de Balances:** Se determina cuánto pagó cada participante vs. cuánto debía pagar (basado en el costo por persona y sus integrantes).
    - `Balance = Pagado - (CostoPerPersona * Integrantes)`
2.  **Identificación de Perfiles:** 
    - **Deudores:** Aquellos con balance negativo (deben dinero).
    - **Acreedores:** Aquellos con balance positivo (pusieron de más).
3.  **Proceso de Casamiento (Matching):**
    - Se ordena a los deudores y acreedores de mayor a menor saldo.
    - El deudor con la deuda más grande le paga al acreedor con el crédito más grande.
    - Se descuenta el monto de ambos saldos y se repite el proceso hasta que toda la deuda (superior a $0.01) sea saldada.
    - Esto garantiza que las deudas se resuelvan de la forma más directa posible.

## 🛠️ Tecnologías Utilizadas

-   **React 19** con **TypeScript** (Modularizado con Context API).
-   **Tailwind CSS** para un diseño estilizado y responsive.
-   **Vitest & React Testing Library** para pruebas unitarias y de integración.
-   **Lucide React** para iconografía profesional.
-   **Vite** como entorno de desarrollo.

## 📐 Estructura del Proyecto

-   `App.tsx`: Punto de entrada que orquestra los componentes y el proveedor de estado.
*   `context/`: Gestión de estado global con `AsadoProvider` y un `reducer` centralizado.
*   `components/`: Componentes UI modulares (Header, Summary, Sections, Modals).
*   `services/`: Capa de servicios para persistencia (`storage.ts`).
*   `utils/`: 
    - `calculations.ts`: Motor de cálculos y algoritmos.
    - `logger.ts`: Sistema de registro de eventos.
    - `formatters.ts`: Formateo de moneda y datos.
*   `tests/`: Suite de pruebas (distribuida junto a los archivos fuente `.test.ts`).


## ⚙️ Instalación y Ejecución

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Ejecutar en modo desarrollo:**
    ```bash
    npm run dev
    ```

3.  **Ejecutar Tests:**
    ```bash
    npm test
    ```

4.  **Generar build:**
    ```bash
    npm run build
    ```

---
Creado con ❤️ para los amantes de los asados.
