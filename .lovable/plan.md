# Rebrand Nespresso → Lavazza

Cambio de marca completo del kiosko: wordmark, paleta de color, imagery de anuncios y textos.

## 1. Paleta de color (índice.css + tailwind)

Sustituyo los tokens dorados Nespresso por la paleta Lavazza (azul corporativo + crema cálida heredada del packaging Qualità Oro).

- `--nes-gold-text` (acento dorado) → azul Lavazza `#1d2e7c` aprox. (hsl 230 62% 30%)
- `--nes-gold` (botones/blocks) → azul medio `#2a3d99`
- `--nes-sand` → naranja cálido del packaging Oro (`#e8a85c`) para mantener contraste cálido en los bloques
- `--nes-cream` se mantiene (crema neutra)
- `--nes-coffee` (fondo): se mantiene oscuro (negro café), funciona con azul

Renombro los tokens semánticos a `--lav-*` y actualizo `tailwind.config.ts` (`nes` → `lav`). Mantengo `nes-*` como alias temporal para no romper componentes hasta migrar todos, luego elimino.

> Decisión rápida: en vez de renombrar 20+ archivos, dejo los nombres de token como están (`nes-gold-text` etc.) pero con valores Lavazza. Es invisible para el usuario final y reduce riesgo. Sólo el wordmark y los textos visibles cambian.

## 2. Wordmark y componente de marca

`src/components/NespressoBrand.tsx`:
- `NespressoLogo` → `LavazzaLogo`: usa el logo Lavazza (PNG subido) en lugar del texto serif. Lo subo como Lovable Asset.
- `KioskHeader`, `FlowBackground`, `ContactlessIcon` se mantienen, sólo cambia la importación.
- Exporto alias `NespressoLogo = LavazzaLogo` para no tocar todos los imports en una pasada.

## 3. Imágenes de anuncios

Reemplazo los 4 ads del carrusel (`nespresso-ad-1..4.jpg`) por imágenes generadas con estética Lavazza (azul + tonos cálidos del Qualità Oro), usando la caja Lavazza adjunta como referencia visual:

- ad-1: bodegón cápsulas Lavazza Oro + taza espresso (también usado como fondo en `FlowBackground`)
- ad-2: ritual café con packaging Lavazza visible
- ad-3: bono semanal — composición editorial con cápsulas
- ad-4: plan mensual — taza + granos, vibe italiana Torino

Genero con `imagegen` (standard) y los subo como Lovable Assets.

## 4. Textos visibles

- "Cappuccino" se mantiene (es un café, no marca). Producto destacado pasa a "Qualità Oro" (Cappuccino) si el usuario quiere, pero por defecto dejo "Cappuccino" para no inventar.
- Cualquier copy que diga "Nespresso" → "Lavazza" en:
  - `index.html` (title, meta description)
  - `CoffeePreparingScreen`, `CoffeeReadyScreen`, `CoffeeThanksScreen`, etc.
  - `NespressoAdScreen` slides
  - `Soportes.tsx`
- Plan "Desayuno y Sobremesa" se mantiene (es genérico).

## 5. Iconos y elementos dorados

Botones, CTAs, badges "TOCA PARA COMPRAR", dots del carrusel, líneas decorativas, etc. ya usan los tokens `nes-gold-text`/`nes-gold`, por lo que cambian automáticamente al actualizar los valores HSL (paso 1).

## Detalles técnicos

- No renombro carpetas (`src/screens/nespresso/`) ni nombres de tokens CSS para evitar churn masivo de imports. Los nombres internos no son visibles al usuario.
- Logo Lavazza: lo subo vía `lovable-assets create` desde `/mnt/user-uploads/image-2.png`.
- Imágenes de ads: genero con `imagegen` model `standard`, 1280×800 jpg, luego `lovable-assets create`. Borro los `.jpg` originales de Nespresso después de subir los nuevos.
- Memory: actualizo `mem://index.md` para reflejar marca Lavazza y nueva paleta.

## Fuera de alcance

- No toco lógica de negocio (precios, flujos, pagos).
- No cambio nombres de archivos/carpetas.
- No genero nuevo logo: uso el PNG que subiste tal cual.
