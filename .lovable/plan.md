## Reemplazar el icono de contactless

Sustituir el icono de contactless actual por el nuevo PNG azul Lavazza adjuntado por el usuario.

### Pasos

1. Subir la imagen adjunta a Lovable Assets:
   ```
   lovable-assets create --file /mnt/user-uploads/image-3.png --filename contactless-icon.png > src/assets/contactless-icon.png.asset.json
   ```
2. Actualizar las pantallas que usan el icono (`CoffeeNormalPayScreen.tsx`, `CoffeeBalancePayScreen.tsx`, y cualquier otra detectada con `rg "contactless-icon"`) para importar el nuevo `.asset.json` y usar `asset.url` como `src` en lugar del PNG anterior.
3. Eliminar el PNG antiguo `src/assets/contactless-icon.png` (ya no es necesario; el nuevo vive en CDN).

### Fuera de alcance

- No se modifica el tamaño, posición ni animación NFC del icono.
- No se tocan colores ni otros assets.
