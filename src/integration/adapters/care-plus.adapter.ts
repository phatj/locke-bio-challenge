import { addKeyPrefix, removeKeyPrefix } from '@/object-prefix';
import { IntegrationAdapter } from './integration-adapter.type';

type CarePlusCustomer = {
  carePlusClientName: string;
  carePlusClientAddress: string;
  carePlusClientCity: string;
  carePlusClientState: string;
  carePlusClientZipcode: string;
  carePlusClientCountry: string;
};

type CarePlusOrder = {
  carePlusId: string;
  carePlusProduct: string;
  carePlusQuantity: number;
  carePlusClientInfo: CarePlusCustomer;
};

export const CarePlusAdapter: IntegrationAdapter<CarePlusOrder, 'carePlusId'> =
  {
    fromPayload({ carePlusClientInfo, ...prefixedOrder }) {
      const order = removeKeyPrefix(prefixedOrder, 'carePlus');
      const customer = removeKeyPrefix(carePlusClientInfo, 'carePlusClient');

      return {
        ...order,
        customer,
      };
    },
    toPayload({ customer, ...order }) {
      const prefixedOrder = addKeyPrefix(order, 'carePlus');
      const carePlusClientInfo = addKeyPrefix(customer, 'carePlusClient');

      return {
        ...prefixedOrder,
        carePlusClientInfo,
      };
    },
  };
