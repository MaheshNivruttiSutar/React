export function validateLogin(email, password) {
  if (!email.trim() || !password.trim()) {
    return 'Email and password are required';
  }
  if (!email.includes('@')) {
    return 'Enter a valid email';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return 'Login successful';
}
