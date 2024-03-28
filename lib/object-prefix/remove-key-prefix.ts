import { UnknownObject } from '~/db';

const toLowerFirst = (w: string) => w[0].toLowerCase() + w.slice(1);

// keeping this inline so we can see keys easily
interface RemoveKeyPrefix {
  <T extends UnknownObject, P extends string>(
    obj: T,
    prefix: P
  ): {
    /**
     * This is an interesting conditional type.  In order:
     *  - Map over the keys of the obj `T`.
     *  - For each key `K`, check if the key starts with the prefix `P`, and
     *    capture the remainder of the key as `R`
     *  - If the key matches this pattern, uncapitalize `R`; otherwise,
     *    use the key `K`.
     *  - `T[K]` is a standard indexed access type that gives us the type value
     *    that the key `K` references in `T`
     */
    [K in keyof T as K extends `${P}${infer R}` ? Uncapitalize<R> : K]: T[K];
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
