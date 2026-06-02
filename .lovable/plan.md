## Objetivo

Sustituir el flujo actual de "Pago de café" por la nueva experiencia Nespresso: la pantalla Frekuent recibe el pedido desde la cafetera, ofrece 3 opciones (pago puntual / bono semanal / bono mensual) con sub-flujos completos de identificación, saldo y bonos. El tab "Carrusel de ofertas" se mantiene pero con anuncios Nespresso. Los flujos marketplace, pago directo y repartidor se eliminan.

## Flujo

```text
Tabs:
  [ Anuncios Nespresso ] [ Pago de café ]

Anuncios Nespresso (tab 1, salvapantallas):
  Carrusel fade con mensajes:
   - "El mejor café del mundo, ahora más fácil que nunca"
   - "Tu café Nespresso, siempre a mano"
   - "Compra 5 cafés y paga solo 4"
   - "Paga 15 cafés y disfruta 20"
   - "Asegúrate todos los cafés del mes"

Pago de café (tab 2):
  coffee_order  — Pedido recibido + 3 tarjetas
    │
    ├─ A) PAGAR ESTE CAFÉ
    │    coffee_pay_choice [Tarjeta] | [Cuenta Nespresso]
    │      ├─ tarjeta → coffee_card_pay → coffee_brewing → coffee_ready (puntual)
    │      └─ cuenta  → coffee_identify → coffee_account_options
    │           · Pagar con saldo / · Usar café de bono / · Pagar con tarjeta y acumular
    │           · (toggle "empty") mensaje "No tienes saldo ni cafés…"
    │         → coffee_brewing → coffee_ready
    │
    ├─ B) BONO SEMANAL (5 cafés, paga 4)
    │    coffee_bundle_summary(week) → coffee_identify
    │      → coffee_bundle_pay [Tarjeta] | [Saldo]
    │      → coffee_brewing → coffee_ready (te quedan 4)
    │
    └─ C) BONO MENSUAL (20 cafés, paga 15)
         coffee_bundle_summary(month) → coffee_identify
           → coffee_bundle_pay → coffee_brewing → coffee_ready (te quedan 19)
```

## Diseño (basado en la imagen)

- Fondo oscuro café (#0a0706) con textura sutil.
- Tipografía serif elegante para títulos (estilo Nespresso), sans para cuerpo.
- 3 tarjetas en fila ajustadas a 616×370:
  - Tarjeta 1 PAGAR ESTE CAFÉ — fondo crema `#f0e9dd`, icono taza, CTA pill negra "PAGAR AHORA →"
  - Tarjeta 2 BONO SEMANAL — fondo arena `#d9c7a7`, badge negro circular "5 CAFÉS", CTA marrón oscuro
  - Tarjeta 3 BONO MENSUAL — fondo dorado `#a8895c`, badge negro "20 CAFÉS", CTA marrón oscuro
- Cabecera: "TU PEDIDO" (dorado pequeño) · "ESPRESSO NESPRESSO" (serif blanco) · "Importe: 1,50 €" · "Elige cómo quieres pagarlo" (dorado).
- Logo NESPRESSO arriba como SVG/texto, franja inferior "NESPRESSO × FREKUENT".

## Toggle dev de estado de usuario

Botón discreto en una esquina del bezel que cicla entre:
- `balance` (saldo 10,00 €)
- `bundle` (3 cafés disponibles del bono semanal)
- `empty` (ni saldo ni bono → activa mensaje de "No tienes saldo…")

## Pantallas nuevas (`src/screens/nespresso/`)

1. `NespressoAdScreen.tsx` — carrusel de 5 anuncios.
2. `CoffeeOrderScreen.tsx` — pedido + 3 tarjetas.
3. `CoffeePayChoiceScreen.tsx` — tarjeta vs cuenta.
4. `CoffeeCardPayScreen.tsx` — contactless.
5. `CoffeeIdentifyScreen.tsx` — 4 métodos mock (QR / email / teléfono / tarjeta fidelización).
6. `CoffeeAccountOptionsScreen.tsx` — opciones según `mockState`.
7. `CoffeeBundleSummaryScreen.tsx` — resumen bono (semanal / mensual).
8. `CoffeeBundlePayScreen.tsx` — tarjeta o saldo.
9. `CoffeeBrewingScreen.tsx` — "Preparando tu pedido…" (taza + vapor 3s).
10. `CoffeeReadyScreen.tsx` — "Tu café está listo" con subtexto dinámico.

## Cambios en archivos existentes

- `src/context/AppContext.tsx`
  - Nuevo union `Screen`: `ad | coffee_order | coffee_pay_choice | coffee_card_pay | coffee_identify | coffee_account_options | coffee_bundle_summary | coffee_bundle_pay | coffee_brewing | coffee_ready`.
  - Quitar screens de marketplace, payment, promo, driver, send, collect, return, identification, role_select, home.
  - Nuevo estado: `orderType` (`puntual|bono_semanal|bono_mensual`), `paymentMethod` (`card|balance|bundle_credit`), `mockState` (`empty|balance|bundle`), `bundleType` (`week|month|null`).
  - `setKioskMode('coffee')` → navega a `coffee_order`.
- `src/screens/ScreenRouter.tsx` — limpiar y mapear nuevas pantallas.
- `src/screens/AdScreen.tsx` — sustituir por `NespressoAdScreen`.
- `src/components/KioskLayout.tsx` — renombrar primer tab a "Anuncios Nespresso", añadir toggle dev sutil.

## Archivos a eliminar

- `src/screens/coffee/*` (CoffeeLoadingScreen, CoffeeOfferScreen, CoffeePayScreen, CoffeeDoneScreen)
- `src/screens/marketplace/*`, `src/screens/payment/*`
- `src/screens/DriverScreens.tsx`, `SendScreens.tsx`, `CollectScreens.tsx`, `ReturnScreens.tsx`, `IdentificationScreen.tsx`, `RoleSelectScreen.tsx`, `HomeScreen.tsx`
- `src/data/marketplaceBrands.ts`, `src/data/promotions.ts`

## Activos

- Fondo café oscuro generado vía imagegen (`src/assets/coffee-bg.jpg`).
- Iconos lucide (`Coffee`, `Calendar`, `ChevronRight`) en círculos crema.
- Logo NESPRESSO como texto SVG (sin imagen para evitar marca).

## Detalles

- Importes: Espresso 1,50 €; bono semanal 6,00 € (4×1,50); bono mensual 22,50 € (15×1,50).
- Pagos contactless con spinner 1,6s.
- `coffee_brewing` auto-navega a `coffee_ready` tras 3s (animación CSS taza + vapor).
- `coffee_ready` lee `orderType`/`bundleType` para componer subtexto correcto.
- "Finalizar" → `goHome()` vuelve al tab "Anuncios Nespresso".

## Memoria a actualizar

Reescribir las líneas Coffee/Promo/Marketplace/Pago directo en `mem://index.md` con el nuevo flujo Nespresso. Eliminar memorias obsoletas: `flujo-marketplace`, `flujo-repartidor`, `interfaz-repartidor`, `pantalla-inicio`, `carrusel-nespresso`.
