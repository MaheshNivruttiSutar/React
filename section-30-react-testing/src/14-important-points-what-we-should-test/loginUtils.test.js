import { validateLogin } from './loginUtils';

// Good: test business logic (pure function) separately from UI
describe('validateLogin', () => {
  test('returns error when fields are empty', () => {
    expect(validateLogin('', '')).toBe('Email and password are required');
  });

  test('returns error for invalid email', () => {
    expect(validateLogin('invalid', '123456')).toBe('Enter a valid email');
  });

  test('returns error for short password', () => {
    expect(validateLogin('user@test.com', '123')).toBe(
      'Password must be at least 6 characters'
    );
  });

  test('returns success for valid credentials', () => {
    expect(validateLogin('user@test.com', '123456')).toBe('Login successful');
  });
});
