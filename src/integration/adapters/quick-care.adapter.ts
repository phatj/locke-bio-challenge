import { addKeyPrefix, removeKeyPrefix } from '@/object-prefix';
import { IntegrationAdapter } from './integration-adapter.type';

type QuickCareCustomer = {
  quickCareUserName: string;
  quickCareUserAddress: string;
  quickCareUserCity: string;
  quickCareUserState: string;
  quickCareUserZipcode: string;
  quickCareUserCountry: string;
};

type QuickCareOrder = {
  quickCareProduct: string;
  quickCareQuantity: number;
  quickCareUserData: QuickCareCustomer;
};

export const QuickCareAdapter: IntegrationAdapter<QuickCareOrder> = {
  fromPayload({ quickCareUserData, ...prefixedOrder }) {
    const order = removeKeyPrefix(prefixedOrder, 'quickCare');
    const customer = removeKeyPrefix(quickCareUserData, 'quickCareUser');

    return {
      ...order,
      customer,
    };
  },
  toPayload({ customer, ...order }) {
    const prefixedOrder = addKeyPrefix(order, 'quickCare');
    const quickCareUserData = addKeyPrefix(customer, 'quickCareUser');

    return {
      ...prefixedOrder,
      quickCareUserData,
    };
  },
};
