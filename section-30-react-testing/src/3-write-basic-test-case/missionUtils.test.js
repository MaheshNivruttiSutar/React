import { formatSol, oxygenLevel } from './missionUtils';

test('formatSol returns readable day label', () => {
  expect(formatSol(42)).toBe('Sol 42');
});

test('oxygenLevel returns Nominal when supply is healthy', () => {
  expect(oxygenLevel(98)).toBe('Nominal');
});

test('oxygenLevel returns Critical when supply is low', () => {
  expect(oxygenLevel(55)).toBe('Critical');
});
