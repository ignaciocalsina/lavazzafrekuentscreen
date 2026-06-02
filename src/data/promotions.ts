import barcaVideo from '@/assets/barca-led-ad.mp4.asset.json';
import missionVideo from '@/assets/promo-mission.mp4.asset.json';
import tennisVideo from '@/assets/promo-tennis.mp4.asset.json';
import movistarVideo from '@/assets/promo-movistar.mp4.asset.json';

export type PromotionId = 'barca' | 'mission' | 'tennis' | 'movistar';

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
    id: 'barca',
    title: 'Barça - Betis',
    subtitle: 'Mira el próximo Barça vs Betis al mejor precio',
    price: 4.99,
    originalPrice: 9.99,
    mediaUrl: barcaVideo.url,
    mediaType: 'video',
  },
  {
    id: 'mission',
    title: 'Misión Imposible',
    subtitle: 'Disfruta de la 3era entrega de Misión Impossible al mejor precio',
    price: 3.99,
    originalPrice: 6.99,
    mediaUrl: missionVideo.url,
    mediaType: 'video',
  },
  {
    id: 'tennis',
    title: 'Alcaraz vs Djokovic',
    subtitle: 'Mira la final ATP al mejor precio',
    price: 5.99,
    originalPrice: 9.99,
    mediaUrl: tennisVideo.url,
    mediaType: 'video',
  },
  {
    id: 'movistar',
    title: 'Movistar Plus +',
    subtitle: '50% dto. los 2 primeros meses',
    price: 4.99,
    originalPrice: 9.99,
    mediaUrl: movistarVideo.url,
    mediaType: 'video',
  },
];

export const getDiscountPercent = (p: Promotion): number =>
  Math.round((1 - p.price / p.originalPrice) * 100);

export const formatEuro = (n: number): string =>
  `${n.toFixed(2).replace('.', ',')} €`;

export const getPromotion = (id: PromotionId | null): Promotion =>
  PROMOTIONS.find(p => p.id === id) ?? PROMOTIONS[0];
