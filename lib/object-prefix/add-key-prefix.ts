import { UnknownObject } from '~/db';

const toUpperFirst = (w: string) => w[0].toUpperCase() + w.slice(1);

// keeping this inline so we can see keys easily
interface AddKeyPrefix {
  <T extends UnknownObject, P extends string>(
    obj: T,
    prefix: P
  ): {
    /**
     * In practice, `K` is always a string, but `T` may be instantiated by an
     * object that has other types of keys, so we perform a test for it.
     */
    [K in keyof T as K extends string ? `${P}${Capitalize<K>}` : never]: T[K];
  };
}

export const addKeyPrefix: AddKeyPrefix = (obj, prefix) => {
  const entries = Object.entries(obj);

  const entriesWithoutPrefix = entries.map((entry) => {
    const [key, value] = entry;

    /**
     * This is slightly incorrect from the type since we assume that the key is
     * a string.
     */
    const keyWithPrefix = prefix + toUpperFirst(key);
    return [keyWithPrefix, value];
  });

  return Object.fromEntries(entriesWithoutPrefix);
};
