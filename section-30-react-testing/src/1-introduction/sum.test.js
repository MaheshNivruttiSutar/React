import sum from './sum';

test('sums two numbers', () => {
    expect(sum(1, 2)).toBe(3);
});

test('sums two negativenumbers', () => {
    expect(sum(-1, -2)).toBe(-3);
});

test('sums two positive numbers', () => {
    expect(sum(-1, 2)).toBe(1);
});