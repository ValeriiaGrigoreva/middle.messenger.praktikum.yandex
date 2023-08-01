
function isArray(value: unknown): value is [] {
    return Array.isArray(value);
} 

function isPlainObject(value: unknown): any {
return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
} 

function isArrayOrObject(value: unknown): value is ([] | any) {
    return isPlainObject(value) || isArray(value);
} 
  
export function isEqual(lhs: any, rhs: any) {
    // Сравнение количества ключей объектов и массивов
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
} 
