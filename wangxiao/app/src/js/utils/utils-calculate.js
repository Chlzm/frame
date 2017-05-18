//加法
export function add(a, b) {
    var c, d, n,e;

    try {
        c = (a + '').split('.')[1].length;
    } catch(f) {
        c = 0;
    }
    try {
        d = (b + '').split('.')[1].length;
    } catch(f) {
        d = 0;
    }
    e = Math.max(c, d);
    a=(a+'').replace('.', '')*Math.pow(10, e-c);
    b=(b+'').replace('.', '')*Math.pow(10, e-d);
    return  (a + b) / Math.pow(10, e);
  }
  //减法
export function sub(a, b) {
    var c, d, n,e;
    
    try {
        c = (a + '').split('.')[1].length;
    } catch(f) {
        c = 0;
    }
    try {
        d = (b + '').split('.')[1].length;
    } catch(f) {
        d = 0;
    }
    e = Math.max(c, d);
    a=(a+'').replace('.', '')*Math.pow(10, e-c);
    b=(b+'').replace('.', '')*Math.pow(10, e-d);
    return  (a - b) / Math.pow(10, e);
  }
  //乘法
export function mul(a, b) {
    var n = 0;
    var c = a.toString(10);
    var d = b.toString(10);
    try {
        n += c.split('.')[1].length;
    } catch (f) {}
    try {
        n += d.split('.')[1].length;
    } catch (f) {}
    return (+c.replace('.', '')) * (+d.replace('.', '')) / Math.pow(10, n);
  }
  //除法
export function dev(a, b) {
    var c, d, e, f;
    try {
        c = (a + '').split('.')[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = (b + '').split('.')[1].length;
    } catch (f) {
        d = 0;
    }
    return e = (a + '').replace('.', '') , f = (b + '').replace('.', ''), mul(e / f, Math.pow(10, d - c));
  }//加法
