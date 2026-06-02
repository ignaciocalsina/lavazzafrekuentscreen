import { useApp } from '@/context/AppContext';
import AdScreen from './AdScreen';
import RoleSelectScreen from './RoleSelectScreen';
import HomeScreen from './HomeScreen';
import IdentificationScreen from './IdentificationScreen';
import { CollectFound, CollectOpening, CollectDone } from './CollectScreens';
import { ReturnConfirmed, ReturnOpen, ReturnDone } from './ReturnScreens';
import { SendDetails, SendPrice, SendPayment, SendCreated, SendDeposit, SendDone } from './SendScreens';
import { DriverNfc, DriverPackageList, DriverOpen, DriverCollectDone, DriverDone } from './DriverScreens';
import MarketplaceTypeScreen from './marketplace/MarketplaceTypeScreen';
import MarketplaceCodeScreen from './marketplace/MarketplaceCodeScreen';
import MarketplaceQuantityScreen from './marketplace/MarketplaceQuantityScreen';
import MarketplacePaymentScreen from './marketplace/MarketplacePaymentScreen';
import MarketplaceDoneScreen from './marketplace/MarketplaceDoneScreen';
import PaymentAmountScreen from './payment/PaymentAmountScreen';
import PaymentInsuranceScreen from './payment/PaymentInsuranceScreen';
import PaymentPayScreen from './payment/PaymentPayScreen';
import PaymentDoneScreen from './payment/PaymentDoneScreen';
import QuantitySelectScreen from './payment/QuantitySelectScreen';
import PromoPayScreen from './payment/PromoPayScreen';
import PromoDoneScreen from './payment/PromoDoneScreen';

import CoffeeLoadingScreen from './coffee/CoffeeLoadingScreen';
import CoffeePayScreen from './coffee/CoffeePayScreen';
import CoffeeOfferScreen from './coffee/CoffeeOfferScreen';
import CoffeeDoneScreen from './coffee/CoffeeDoneScreen';

const ScreenRouter = () => {
  const { screen } = useApp();

  switch (screen) {
    case 'ad': return <AdScreen />;
    case 'role_select': return <RoleSelectScreen />;
    case 'home': return <HomeScreen />;
    case 'identification': return <IdentificationScreen />;
    case 'collect_found': return <CollectFound />;
    case 'collect_opening': return <CollectOpening />;
    case 'collect_done': return <CollectDone />;
    case 'return_confirmed': return <ReturnConfirmed />;
    case 'return_open': return <ReturnOpen />;
    case 'return_done': return <ReturnDone />;
    case 'send_details': return <SendDetails />;
    case 'send_price': return <SendPrice />;
    case 'send_payment': return <SendPayment />;
    case 'send_created': return <SendCreated />;
    case 'send_deposit': return <SendDeposit />;
    case 'send_done': return <SendDone />;
    case 'driver_nfc': return <DriverNfc />;
    case 'driver_package_list': return <DriverPackageList />;
    case 'driver_open': return <DriverOpen />;
    case 'driver_collect_done': return <DriverCollectDone />;
    case 'driver_done': return <DriverDone />;
    case 'marketplace_type': return <MarketplaceTypeScreen />;
    case 'marketplace_code': return <MarketplaceCodeScreen />;
    case 'marketplace_quantity': return <MarketplaceQuantityScreen />;
    case 'marketplace_payment': return <MarketplacePaymentScreen />;
    case 'marketplace_done': return <MarketplaceDoneScreen />;
    case 'payment_amount': return <PaymentAmountScreen />;
    case 'payment_insurance': return <PaymentInsuranceScreen />;
    case 'payment_pay': return <PaymentPayScreen />;
    case 'payment_done': return <PaymentDoneScreen />;
    case 'promo_quantity': return <QuantitySelectScreen />;
    case 'promo_pay': return <PromoPayScreen />;
    case 'promo_done': return <PromoDoneScreen />;
    
    case 'coffee_loading': return <CoffeeLoadingScreen />;
    case 'coffee_pay': return <CoffeePayScreen />;
    case 'coffee_offer': return <CoffeeOfferScreen />;
    case 'coffee_done': return <CoffeeDoneScreen />;
    default: return <RoleSelectScreen />;
  }
};

export default ScreenRouter;
