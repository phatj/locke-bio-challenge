import { describe, expect, it } from 'vitest';
import { addKeyPrefix } from './add-key-prefix';

describe('add-key-prefix', () => {
  const myObj = {
    foo: true,
    bar: 123,
  };

  it('should add a prefix to the keys in an object', () => {
    const prefixedObj = addKeyPrefix(myObj, 'myPrefix');

    expect(prefixedObj).toEqual({
      myPrefixFoo: true,
      myPrefixBar: 123,
    });
  });

  it('should not mutate the original object', () => {
    addKeyPrefix(myObj, 'myPrefix');

    expect(myObj).toEqual({
      foo: true,
      bar: 123,
    });
  });
});
