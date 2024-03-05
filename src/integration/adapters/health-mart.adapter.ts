import { addKeyPrefix, removeKeyPrefix } from '@/object-prefix';
import { IntegrationAdapter } from './integration-adapter.type';

type HealthMartCustomer = {
  healthMartCustName: string;
  healthMartCustAddress: string;
  healthMartCustCity: string;
  healthMartCustState: string;
  healthMartCustZipcode: string;
  healthMartCustCountry: string;
};

type HealthMartOrder = {
  healthMartId: string;
  healthMartProduct: string;
  healthMartQuantity: number;
  healthMartCustomerInfo: HealthMartCustomer;
};

export const HealthMartAdapter: IntegrationAdapter<
  HealthMartOrder,
  'healthMartId'
> = {
  fromPayload({ healthMartCustomerInfo, ...prefixedOrder }) {
    const order = removeKeyPrefix(prefixedOrder, 'healthMart');
    const customer = removeKeyPrefix(healthMartCustomerInfo, 'healthMartCust');

    return {
      ...order,
      customer,
    };
  },
  toPayload({ customer, ...order }) {
    const prefixedOrder = addKeyPrefix(order, 'healthMart');
    const healthMartCustomerInfo = addKeyPrefix(customer, 'healthMartCust');

    return {
      ...prefixedOrder,
      healthMartCustomerInfo,
    };
  },
};
