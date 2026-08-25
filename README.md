# Prueba Técnica Frontend (prueba-tecnica-front)

Aplicación SPA construida con **Quasar (Vue 3 + TypeScript)** que implementa un
flujo de autenticación simulado y un módulo CRUD de **Métodos de Pago**. Los
datos se manejan en memoria mediante un servicio mock, por lo que no requiere
backend ni base de datos para funcionar.

## Requisitos previos

Antes de comenzar asegúrate de tener instalado:

- **Node.js**: versión `16`, `18` o `20` (recomendado `20`).
- **npm** `>= 6.13.4` (o **Yarn** `>= 1.21.1` si prefieres ese gestor).
- **Quasar CLI** (opcional). Los scripts de npm ya invocan Quasar internamente,
  pero si quieres usar el comando `quasar` de forma global puedes instalarlo con:
  ```bash
  npm install -g @quasar/cli
  ```

## Instalación y ejecución local (paso a paso)

1. **Clona el repositorio** (si aún no lo has hecho) y entra en la carpeta del proyecto:

   ```bash
   git clone <url-del-repositorio>
   cd prueba-tecnica-front-lt
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

   > Si usas Yarn, ejecuta `yarn` en su lugar.

3. **Levanta el entorno de desarrollo** (con hot-reload y reporte de errores):

   ```bash
   npm run dev
   ```

   Esto ejecuta `quasar dev`. La aplicación quedará disponible normalmente en
   `http://localhost:9000` (Quasar mostrará la URL exacta en la consola).

4. **Inicia sesión** con las credenciales de prueba:

   - **Usuario:** `admin`
   - **Contraseña:** `admin123`

   Tras autenticarte serás redirigido al módulo de Métodos de Pago (`/`).

Para ajustes avanzados de configuración consulta
[Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Estructura del proyecto (resumen)

```
src/
├── boot/                 # Archivos de arranque de Quasar
├── components/
│   └── PaymentFilters/   # Filtros de búsqueda y tipo para la tabla
├── layouts/
│   └── MainLayout.vue    # Layout principal (área autenticada)
├── pages/
│   ├── Login/            # Vista y lógica de inicio de sesión
│   ├── Payments/         # Vista, columnas y lógica del CRUD de pagos
│   └── ErrorNotFound.vue # Página 404
├── router/               # Definición de rutas y guardas de navegación
├── services/
│   └── mockData.ts       # API simulada + modelo de negocio (PaymentMethod)
└── stores/               # Estado global con Pinia (auth y payments)
```

## Supuestos adoptados

### Autenticación

- La autenticación es **simulada**. El servicio `mockApi.login` acepta
  únicamente el usuario `admin` con la contraseña `admin123` y devuelve un token
  estático (`token-12345`).
- El token se persiste en `localStorage` bajo la clave `token` y se restaura al
  recargar la aplicación mediante `authStore.checkAuth()`.
- Las rutas protegidas se marcan con `meta.requiresAuth: true`. Se asume que la
  presencia del token equivale a una sesión válida (no hay verificación de
  expiración ni refresco).

### Estructura de datos y tipado del modelo de negocio

El modelo central es `PaymentMethod`, definido en `src/services/mockData.ts`:

```ts
export interface PaymentMethod {
  id: string;
  name: string;
  type: 'Tarjeta' | 'Efectivo' | 'Transferencia';
  status: boolean;
  createdAt: string;
  description?: string;
}
```

Supuestos sobre cada campo:

- **`id`** (`string`): identificador único. En creación se genera con
  `Date.now().toString()`, por lo que se asume que un timestamp en milisegundos
  es suficientemente único para el contexto de la prueba.
- **`name`** (`string`): nombre descriptivo del método de pago. Es el campo
  utilizado por el filtro de búsqueda (comparación en minúsculas y por
  coincidencia parcial).
- **`type`** (unión literal): se restringe a tres valores fijos —`'Tarjeta'`,
  `'Efectivo'` y `'Transferencia'`—. Se asume que el catálogo de tipos es
  cerrado y conocido de antemano; cualquier tipo nuevo requeriría ampliar el tipo.
- **`status`** (`boolean`): representa si el método está activo (`true`) o
  inactivo (`false`). Se modela como booleano en lugar de un estado con más
  valores porque el requerimiento se limita a activar/desactivar mediante un
  toggle.
- **`createdAt`** (`string`): fecha de creación en formato `YYYY-MM-DD`. Al crear
  un registro se normaliza tomando la parte de fecha de un ISO string
  (`new Date().toISOString().split('T')[0]`). Se asume que no se requiere hora ni
  zona horaria.
- **`description`** (`string`, opcional): texto libre. Al ser opcional, se asume
  que un método de pago puede existir sin descripción.

### Operaciones del CRUD

- Los datos viven **en memoria** (`paymentsMockDB`). Se asume que **no persisten**
  entre recargas de la página: al refrescar, la lista vuelve a su estado inicial.
- **Crear**: recibe el objeto sin `id` ni `createdAt` (`Omit<PaymentMethod, 'id' | 'createdAt'>`),
  ya que ambos se generan del lado del servicio mock.
- **Actualizar**: recibe cambios parciales (`Partial<Omit<PaymentMethod, 'id' | 'createdAt'>>`).
  Se asume que `id` y `createdAt` son inmutables una vez creado el registro.
- **Eliminar**: se filtra por `id`; si no existe, el servicio lanza un error.
- Todas las operaciones son **asíncronas** (`Promise`) para simular el
  comportamiento de una API real, y los errores se notifican al usuario mediante
  el plugin `Notify` de Quasar.

### Modal de formulario

- La función `openFormModal(payment?)` acepta un `PaymentMethod` para el modo
  edición o ningún argumento (`null` por defecto) para el modo creación. Se asume
  esta convención como forma de distinguir crear vs. editar desde un único punto
  de entrada.
