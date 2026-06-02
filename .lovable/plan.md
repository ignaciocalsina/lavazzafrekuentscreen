# Plan: Entrada directa al vending + chasis horizontal + carrusel Nespresso

## 1. Entrada directa al vending (`/`)

Archivo: `src/pages/Soportes.tsx`.

- Eliminar la imagen `soportes.png` y el botón "Ver máquina".
- Mostrar `vending.png` centrada a pantalla completa sobre fondo negro desde el primer momento (mismo layout que tenía el overlay actual).
- Mantener el CTA "Ver demo" en su posición sobre la zona amarilla, enlazando a `/demo`.
- Sin botón "Atrás" (ya no hay overlay del que volver).
- Eliminar el asset `src/assets/soportes.png` (`delete_asset` sobre su `.asset.json`).

## 2. Chasis del kiosko rotado 90° a la izquierda

Archivo: `src/components/KioskLayout.tsx`.

- Envolver el bezel actual en un wrapper con `transform: rotate(-90deg)` y `transform-origin: center`.
- Intercambiar ancho/alto del contenedor exterior para que el bounding box girado quepa bien centrado en pantalla.
- Mantener el dot de la cámara con sus coordenadas absolutas actuales (`top-[22px] left-[55px]`): tras la rotación quedará físicamente en la esquina inferior-izquierda del viewport, como pide el usuario.
- El contenido interno NO se contrarrota — gira literalmente con el chasis (rotación CSS literal, según preferencia del usuario).
- La pantalla interna sigue siendo lógicamente 370×616.

## 3. Carrusel de anuncios Nespresso (reemplaza el actual `AdScreen`)

Archivo: `src/screens/AdScreen.tsx` + `src/data/promotions.ts`.

- Sustituir las 4 promos actuales (Barça, Misión Imposible, tenis, Movistar+) por slides Nespresso:
  1. Cápsulas **Originals** — gama clásica (Arpeggio, Livanto, Roma…)
  2. Cápsulas **Vertuo** — formato grande
  3. **Edición limitada** estacional
  4. **Aeroccino** — espumador de leche
  5. **Máquinas Pro** para oficina
- Cada slide: imagen de producto a sangre, título, subtítulo corto, precio (`€` con dos decimales y coma) y % de descuento cuando aplique. Mismo formato visual del `AdScreen` actual (overlay degradado, dots arriba, "toca para continuar").
- Auto-rotación cada 5 s (igual que ahora).
- Al tocar un slide se mantiene la navegación actual (`promo_pay` → flujo de pago contactless ya existente, reutilizado tal cual con el precio del producto).
- Eliminar los `.mp4.asset.json` no usados (`barca-led-ad`, `promo-mission`, `promo-tennis`, `promo-movistar`) vía `delete_asset`.

### Assets nuevos

Generar 5 imágenes con `imagegen` (estilo producto sobre fondo limpio, sin usar logo Nespresso real):
- `src/assets/nespresso-originals.jpg`
- `src/assets/nespresso-vertuo.jpg`
- `src/assets/nespresso-limited.jpg`
- `src/assets/nespresso-aeroccino.jpg`
- `src/assets/nespresso-pro.jpg`

Subir cada una con `lovable-assets create` y guardar el `.asset.json` correspondiente.

### Modelo de datos

`src/data/promotions.ts`:
- Mantener `Promotion`, `formatEuro`, `getDiscountPercent`, `getPromotion`.
- Cambiar `PromotionId` a los nuevos ids (`originals | vertuo | limited | aeroccino | pro`).
- `mediaType` pasa a `'image'` para todos.
- Actualizar `selectedPromotionId` por defecto en `AppContext` (`'originals'`).

## 4. Resto de la demo

Sin cambios: `role_select`, `home`, flujos de pago, marketplace, repartidor, etc. siguen tal cual. Solo cambia el contenido del carrusel de entrada y la orientación del chasis.

## 5. i18n y memoria

- Añadir claves de los nuevos slides a `src/i18n/translations.ts` (`ad.nespresso.originals.title`, etc.) en `es/en/fr/de`.
- Eliminar claves obsoletas de las promos viejas si quedan sin uso.
- Actualizar `mem://index.md`:
  - Core: cambiar la línea de "Entry flow" — el `ad` ahora es carrusel Nespresso, no Barça LED.
  - Añadir memoria nueva `mem://features/carrusel-nespresso` con los 5 slides.
  - Actualizar `mem://features/pantalla-inicio` con la nueva orientación horizontal del chasis.

## Fuera de alcance

- No se rediseña la selección de café (descartado en este plan).
- No se toca el flujo de pago (`promo_pay` → `promo_done`) salvo el precio del producto.
- No se cambian las rutas de la app.
