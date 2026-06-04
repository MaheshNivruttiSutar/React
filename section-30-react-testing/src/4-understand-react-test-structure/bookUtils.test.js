import { isFinished, readingProgress } from './bookUtils';

describe('bookUtils', () => {
  describe('readingProgress', () => {
    test('returns rounded percentage string', () => {
      expect(readingProgress(280, 352)).toBe('80%');
    });
  });

  describe('isFinished', () => {
    test('returns false when pages remain', () => {
      expect(isFinished(280, 352)).toBe(false);
    });

    test('returns true when all pages are read', () => {
      expect(isFinished(352, 352)).toBe(true);
    });
  });
});
