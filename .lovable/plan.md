## 1. Carrusel de anuncios Nespresso (`NespressoAdScreen.tsx`)

Reducir a **4 slides** (eliminar el actual #5 "Asegúrate todos los cafés del mes"):

1. `ad1` — EXPERIENCIA · "El mejor café del mundo, ahora más fácil que nunca." *(sin cambios)*
2. `ad2` — TU RITUAL · "Tu café Nespresso, siempre a mano." *(sin cambios)*
3. `ad3` — BONO SEMANAL · "Compra 5 cafés y paga solo 4." *(sin cambios)*
4. `ad4` — **SUSCRIPCIÓN** · nuevo texto:
  - eyebrow: `PLAN DESAYUNO Y SOBREMESA`
  - title: `29 € al mes, 1 € al día.`
  - em: `Ahorra un 6 % al año.`
  - (imagen `ad4` se mantiene)

Al apretar en el bono semanal o en la suscripción, te ha de salir el flujo de:

1. Prcoesando tu selección
2. Selecciona tu método de pago: ( Pago normal o saldo)
3. Pantalla con icono contacless
4. Pantalla de procesando tu pago
5. Pantalla nueva con "gracias por tu compra" y que vaya en la misma líneade diseño que en el resto de pantallas

## 2. Precios (`AppContext.tsx`)

Recalibrar constantes:

- `COFFEE_PRICE = 2.5` (capuchino)
- `BONO_WEEK_PRICE = 10` (4 × 2,50 €, recibes 5 cafés)
- `BONO_MONTH_PRICE = 37.5` (15 × 2,50 €, recibes 20 cafés)
- `MY_ESPRESSO_BALANCE = 0.5`

(Los textos "Paga 4 y recibe 5" / "Paga 15 y recibe 20" en `CoffeeOrderScreen` ya son correctos; se mantienen.)

## 3. Pantalla principal de pago de café (`CoffeeOrderScreen.tsx`)

Reordenar el header para que coincida exactamente con el de `CoffeePaymentMethodScreen`:

- Logo NESPRESSO
- `Cappuccino` (línea grande en serif/oro, sin "· Importe …")
- `Importe 2,50 €` (segunda línea blanca, serif)
- Texto **"SELECCIONA TU MÉTODO DE PAGO"** desplazado justo encima de los 3 bloques (con `mt-auto mb-2` igual que en `CoffeePaymentMethodScreen`), con pequeño margen sobre las tarjetas.

Los 3 bloques (pagar este café / bono semanal / bono mensual) se mantienen pero se compacta su altura para acomodar el nuevo header.

## 4. Pantalla de pago contactless (`CoffeeNormalPayScreen.tsx` y `CoffeeBalancePayScreen.tsx`)

En el bloque del icono Contactless:

- Reducir el `gap` entre `ContactlessIcon` y el texto "Acerca tu tarjeta para pagar" a la mitad (de `gap-2` a `gap-1`).
- Duplicar el tamaño del texto: de `text-[14px]` a `text-[28px]`.

## Archivos a modificar

- `src/screens/nespresso/NespressoAdScreen.tsx`
- `src/context/AppContext.tsx`
- `src/screens/nespresso/CoffeeOrderScreen.tsx`
- `src/screens/nespresso/CoffeeNormalPayScreen.tsx`
- `src/screens/nespresso/CoffeeBalancePayScreen.tsx`

No se cambia lógica de navegación, estructura de pantallas ni paleta.