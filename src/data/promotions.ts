import originals from '@/assets/nespresso-originals.jpg.asset.json';
import vertuo from '@/assets/nespresso-vertuo.jpg.asset.json';
import limited from '@/assets/nespresso-limited.jpg.asset.json';
import aeroccino from '@/assets/nespresso-aeroccino.jpg.asset.json';
import pro from '@/assets/nespresso-pro.jpg.asset.json';

export type PromotionId = 'originals' | 'vertuo' | 'limited' | 'aeroccino' | 'pro';

export type MediaType = 'video' | 'image';

export interface Promotion {
  id: PromotionId;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  mediaUrl: string;
  mediaType: MediaType;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'originals',
    title: 'Cápsulas Originals',
    subtitle: 'Pack 50 cápsulas · Intensidades del 4 al 11',
    price: 19.50,
    originalPrice: 24.50,
    mediaUrl: originals.url,
    mediaType: 'image',
  },
  {
    id: 'vertuo',
    title: 'Cápsulas Vertuo',
    subtitle: 'Pack 30 cápsulas · Espresso, Gran Lungo y Mug',
    price: 22.90,
    originalPrice: 28.90,
    mediaUrl: vertuo.url,
    mediaType: 'image',
  },
  {
    id: 'limited',
    title: 'Edición Limitada Festive',
    subtitle: 'Aromas de invierno · Disponible por tiempo limitado',
    price: 14.90,
    originalPrice: 19.90,
    mediaUrl: limited.url,
    mediaType: 'image',
  },
  {
    id: 'aeroccino',
    title: 'Aeroccino 4',
    subtitle: 'Espumador de leche fría y caliente',
    price: 99.00,
    originalPrice: 129.00,
    mediaUrl: aeroccino.url,
    mediaType: 'image',
  },
  {
    id: 'pro',
    title: 'Máquina Momento Pro',
    subtitle: 'Para tu oficina · Conectividad smart',
    price: 449.00,
    originalPrice: 549.00,
    mediaUrl: pro.url,
    mediaType: 'image',
  },
];

export const getDiscountPercent = (p: Promotion): number =>
  Math.round((1 - p.price / p.originalPrice) * 100);

export const formatEuro = (n: number): string =>
  `${n.toFixed(2).replace('.', ',')} €`;

export const getPromotion = (id: PromotionId | null): Promotion =>
  PROMOTIONS.find(p => p.id === id) ?? PROMOTIONS[0];
