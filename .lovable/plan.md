# Rediseño de descripciones del carrusel + Movistar Plus

## 1. Nuevo formato visual de la descripción (todas las promos)

Inspirado en la imagen de referencia ("Tour Gótico guiado + copa de cava"). Cada slide del carrusel mostrará, sobre el overlay inferior oscuro:

```
        Título grande en 2 líneas (bold, blanco)
          Subtítulo corto descriptivo (regular)

    28,00 €   25,00 €   [-10%]
   (tachado)  (grande,    (pill
              destacado)   azul)
```

- **Título**: bold, 2 líneas máx, centrado.
- **Subtítulo**: una sola línea, peso medio, color blanco/80.
- **Fila de precio** (centrada, alineada en baseline):
  - Precio original tachado, gris claro, tamaño medio.
  - Precio final grande, blanco, extra-bold.
  - Píldora con `-XX%` en azul primario, texto blanco, pequeña.
- Debajo, en pequeño, sigue el "Toca para continuar" pulsante.

## 2. Propuesta de copy + precios por promoción


| #   | Título                  | Subtítulo                                      | Precio orig. | Precio final | Descuento |
| --- | ----------------------- | ---------------------------------------------- | ------------ | ------------ | --------- |
| 1   | **Barça - Betis**       | Mira el próximo Barça vs Betis al mejor precio | 9,99 €       | **4,99 €**   | -50%      |
| 2   | **Misión Imposible**    | Estreno de acción al mejor precio              | 6,99 €       | **3,99 €**   | -43%      |
| 3   | **Alcaraz vs Djokovic** | Mira la final ATP al mejor precio              | 9,99 €       | **5,99 €**   | -40%      |
| 4   | **Movistar Plus +**     | 50% dto. los 2 primeros meses                  | 9,99 €       | **4,99 €**   | -50%      |


(Los precios "originales" son referencia razonable para justificar el descuento; ajustables si prefieres otros.)

## 3. Movistar Plus — nueva imagen y video

- Reemplazar `src/assets/promo-movistar.mp4` por una nueva animación generada a partir de la **segunda imagen adjuntada** (logo M+ blanco sobre fondo negro, con "movistar" debajo).
- Requisitos del nuevo video:
  - **Logo completo siempre visible** en pantalla con margen cómodo (sin recortes).
  - **Zoom claramente reducido** respecto al anterior — encuadre estable, logo ocupando ~55-60% del alto.
  - Animación **sutil**: leve respiración/escala (1.00 → 1.03), brillo suave que recorre el logo una vez, partículas mínimas. Nada agresivo.
  - Fondo negro puro, 1080p, vertical (9:16) para encajar con el kiosco.

## 4. Archivos a tocar (técnico)

- `src/data/promotions.ts`: añadir campos `originalPrice` y `discountPercent` (o calcular discount), actualizar títulos/subtítulos/precios de las 4 promos.
- `src/screens/AdScreen.tsx`: rediseñar el bloque inferior con el nuevo layout (título, subtítulo, fila de precios con tachado + destacado + píldora).
- `src/screens/payment/PromoPayScreen.tsx`: mostrar también precio original tachado + % descuento junto al precio final, coherente con el nuevo formato.
- `src/assets/promo-movistar.mp4`: regenerar con `videogen` usando la imagen adjuntada como `starting_frame`, prompt de animación sutil y encuadre amplio.

¿Te parece bien esta propuesta de copys y precios, o quieres ajustar algún título/precio antes de implementarlo?