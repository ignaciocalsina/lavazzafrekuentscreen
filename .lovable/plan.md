## 1. Adaptar todas las pantallas al formato landscape (616×370)

Actualmente las pantallas siguen pensadas para vertical (estrecho/alto) y al meterlas en un viewport ancho/bajo quedan con todo apretado arriba y mucho espacio vacío a los lados. Reescribir cada pantalla pensando en dos columnas siempre que tenga sentido:

- **RoleSelectScreen** (`/demo` inicial): pasar a layout 2 columnas. Izquierda: bloque "Pago directo" + "Promoción Nespresso" apilados verticalmente. Derecha: grid 3×2 de tarjetas regalo. Eliminar el `pt-1` y el scroll vertical.
- **AdScreen** (carrusel Nespresso): layout horizontal con imagen a la izquierda (50%) y panel de texto/precio/CTA a la derecha (50%) en lugar del overlay inferior actual. Dots arriba‑centrado se quedan.
- **HomeScreen**: 3 acciones en fila horizontal en vez de columna apilada.
- **IdentificationScreen / CollectScreens / ReturnScreens / SendScreens**: revisar cada una para usar dos columnas (info/preview izquierda, acción/teclado derecha) cuando aplique. Reducir tipografías que estén demasiado grandes para 370 px de alto.
- **PaymentAmountScreen**: teclado numérico a la derecha, importe + hints + botón continuar a la izquierda.
- **PaymentInsuranceScreen**: opciones de seguro en grid 2×2 a la derecha, resumen importe + texto explicativo a la izquierda.
- **PromoPayScreen / PaymentPayScreen / MarketplacePaymentScreen**: imagen/resumen del producto a la izquierda, NFC + instrucciones a la derecha.
- **PromoDoneScreen / PaymentDoneScreen / MarketplaceDoneScreen / SendDoneScreen / CollectDoneScreen**: QR + check a la izquierda, detalle/código/CTA a la derecha.
- **MarketplaceTypeScreen / MarketplaceCodeScreen**: ya tipo 2 columnas, revisar tamaños.
- **DriverScreens**: revisar OperationCard list para no rebosar.
- **KioskLayout**: el footer "Contacto" actualmente ocupa una franja inferior de 50 px en una pantalla de 370 px (≈14%). Moverlo a un botón flotante en una esquina (p. ej. esquina inferior derecha del área de contenido) para liberar altura. La barra de estado superior se reduce a la altura mínima.

Regla general: nada debe hacer scroll dentro del área 616×370 (memoria del kiosko). Si algo no entra, reducir tamaños y simplificar, no permitir scroll.

## 2. Añadir paso de selección de unidades antes del pago

Nueva pantalla `quantity_select` entre la selección de producto y la pantalla de pago. Aplica al flujo Promoción (carrusel Nespresso) y al flujo Marketplace (tarjetas regalo) — el flujo "Pago directo" no la necesita porque el importe se teclea libremente.

Diseño (landscape):
- Izquierda: thumbnail del producto + título + precio unitario.
- Derecha: selector grande con botones `−` y `+` (mín. 1, máx. 20), número central tabular‑nums, subtotal en vivo debajo (`unidad × cantidad = total`), botón "Continuar".

Estado nuevo en `AppContext`: `quantity: number` + `setQuantity(n)`. Los siguientes `*PayScreen` toman `price * quantity` como importe a cobrar y muestran ambos (unidad y total).

Rutas:
- Carrusel Nespresso → tap promoción → `quantity_select` → `promo_pay` → `promo_done`.
- Marketplace → marca → tipo (digital/física) → `quantity_select` → `marketplace_payment` → `marketplace_done`.

## 3. Rehacer el carrusel Nespresso

**Eliminar máquinas y Aeroccino** (`pro`, `aeroccino`) de `PROMOTIONS`. Borrar también sus assets (`nespresso-pro.jpg`, `nespresso-aeroccino.jpg`).

**Añadir suscripciones** a partir de las imágenes adjuntadas (referencia visual, no se incrustan):
- `plan_barista`: 45 €/mes (1,5 €/día), con 10 % de descuento → precio mostrado 40,50 €/mes, original tachado 45 €/mes. Subtítulo: "Diseñado para quienes hacen del café su imprescindible durante todo el día."
- `plan_ritual`: 39 €/mes (1,3 €/día), con 10 % → 35,10 €/mes, original 39 €/mes. Subtítulo: "La pausa perfecta para quienes disfrutan de varias tazas al día."

Para cada suscripción generar una imagen visual de Nespresso (taza/cápsula tipo lifestyle) con `imagegen`.

**Cápsulas con imágenes reales del usuario:**
- `originals`: usar `user-uploads://image-3.png` (cápsulas de colores). Subir como asset Lovable.
- `vertuo`: usar `user-uploads://image-4.png` (vaso con café + cápsula). Subir como asset Lovable.
- Edición Limitada (`limited`): se mantiene con la imagen ya generada.

**Animación de cápsulas**: añadir `kenBurns` / float al `<img>` cuando es slide de cápsulas (originals/vertuo): un `transform: scale(1) → scale(1.08)` con `translate` ligero, 8 s ease‑in‑out infinito. Implementado como keyframe en Tailwind config y clase `animate-ken-burns` aplicada condicionalmente.

**Estructura final del carrusel** (5 slides, auto‑rotate 5 s):
1. Cápsulas Originals (imagen usuario, animada)
2. Cápsulas Vertuo (imagen usuario, animada)
3. Edición Limitada Festive (imagen generada, estática)
4. Plan Barista — Suscripción (imagen generada Nespresso lifestyle)
5. Plan Ritual — Suscripción (imagen generada Nespresso lifestyle)

`PromotionId` pasa a `'originals' | 'vertuo' | 'limited' | 'plan_barista' | 'plan_ritual'`. `AppContext.selectedPromotionId` por defecto `'originals'`. Para suscripciones, mostrar "/mes" en `PromoPayScreen` y omitir el paso de cantidad (cantidad fija = 1).

## Detalles técnicos

- Animación Ken Burns: nueva keyframe en `tailwind.config.ts` (`ken-burns`) + clase utilitaria. Aplicar `style={{ animationDelay: ... }}` para evitar saltos al cambiar slide.
- Selector de unidades: componente `QuantityStepper` reusable en `src/components/kiosk/`.
- i18n: nuevas claves `quantity.title`, `quantity.unit`, `quantity.total`, `quantity.continue`, `promo.plan_barista.*`, `promo.plan_ritual.*`, `promo.per_month` en `translations.ts` (ES/EN/FR/DE).
- `AdScreen`: para suscripciones, mostrar "/mes" y badge "‑10%". Para cápsulas, sin sufijo y badge calculado de `getDiscountPercent`.
- Limpieza: borrar `nespresso-pro.jpg(.asset.json)` y `nespresso-aeroccino.jpg(.asset.json)`.
- Actualizar `mem://features/carrusel-nespresso` y `mem://index.md` con los nuevos 5 slides, el paso de cantidad y la regla landscape.

## Fuera de alcance

- No tocar lógica de NFC ni del QR final más allá de adaptarlo visualmente al landscape.
- No añadir backend / persistencia de suscripciones (solo simulación visual como el resto del kiosko).
