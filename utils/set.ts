  export function merge(lhs: any, rhs: any): any {
    for (let p in rhs) {
      if (!Object.prototype.hasOwnProperty.call(rhs,p)) {
        continue;
      }
  
      try {
        if (rhs[p].constructor === Object) {
          rhs[p] = merge(lhs[p] as any, rhs[p] as any);
        } else {
          lhs[p] = rhs[p];
        }
      } catch (e) {
        lhs[p] = rhs[p];
      }
    }
  
    return lhs;
  }
  
  export function set(object: any | unknown, path: string, value: unknown): any | unknown {
    if (typeof object !== 'object' || object === null) {
      return object;
    }
  
    if (typeof path !== 'string') {
      throw new Error('path must be string');
    }
  
    const result = path.split('.').reduceRight<any>((acc, key) => ({
      [key]: acc,
    }), value as any);
  
    return merge(object as any, result);
  }
