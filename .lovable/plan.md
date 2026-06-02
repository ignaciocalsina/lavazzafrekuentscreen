# Cambios solicitados

## 1. Pantalla de anuncios (`NespressoAdScreen`)

- Generar **5 imágenes distintas** (una por slide) con `imagegen--generate_image`, guardadas en `src/assets/nespresso-ad-1.jpg` … `nespresso-ad-5.jpg`. Cada una alineada con su mensaje:
  1. Experiencia / café premium servido.
  2. Ritual / taza humeante con cápsulas.
  3. Bono semanal / 5 tazas alineadas.
  4. Bono mensual / colección de cápsulas variadas.
  5. Ahorro / café con grano y elegancia editorial.
- El carrusel rotará la imagen junto al texto (fade + ken-burns por slide).

## 2. Pantalla `CoffeeOrderScreen` (3 tarjetas + pedido)

- **Eliminar** el `BrandFooter` ("NESPRESSO × FREKUENT") de esta pantalla. (elimianr de todas las pantallas)
- **Eliminar** el subtítulo duplicado `ESPRESSO NESPRESSO` (mantener "TU PEDIDO" + precio + "Elige cómo quieres pagarlo").
- Añadir **imagen de fondo** mezclando 2-3 de los nuevos anuncios (mosaico sutil con overlay oscuro) para dar contexto Nespresso.
- Hacer las **3 tarjetas ~25% más altas** (manteniendo el inicio donde está; crecen hacia abajo aprovechando el espacio libre del footer eliminado).
- Aumentar todos los textos internos ~20% (tamaños de título, descripción, CTA).
- En **Bono Semanal** y **Bono Mensual**: añadir un indicador visual de "toca para continuar" (icono mano + texto pulsante `TOCA PARA COMPRAR`) en lugar de un botón pequeño, dejando claro que toda la tarjeta es interactiva.

## 3. Eliminar pantallas intermedias del flujo bono

- Borrar el paso `coffee_bundle_summary` y el paso `coffee_identify` cuando se viene de un bono.
- Al pulsar Bono Semanal/Mensual → ir **directamente a `coffee_bundle_pay**` (las 2 opciones de pago: tarjeta / saldo).
- Eliminar `CoffeeBundleSummaryScreen.tsx` y simplificar `CoffeeIdentifyScreen` (ya no se usa desde bonos; sigue accesible solo si lo necesitamos desde pago puntual con cuenta).

## 4. `CoffeeBundlePayScreen` (2 opciones de pago)

- Mantener las 2 cajas (Tarjeta / Saldo) pero:
  - Reducir su alto al **60% del actual**.
  - Aumentar el texto interno ~20%.
- Aprovechar el espacio superior liberado para mostrar el resumen del bono (lo útil de la pantalla eliminada): nombre del bono, nº de cafés y precio total, en una banda compacta arriba.

## 5. Nueva pantalla de "Procesando" antes del brewing

- Crear `CoffeeProcessingScreen.tsx` (screen id `coffee_processing`) con spinner circular dorado centrado y texto `Procesando tu selección…`.
- Duración 2s → navega a `coffee_brewing`.
- Insertar este paso **después de confirmar el pago** (desde `coffee_card_pay` tras NFC, y desde `coffee_bundle_pay` tras elegir método) y antes de `coffee_brewing`.

## 6. Pago con tarjeta tras elegir método en bonos

- Cuando en `coffee_bundle_pay` se elige "Tarjeta", ir a una pantalla tipo `coffee_card_pay` con **icono NFC central + animación pulse** y texto `Acerca tu tarjeta para pagar`. Al "detectar" tarjeta (timer 1,6s) → `coffee_processing` → `coffee_brewing`.
- Reutilizar el actual `CoffeeCardPayScreen` (ya tiene NFC pulse + spinner), pero asegurando que su siguiente paso pase por `coffee_processing` (no directo a brewing).

## 7. Limpieza

- Quitar `BrandFooter` de las pantallas donde el usuario lo ha rechazado (al menos `CoffeeOrderScreen`; revisar consistencia en el resto del flujo de pago, dejándolo solo en pantallas finales si aporta).
- Actualizar `AppContext` (`Screen` union) añadiendo `coffee_processing` y quitando `coffee_bundle_summary`.
- Actualizar `ScreenRouter`.

## Detalles técnicos

- Imágenes: `imagegen--generate_image` quality `standard`, 1280×768, estilo editorial Nespresso (tonos cálidos marrón/dorado, fotografía cinematográfica, sin texto en la imagen).
- Spinner: CSS keyframe `@keyframes spin` ya disponible en Tailwind (`animate-spin`); círculo con borde dorado y borde superior transparente, 56px.
- Indicador "toca": animación `nfc-pulse` ya existente o nueva `tap-hint` (escala 1 → 1.06).
- Tipografía: subir tamaños usando escala existente (`text-[10px]` → `text-[12px]`, `text-[13px]` → `text-[16px]`, etc.).
- Memoria: actualizar `mem://index.md` con el nuevo flujo (sin `bundle_summary`, con `coffee_processing`, sin BrandFooter en order).

## Flujo final

```
ad  (carrusel 5 imágenes distintas)
coffee_order
 ├─ Pagar este café   → coffee_pay_choice → coffee_card_pay → coffee_processing → coffee_brewing → coffee_ready
 │                                       └─ coffee_identify → coffee_account_options → coffee_processing → coffee_brewing → coffee_ready
 ├─ Bono semanal      → coffee_bundle_pay ─┬─ tarjeta → coffee_card_pay → coffee_processing → coffee_brewing → coffee_ready
 └─ Bono mensual      → coffee_bundle_pay  └─ saldo   → coffee_processing → coffee_brewing → coffee_ready
```