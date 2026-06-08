## Rediseño de tarjetas: pago de café y método de pago

Cambiar la estructura visual de las tarjetas en `CoffeeOrderScreen` y `CoffeePaymentMethodScreen` para que sean verticales, todas en tonos de azul Lavazza, y con badge esquina superior derecha cuando aplique.

### 1. Paleta — 3 tonalidades de azul Lavazza

Añadir tres tokens en `src/index.css` (y exponerlos en `tailwind.config.ts` bajo `nes.blue-*`):

- `--nes-blue-dark`   → azul Lavazza profundo (#1d2f8c, el actual `--nes-gold`)
- `--nes-blue-mid`    → azul intermedio (~#3a52b8)
- `--nes-blue-light`  → azul claro (~#6f86d6, el actual `--nes-gold-text`)

Texto: cream (`--nes-cream`) sobre los tres fondos.

### 2. Estructura vertical de tarjeta

Cada card en `grid-cols-1` con layout:

```
┌────────────────────────────┐
│              [badge top-R] │   ← solo bonos (5 / 20 CAFÉS)
│        ⬤ icono (top, center) │
│                            │
│        TÍTULO              │
│        subtítulo           │
│                            │
│      [ BOTÓN PAGAR ]       │
└────────────────────────────┘
```

- Icono: círculo cream con icono azul, centrado arriba.
- Título: `font-serif-nes`, tracking ancho, centrado.
- Subtítulo: pequeño, opacidad ~85%, centrado.
- Botón: pill cream con texto azul oscuro, centrado, ancho auto.
- Badge bonos: posición `absolute top-2 right-2`, círculo onyx con número + label "CAFÉS".

### 3. Pantallas afectadas

**`CoffeeOrderScreen.tsx`** (3 tarjetas):
1. PAGAR ESTE CAFÉ — fondo `nes-blue-light`, sin badge, CTA "PAGAR AHORA".
2. BONO SEMANAL — fondo `nes-blue-mid`, badge "5 CAFÉS", CTA "TOCA PARA COMPRAR".
3. BONO MENSUAL — fondo `nes-blue-dark`, badge "20 CAFÉS", CTA "TOCA PARA COMPRAR".

**`CoffeePaymentMethodScreen.tsx`** (2 o 3 tarjetas según flujo):
- Misma estructura vertical, misma gradación azul (light → mid → dark según orden).
- Para "Pagar este café": 3 tarjetas (Normal, Cupones, Saldo).
- Para Bonos: 2 tarjetas (Normal, Saldo) — degradado de 2 (light → dark).
- Iconos centrados arriba, sin badge.

### 4. Ajustes de tamaño

Como ahora son verticales y caben 3 en 616px de alto, las tarjetas se estiran con `flex-1`. Padding interno `p-3`, gap entre elementos `gap-2`. Icono `w-11 h-11`, título `text-[14px]`, subtítulo `text-[11px]`, botón `text-[10px] px-3 py-1.5`.

### Fuera de alcance

- No se toca lógica, navegación, precios ni el resto de pantallas (contactless, brewing, etc.).
- Los tokens `nes-gold` / `nes-sand` actuales se mantienen para no romper otras pantallas; los nuevos `nes-blue-*` se añaden en paralelo.
