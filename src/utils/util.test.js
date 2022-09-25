import { toSentenceCase } from './utils';

describe('toSentenceCase', () => {
  it('converts a string to sentence case', () => {
    expect(toSentenceCase('hello, hOw ArE yOu?')).toBe('Hello, how are you?');
  });

  it('handles empty strings', () => {
    expect(toSentenceCase('')).toBe('');
  });

  it('handles a string of numbers', () => {
    expect(toSentenceCase('12345')).toBe('12345');
  });
});
