import amazon from '@/assets/brands/amazon.png';
import google from '@/assets/brands/google.png';
import microsoft from '@/assets/brands/microsoft.png';
import apple from '@/assets/brands/apple.png';
import movistar from '@/assets/brands/movistar.png';
import netflix from '@/assets/brands/netflix.png';

export type MarketplaceBrandId =
  | 'amazon'
  | 'google'
  | 'microsoft'
  | 'apple'
  | 'movistar'
  | 'netflix';

export interface MarketplaceBrand {
  id: MarketplaceBrandId;
  name: string;
  logo: string;
  /** Demo amount in EUR */
  amount: number;
}

export const MARKETPLACE_BRANDS: MarketplaceBrand[] = [
  { id: 'amazon', name: 'Amazon', logo: amazon, amount: 25 },
  { id: 'google', name: 'Google Play', logo: google, amount: 25 },
  { id: 'microsoft', name: 'Microsoft', logo: microsoft, amount: 25 },
  { id: 'apple', name: 'Apple', logo: apple, amount: 25 },
  { id: 'movistar', name: 'Movistar', logo: movistar, amount: 20 },
  { id: 'netflix', name: 'Netflix', logo: netflix, amount: 30 },
];

export const getBrand = (id: MarketplaceBrandId | null): MarketplaceBrand | undefined =>
  MARKETPLACE_BRANDS.find(b => b.id === id);
