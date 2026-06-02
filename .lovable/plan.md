# Cambios en el kiosko Frekuent

## 1. Botón "Ver Demo" (Soportes.tsx)
- Quitar `animate-pulse`.
- Aumentar tamaño ~40%: `text-xs` → `text-base`, `px-3 py-1.5` → `px-5 py-2.5`, icono `w-3.5` → `w-5`.

## 2. Tabs superiores fuera del bezel (KioskLayout)
Añadir, encima del marco físico del kiosko, dos tabs minimalistas:
- **Carrusel de ofertas** (modo actual, default).
- **Pago de café** (nuevo flujo cappuccino).

La tab activa se resalta con un subrayado / color primario; la inactiva en muted. Estado guardado en `AppContext` como `kioskMode: 'promo' | 'coffee'`. Cambiar de tab resetea al inicio del flujo correspondiente.

## 3. Nuevo flujo "Pago de café" (Cappuccino directo)
Secuencia de pantallas dentro del bezel:

```
coffee_idle (atractor: "Toca para pedir tu Cappuccino · 3,50 €")
   ↓ tap
coffee_loading (spinner 2s)
   ↓
coffee_pay  (importe 3,50 € + contactless, reutiliza estilo PromoPay)
   ↓ tras pago contactless
coffee_offer (oferta fija: "Pack 5 cápsulas al precio de 4 · 15,60 €"
              botones: Añadir al recibo / No, gracias)
   ↓
coffee_done  (QR solo, sin código de texto; recibo café + oferta si aceptada)
```

Nuevas pantallas: `CoffeeIdleScreen`, `CoffeeLoadingScreen`, `CoffeePayScreen`, `CoffeeOfferScreen`, `CoffeeDoneScreen` en `src/screens/coffee/`. Añadir screens al `Screen` union y al `ScreenRouter`.

## 4. Pantallas de pago — botón/total más grande (+30%)
Aplica a `PromoPayScreen`, `MarketplacePaymentScreen` y nuevo `CoffeePayScreen`:
- Total: `text-4xl` → `text-5xl`.
- Icono contactless: `w-20` → `w-28`.
- Texto instrucción: `text-[11px]` → `text-sm`.
- Asegurar que sigue cabiendo en 616×370 sin scroll.

## 5. Juntar botones Devolver/Continuar al bloque Total
En `QuantitySelectScreen` y `MarketplaceQuantityScreen`:
- Quitar `flex-1 justify-center` del contenedor central que separa el bloque total de los botones.
- Mover la fila de botones justo bajo el bloque "Total" con `mt-3` (pequeño margen), envueltos junto al stepper+total en un mismo grupo centrado verticalmente.

## Archivos a tocar
- `src/pages/Soportes.tsx` — botón Ver Demo.
- `src/components/KioskLayout.tsx` — render de tabs encima del bezel.
- `src/context/AppContext.tsx` — `kioskMode`, nuevas screens, navegación.
- `src/screens/ScreenRouter.tsx` — routing de nuevas screens.
- `src/screens/coffee/*` — 5 pantallas nuevas.
- `src/screens/payment/PromoPayScreen.tsx`, `src/screens/marketplace/MarketplacePaymentScreen.tsx` — escalado +30%.
- `src/screens/payment/QuantitySelectScreen.tsx`, `src/screens/marketplace/MarketplaceQuantityScreen.tsx` — agrupar botones con total.
- `src/i18n/translations.ts` — strings cappuccino/oferta/QR.
