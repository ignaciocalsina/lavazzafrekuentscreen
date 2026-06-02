## Cambios solicitados

### 1. `NespressoAdScreen` (pantalla de anuncios)
- Logo "NESPRESSO" superior: +20% tamaño (de `text-[12px]` → `~text-[15px]`, tracking proporcional).
- Eyebrow ("BONO SEMANAL", "EXPERIENCIA"…): +30%.
- Título `h2` y línea italic dorada: +30% (de `text-[28px]` → `~text-[37px]`).
- Barra de progreso de slides (puntos abajo): +30% en alto y ancho.

### 2. `CoffeeOrderScreen` (pedido con 3 tarjetas)
- **Header**:
  - Eliminar el chip "ACUMULA VENTAJAS" (lado derecho).
  - Quitar "TU PEDIDO".
  - Mostrar arriba (en color dorado `nes-gold-text`, no blanco): `Importe: 1,50 €`.
  - Debajo en blanco: `Elige cómo quieres pagarlo`.
- **3 tarjetas**: reducir altura un 25% manteniendo la parte inferior anclada (alinear `items-end` o reducir desde arriba, padding-top menor, contenido empuja hacia abajo). Concretamente: `h-[245px]` → `~h-[184px]`, `pt-` reducido, layout interno comprimido hacia abajo.

### 3. Headers consistentes en pantallas de pago/elección
Aplicar el MISMO header que `CoffeeOrderScreen` (sin "TU PEDIDO", sin subtítulos extra, sin `OrderHeader`):
- `CoffeePayChoiceScreen` — header con `NESPRESSO` + `Importe: 1,50 €` (dorado) + `Elige cómo quieres pagarlo` (blanco).
- `CoffeeBundlePayScreen` — header con `NESPRESSO` + el resumen actual del bono (`5 cafés Nespresso · Paga 4, llévate 5` / mensual) + `Elige cómo quieres pagarlo`. Sin importe "1,50".
- (`CoffeeAccountOptionsScreen` se elimina, ver punto 6.)

### 4. Bloques "Pagar con tarjeta" / "Usar fidelización" (en `CoffeePayChoiceScreen` y `CoffeeBundlePayScreen`)
- Altura: −20%, manteniendo parte inferior anclada (reducir desde arriba).
- Ancho: −20% cada bloque. Implementar centrando el grid: contenedor con `max-w-[80%] mx-auto` o columnas `grid-cols-[1fr_1fr]` con `px-` extra.
- "Usar fidelización": cambiar el icono `UserCircle` por el wordmark **NESPRESSO** (componente `NespressoLogo` pequeño) en la zona superior donde estaba el icono.
- Al pulsar "Usar fidelización" → ir directamente a `coffee_processing` → `coffee_brewing` → `coffee_ready` (sin pantalla de identificación, sin selección de saldo/bono).

### 5. Eliminar pantalla de identificación
- Borrar `src/screens/nespresso/CoffeeIdentifyScreen.tsx`.
- Quitar `coffee_identify` de la unión `Screen` en `AppContext.tsx`.
- Quitar la ruta en `ScreenRouter.tsx`.
- Quitar cualquier `navigate('coffee_identify')` restante.

### 6. Eliminar pantalla de opciones de cuenta (saldo / bono / tarjeta)
- Borrar `src/screens/nespresso/CoffeeAccountOptionsScreen.tsx`.
- Quitar `coffee_account_options` de `Screen` y de `ScreenRouter`.
- Eliminar referencias a `mockState`, `MOCK_BALANCE`, `MOCK_BUNDLE_REMAINING` y el toggle dev ⚙ en `KioskLayout` (y constantes en `AppContext` si ya no se usan).
- `CoffeeBundlePayScreen`: como ya no hay saldo, dejar solo **un** botón "Pagar con tarjeta" + "Usar fidelización" (misma estructura que `CoffeePayChoiceScreen`).

### 7. `CoffeeReadyScreen`
- Quitar lógica de variantes por saldo/bono. Mantener mensaje único genérico ("Tu café está listo") y subtítulo según `orderType` (puntual / bono semanal / bono mensual) sin contadores de saldo.

### 8. Actualizar `mem://index.md`
Reflejar nuevo flujo simplificado:
```
ad → coffee_order → (puntual) coffee_pay_choice → [card | fidelización] → coffee_card_pay/coffee_processing → coffee_brewing → coffee_ready
ad → coffee_order → (bono semanal/mensual) coffee_bundle_pay → [card | fidelización] → ... → coffee_ready
```
Eliminar referencias a `coffee_identify`, `coffee_account_options`, `mockState`, `MOCK_BALANCE`, `MOCK_BUNDLE_REMAINING`.

### Archivos a tocar
- `src/screens/nespresso/NespressoAdScreen.tsx` (tamaños)
- `src/screens/nespresso/CoffeeOrderScreen.tsx` (header + altura tarjetas)
- `src/screens/nespresso/CoffeePayChoiceScreen.tsx` (header + bloques + acción fidelización)
- `src/screens/nespresso/CoffeeBundlePayScreen.tsx` (header + bloques tipo PayChoice)
- `src/screens/nespresso/CoffeeReadyScreen.tsx` (limpiar variantes)
- `src/components/NespressoBrand.tsx` (revisar `OrderHeader`, posiblemente eliminar)
- `src/context/AppContext.tsx` (unión `Screen`, constantes)
- `src/screens/ScreenRouter.tsx` (rutas)
- `src/components/KioskLayout.tsx` (quitar toggle ⚙ `mockState`)
- **Eliminar**: `CoffeeIdentifyScreen.tsx`, `CoffeeAccountOptionsScreen.tsx`
- `mem://index.md`
