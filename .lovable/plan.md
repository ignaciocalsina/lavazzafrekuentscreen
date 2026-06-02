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
- **Eliminar** el `BrandFooter` ("NESPRESSO × FREKUENT") de **todas las pantallas**.
- **Eliminar** el subtítulo duplicado `ESPRESSO NESPRESSO` (mantener "TU PEDIDO" + precio + "Elige cómo quieres pagarlo").
- Añadir **imagen de fondo** mezclando 2-3 de los nuevos anuncios (mosaico tríptico con overlay oscuro).
- Hacer las **3 tarjetas ~25% más altas** manteniendo el inicio donde está; crecen hacia abajo aprovechando el espacio liberado por el footer.
- Aumentar todos los textos internos ~20% (título, descripción, CTA).
- En **Bono Semanal** y **Bono Mensual**: sustituir el CTA pequeño por un indicador "TOCA PARA COMPRAR" con icono mano y animación pulse — toda la tarjeta es interactiva.

## 3. Eliminar pantallas intermedias del flujo bono
- Borrar `coffee_bundle_summary` y el paso de identificación cuando se viene de un bono.
- Al pulsar Bono Semanal/Mensual → ir **directamente a `coffee_bundle_pay`**.
- Eliminar `CoffeeBundleSummaryScreen.tsx`. `CoffeeIdentifyScreen` queda solo accesible desde pago puntual con cuenta.

## 4. `CoffeeBundlePayScreen` (2 opciones de pago)
- Reducir el alto de las 2 cajas (Tarjeta / Saldo) al **~60% del actual**.
- Aumentar el texto interno ~20%.
- Añadir una **banda-resumen compacta arriba** con nombre del bono, nº de cafés y total — recoge lo útil de la pantalla `bundle_summary` eliminada.

## 5. Nueva pantalla `CoffeeProcessingScreen`
- Crea screen id `coffee_processing` con spinner circular dorado centrado y texto `Procesando tu selección…`.
- Duración 2s → navega a `coffee_brewing`.
- Insertada **después de confirmar el pago** (desde `coffee_card_pay` tras NFC, desde `coffee_bundle_pay` con saldo, y desde `coffee_account_options` en opciones no-tarjeta) y antes de `coffee_brewing`.

## 6. Pago con tarjeta tras elegir método en bonos
- En `coffee_bundle_pay`, opción "Tarjeta" → reusa `CoffeeCardPayScreen` con **icono NFC central + pulse** y texto `Acerca tu tarjeta para pagar`. Tras ~1,8s → `coffee_processing` → `coffee_brewing`.
- El importe mostrado en `CoffeeCardPayScreen` se calcula dinámicamente según `orderType` (1,50 € / 6 € / 22,50 €).

## 7. Limpieza
- Quitar `BrandFooter` de todas las pantallas (mantener la exportación del componente sin uso).
- Actualizar `AppContext` (`Screen` union): añadir `coffee_processing`, quitar `coffee_bundle_summary`.
- Actualizar `ScreenRouter` en consecuencia.

## Detalles técnicos
- Imágenes: `imagegen--generate_image` quality `standard`, 1280×768, estilo editorial Nespresso (tonos cálidos marrón/dorado, fotografía cinematográfica, sin texto en la imagen).
- Spinner: borde dorado con `border-t-transparent` + `animate-spin`, 80px.
- Indicador "toca": `animate-pulse` con icono `Hand` de lucide.
- Tipografía: subir tamaños (`text-[10px]` → `text-[12px]`, `text-[13px]` → `text-[16px]`).
- Memoria: actualizar `mem://index.md` con el nuevo flujo (sin `bundle_summary`, con `coffee_processing`, sin BrandFooter).

## Flujo final
```
ad  (carrusel 5 imágenes distintas)
coffee_order
 ├─ Pagar este café   → coffee_pay_choice → coffee_card_pay → coffee_processing → coffee_brewing → coffee_ready
 │                                       └─ coffee_identify → coffee_account_options ─┬─ tarjeta → coffee_card_pay → coffee_processing → coffee_brewing → coffee_ready
 │                                                                                     └─ saldo/bono → coffee_processing → coffee_brewing → coffee_ready
 ├─ Bono semanal      → coffee_bundle_pay ─┬─ tarjeta → coffee_card_pay → coffee_processing → coffee_brewing → coffee_ready
 └─ Bono mensual      → coffee_bundle_pay  └─ saldo   → coffee_processing → coffee_brewing → coffee_ready
```
