import { formatMessage } from './file_name';

describe('file_name.test.js naming example', () => {
  test('formatMessage returns greeting', () => {
    expect(formatMessage('Mahesh Sutar')).toBe('Hello, Mahesh Sutar');
  });
});
