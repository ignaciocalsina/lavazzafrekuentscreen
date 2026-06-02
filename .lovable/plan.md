## Reordenar flujo "Pago de café"

**Nuevo orden:**
```
tab "Pago de café" → coffee_loading (spinner 2s, "Preparando tu pedido…")
                   → coffee_offer   (pack 5x4)
                   → coffee_pay     (contactless: 3,50 € o 17,50 € si aceptó oferta)
                   → coffee_done    (QR)
```

**Cambios por archivo:**

- `src/context/AppContext.tsx`
  - Quitar `'coffee_idle'` del union `Screen`.
  - `setKioskMode('coffee')` navega a `coffee_loading` (en lugar de `coffee_idle`).
  - `goHome` ya resetea `kioskMode` a `'promo'`, sin cambios.

- `src/screens/ScreenRouter.tsx`
  - Eliminar import y `case 'coffee_idle'`.

- `src/screens/coffee/CoffeeIdleScreen.tsx`
  - Eliminar archivo.

- `src/screens/coffee/CoffeeLoadingScreen.tsx`
  - `navigate('coffee_pay')` → `navigate('coffee_offer')`.

- `src/screens/coffee/CoffeeOfferScreen.tsx`
  - Ambos botones ("No, gracias" / "Añadir al recibo") navegan a `coffee_pay` (no a `coffee_done`). Se mantiene `setCoffeeOfferAccepted`.

- `src/screens/coffee/CoffeePayScreen.tsx`
  - Quitar el botón "Atrás" (la oferta es una decisión ya tomada).
  - Importe dinámico según `coffeeOfferAccepted`:
    - `false` → 3,50 € · línea "1 × Cappuccino 3,50 €".
    - `true`  → **17,50 €** · líneas "1 × Cappuccino 3,50 €" + "1 × Pack 5 cafés 14,00 €".
  - Al completar pago → `navigate('coffee_done')` (sin cambios).

- `src/screens/coffee/CoffeeDoneScreen.tsx`
  - Sin cambios; ya muestra QR con/sin oferta.

**Memoria a actualizar (mem://index.md):**
- Sustituir línea del Coffee flow por: `Coffee flow: tab "Pago de café" → coffee_loading (2s) → coffee_offer (pack 5x4) → coffee_pay (3,50 € o 17,50 €) → coffee_done (QR).`
