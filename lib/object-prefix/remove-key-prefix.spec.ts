import { describe, expect, it } from 'vitest';
import { removeKeyPrefix } from './remove-key-prefix';

describe('renove-key-prefix', () => {
  const myPrefixedObj = {
    myPrefixFoo: true,
    myPrefixBar: 123,
  };

  it('should remove a prefix from the keys in an object', () => {
    const myObj = removeKeyPrefix(myPrefixedObj, 'myPrefix');

    expect(myObj).toEqual({
      foo: true,
      bar: 123,
    });
  });

  it('should not mutate the original object', () => {
    removeKeyPrefix(myPrefixedObj, 'myPrefix');

    expect(myPrefixedObj).toEqual({
      myPrefixFoo: true,
      myPrefixBar: 123,
    });
  });
});
