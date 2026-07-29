/**
 * interface-style object shape
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 */

/**
 * type-only union of string literals
 * @typedef {'admin' | 'user' | 'guest'} Role
 */

/**
 * intersection with type (&)
 * @typedef {User & { role: Role }} Account
 */

export {};
