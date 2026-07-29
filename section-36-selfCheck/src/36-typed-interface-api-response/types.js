/**
 * @typedef {Object} Geo
 * @property {string} lat
 * @property {string} lng
 */

/**
 * @typedef {Object} Address
 * @property {string} street
 * @property {string} suite
 * @property {string} city
 * @property {string} zipcode
 * @property {Geo} geo
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} [phone]
 * @property {Address} address
 */

export {};
