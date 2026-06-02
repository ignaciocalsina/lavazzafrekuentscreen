import { useApp } from '@/context/AppContext';
import NespressoAdScreen from './nespresso/NespressoAdScreen';
import CoffeeOrderScreen from './nespresso/CoffeeOrderScreen';
import CoffeePaymentMethodScreen from './nespresso/CoffeePaymentMethodScreen';
import CoffeeNormalPayScreen from './nespresso/CoffeeNormalPayScreen';
import CoffeeBalancePayScreen from './nespresso/CoffeeBalancePayScreen';
import CoffeeCouponPayScreen from './nespresso/CoffeeCouponPayScreen';
import CoffeeProcessingScreen from './nespresso/CoffeeProcessingScreen';
import CoffeeBrewingScreen from './nespresso/CoffeeBrewingScreen';
import CoffeeReadyScreen from './nespresso/CoffeeReadyScreen';

const ScreenRouter = () => {
  const { screen } = useApp();
  switch (screen) {
    case 'ad': return <NespressoAdScreen />;
    case 'coffee_order': return <CoffeeOrderScreen />;
    case 'coffee_payment_method': return <CoffeePaymentMethodScreen />;
    case 'coffee_normal_pay': return <CoffeeNormalPayScreen />;
    case 'coffee_balance_pay': return <CoffeeBalancePayScreen />;
    case 'coffee_coupon_pay': return <CoffeeCouponPayScreen />;
    case 'coffee_processing': return <CoffeeProcessingScreen />;
    case 'coffee_brewing': return <CoffeeBrewingScreen />;
    case 'coffee_ready': return <CoffeeReadyScreen />;
    default: return <NespressoAdScreen />;
  }
};

export default ScreenRouter;
