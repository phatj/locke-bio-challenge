import { UnknownObject } from '~/db';

const toLowerFirst = (w: string) => w[0].toLowerCase() + w.slice(1);

// keeping this inline so we can see keys easily
interface RemoveKeyPrefix {
  <T extends UnknownObject, P extends string>(
    obj: T,
    prefix: P
  ): {
    [K in keyof T as K extends `${P}${infer R}`
      ? Uncapitalize<R>
      : never]: T[K];
  };
}

export const removeKeyPrefix: RemoveKeyPrefix = (obj, prefix) => {
  const entries = Object.entries(obj);

  const entriesWithoutPrefix = entries.map((entry) => {
    const [key, value] = entry;

    let keyWithoutPrefix = key.replace(prefix, '');
    keyWithoutPrefix = toLowerFirst(keyWithoutPrefix);

    return [keyWithoutPrefix, value];
  });

  return Object.fromEntries(entriesWithoutPrefix);
};
