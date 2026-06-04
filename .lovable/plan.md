# Rotar kiosko a formato vertical

Pasamos toda la UX de horizontal (616×370) a vertical (370×616). El marco físico (bezel grisáceo con borde y botón) sigue en el mismo sitio, solo se gira 90° a la derecha; el contenido se rediseña para aprovechar el alto extra y la anchura reducida.

## 1. Marco del kiosko (`KioskLayout.tsx`)

- Cambiar la pantalla interior de `w-[616px] h-[370px]` a `w-[370px] h-[616px]`.
- Mantener el bezel/cápsula con el mismo padding y el botón inferior izquierdo (ahora queda en la esquina correspondiente del nuevo formato vertical).
- Las pestañas "Anuncios Lavazza / Pago de café" se mantienen encima del bezel sin cambios.

## 2. Memoria del proyecto

- Actualizar `mem://index.md` para que la regla del kiosk pase de "616×370" a "370×616 (vertical)".

## 3. Pantallas que se rediseñan (todas dentro de `src/screens/nespresso/`)

Mismo contenido y misma lógica, solo se reorganiza la composición para vertical:

- **NespressoAdScreen** (carrusel): texto del slide pasa de columna izquierda 60% a bloque superior/centro a pleno ancho; dots y logo se mantienen arriba/abajo.
- **CoffeeOrderScreen** (3 tarjetas: pagar café / bono semanal / bono mensual): grid cambia de `grid-cols-3` a `grid-cols-1` con 3 filas, tarjetas más anchas y bajas (layout horizontal interno: icono a la izquierda, título+descripción al centro, CTA a la derecha). Caption del precio se reduce de `text-[54px]` a algo tipo `text-[34px]` para no comerse el alto.
- **CoffeePaymentMethodScreen** (2–3 métodos): igual que arriba — `grid-cols-1` apilado, tarjetas tipo fila.
- **CoffeeNormalPayScreen / CoffeeBalancePayScreen**: el icono de contactless y "Acerca tu tarjeta para pagar" ya están centrados absolutos en la pantalla, así que se mantienen; solo se ajusta el tamaño del icono (`w-56 h-56` → algo como `w-48 h-48`) y el tipo del importe para que quepa en 370px de ancho.
- **CoffeeBalanceSummaryScreen / CoffeeCouponPayScreen**: la tarjeta central pasa de `w-[70/80%]` a casi pleno ancho con más altura disponible para el resumen.
- **CoffeeProcessingScreen / CoffeePreparingScreen / CoffeeBrewingScreen / CoffeeReadyScreen / CoffeeThanksScreen**: ya son verticales por naturaleza (logo arriba + contenido centrado). Solo se revisa que el contenido respire bien en 370×616 (sin cambios estructurales más allá de pequeños ajustes de tamaño/spacing).

## Fuera de alcance

- No se toca lógica de negocio, contexto, precios, ni el flujo de navegación.
- No se renombran carpetas ni tokens (`nes-*` se mantienen como alias Lavazza, igual que hasta ahora).
- No se cambia la página `/` (máquina vending + CTA "Ver demo"), solo el contenido del bezel en `/demo`.
