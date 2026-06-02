import { useApp } from '@/context/AppContext';
import NespressoAdScreen from './nespresso/NespressoAdScreen';
import CoffeeOrderScreen from './nespresso/CoffeeOrderScreen';
import CoffeePayChoiceScreen from './nespresso/CoffeePayChoiceScreen';
import CoffeeCardPayScreen from './nespresso/CoffeeCardPayScreen';
import CoffeeIdentifyScreen from './nespresso/CoffeeIdentifyScreen';
import CoffeeAccountOptionsScreen from './nespresso/CoffeeAccountOptionsScreen';
import CoffeeBundlePayScreen from './nespresso/CoffeeBundlePayScreen';
import CoffeeProcessingScreen from './nespresso/CoffeeProcessingScreen';
import CoffeeBrewingScreen from './nespresso/CoffeeBrewingScreen';
import CoffeeReadyScreen from './nespresso/CoffeeReadyScreen';

const ScreenRouter = () => {
  const { screen } = useApp();
  switch (screen) {
    case 'ad': return <NespressoAdScreen />;
    case 'coffee_order': return <CoffeeOrderScreen />;
    case 'coffee_pay_choice': return <CoffeePayChoiceScreen />;
    case 'coffee_card_pay': return <CoffeeCardPayScreen />;
    case 'coffee_identify': return <CoffeeIdentifyScreen />;
    case 'coffee_account_options': return <CoffeeAccountOptionsScreen />;
    case 'coffee_bundle_pay': return <CoffeeBundlePayScreen />;
    case 'coffee_processing': return <CoffeeProcessingScreen />;
    case 'coffee_brewing': return <CoffeeBrewingScreen />;
    case 'coffee_ready': return <CoffeeReadyScreen />;
    default: return <NespressoAdScreen />;
  }
};

export default ScreenRouter;
