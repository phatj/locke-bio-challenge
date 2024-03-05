import { CarePlusAdapter } from './care-plus.adapter';
import { HealthMartAdapter } from './health-mart.adapter';
import { QuickCareAdapter } from './quick-care.adapter';

export const AdapterMap = Object.freeze({
  healthmart: HealthMartAdapter,
  careplus: CarePlusAdapter,
  quickcare: QuickCareAdapter,
});

export type AdapterMap = typeof AdapterMap;
