import { UnknownObject } from '~/db';

const toUpperFirst = (w: string) => w[0].toUpperCase() + w.slice(1);

// keeping this inline so we can see keys easily
interface AddKeyPrefix {
  <T extends UnknownObject, P extends string>(
    obj: T,
    prefix: P
  ): {
    [K in keyof T as K extends string ? `${P}${Capitalize<K>}` : never]: T[K];
  };
}

export const addKeyPrefix: AddKeyPrefix = (obj, prefix) => {
  const entries = Object.entries(obj);

  const entriesWithoutPrefix = entries.map((entry) => {
    const [key, value] = entry;

    const keyWithPrefix = prefix + toUpperFirst(key);
    return [keyWithPrefix, value];
  });

  return Object.fromEntries(entriesWithoutPrefix);
};
