import originals from '@/assets/nespresso-originals-real.png.asset.json';
import vertuo from '@/assets/nespresso-vertuo-real.png.asset.json';
import limited from '@/assets/nespresso-limited.jpg.asset.json';
import planBarista from '@/assets/nespresso-plan-barista.jpg';
import planRitual from '@/assets/nespresso-plan-ritual.jpg';

export type PromotionId = 'originals' | 'vertuo' | 'limited' | 'plan_barista' | 'plan_ritual';

export type MediaType = 'video' | 'image';
export type PromotionKind = 'capsules' | 'subscription';

export interface Promotion {
  id: PromotionId;
  kind: PromotionKind;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  mediaUrl: string;
  mediaType: MediaType;
  animate?: boolean;
  perMonth?: boolean;
  perDay?: string; // e.g. "1,5 €"
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'originals',
    kind: 'capsules',
    title: 'Cápsulas Originals',
    subtitle: 'Pack 50 cápsulas · Intensidades del 4 al 11',
    price: 19.50,
    originalPrice: 24.50,
    mediaUrl: originals.url,
    mediaType: 'image',
    animate: true,
  },
  {
    id: 'vertuo',
    kind: 'capsules',
    title: 'Cápsulas Vertuo',
    subtitle: 'Pack 30 cápsulas · Espresso, Gran Lungo y Mug',
    price: 22.90,
    originalPrice: 28.90,
    mediaUrl: vertuo.url,
    mediaType: 'image',
    animate: true,
  },
  {
    id: 'limited',
    kind: 'capsules',
    title: 'Edición Limitada Festive',
    subtitle: 'Aromas de invierno · Por tiempo limitado',
    price: 14.90,
    originalPrice: 19.90,
    mediaUrl: limited.url,
    mediaType: 'image',
  },
  {
    id: 'plan_barista',
    kind: 'subscription',
    title: 'Plan Barista',
    subtitle: 'Para quienes hacen del café su imprescindible durante todo el día',
    price: 40.50,
    originalPrice: 45.00,
    mediaUrl: planBarista,
    mediaType: 'image',
    perMonth: true,
    perDay: '1,5 €',
  },
  {
    id: 'plan_ritual',
    kind: 'subscription',
    title: 'Plan Ritual',
    subtitle: 'La pausa perfecta para quienes disfrutan de varias tazas al día',
    price: 35.10,
    originalPrice: 39.00,
    mediaUrl: planRitual,
    mediaType: 'image',
    perMonth: true,
    perDay: '1,3 €',
  },
];

export const getDiscountPercent = (p: Promotion): number =>
  Math.round((1 - p.price / p.originalPrice) * 100);

export const formatEuro = (n: number): string =>
  `${n.toFixed(2).replace('.', ',')} €`;

export const getPromotion = (id: PromotionId | null): Promotion =>
  PROMOTIONS.find(p => p.id === id) ?? PROMOTIONS[0];
