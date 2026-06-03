## 1. Header centrado y línea "Cappuccino · Importe X €" al doble de tamaño

Afecta a las dos pantallas que comparten el mismo header:

- `src/screens/nespresso/CoffeeOrderScreen.tsx`
- `src/screens/nespresso/CoffeePaymentMethodScreen.tsx`

Cambios en el bloque del header (entre el logo NESPRESSO y el texto "SELECCIONA TU MÉTODO DE PAGO"):

- Combinar `captionLine` + importe en una única línea grande, p. ej.:
  - `Cappuccino · Importe 2,50 €`
  - `Bono semanal · 5 cafés · 10,00 €`
  - `Bono mensual · 20 cafés · 37,50 €`
  - `Plan Desayuno y Sobremesa · 29,00 € / mes`
- Doblar el tamaño tipográfico: de `text-[26px]` → `text-[36px]` aprox, manteniendo `font-serif-nes text-nes-gold-text`.
- Eliminar la segunda línea "Importe …" (ya está integrada en la principal).
- Centrar verticalmente esa línea en el espacio entre el logo y el título "SELECCIONA TU MÉTODO DE PAGO":
  - Envolver header + caption + título de sección en un contenedor `flex-1 flex flex-col`, con el caption en un wrapper `flex-1 flex items-center justify-center`. Así el caption queda visualmente centrado en el hueco disponible.

## 2. Reducir 80 % la separación entre icono contactless y texto

Afecta a:

- `src/screens/nespresso/CoffeeNormalPayScreen.tsx`
- `src/screens/nespresso/CoffeeBalancePayScreen.tsx`

Ahora el `<button>` usa `gap-1` (4 px). Reducir un 80 % → ~1 px. Implementación: cambiar `gap-1` por `gap-0` y aplicar un margen negativo al texto (`-mt-3`) para acercarlo claramente al icono dejando un mínimo de aire.

## Archivos a modificar

- `src/screens/nespresso/CoffeeOrderScreen.tsx`
- `src/screens/nespresso/CoffeePaymentMethodScreen.tsx`
- `src/screens/nespresso/CoffeeNormalPayScreen.tsx`
- `src/screens/nespresso/CoffeeBalancePayScreen.tsx`

No hay cambios de lógica ni de navegación.
