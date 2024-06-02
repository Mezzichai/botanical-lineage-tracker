export function isObjectLiteral(value:unknown) {
  return value !== null && typeof value === 'object' && value.constructor === Object;
}