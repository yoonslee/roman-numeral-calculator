const romanToIntMap = {
  I: 1,
  IV: 4,
  V: 5,
  IX: 9,
  X: 10,
  XL: 40,
  L: 50,
  XC: 90,
  C: 100,
  CD: 400,
  D: 500,
  CM: 900,
  M: 1000
};
const romanSymbols = Object.keys(romanToIntMap);

// comment: it's weird that Romans didn't write 990 XM instead of CMXC

function RomanNumber(value) {
  if (!(this instanceof RomanNumber)) {
    return new RomanNumber(value);
  }
  if (typeof value === "number") {
    this.value = value;
    RomanNumber.checkValidity(this.value);
    return;
  }
  if (!value || typeof value !== "string") {
    throw new TypeError("String or Integer value required");
  }

  this.value = 0; // intialize
  const romanSymbolsRe = /IV|IX|XL|XC|CD|CM|([IVXLCDM])\1*/g;
  const str = value.trim();
  let m,
    prev = Infinity,
    lastIndex = 0;
  while ((m = romanSymbolsRe.exec(str))) {
    if (m[0].length > 3) {
      throw new Error("invalid roman value");
    }
    lastIndex += m[0].length;
    const v = m[1] ? romanToIntMap[m[1]] * m[0].length : romanToIntMap[m[0]];

    // ensure the value is less than the previous one
    if (v >= prev) {
      throw new Error("invalid roman value");
    }
    prev = v;
    this.value += v;
  }

  if (lastIndex === 0) {
    // try to parse as base10 Arabic number
    this.value = Number(str);
  } else if (lastIndex !== str.length) {
    throw new Error("invalid roman value"); // some ivalid roman literals exist in value
  }

  RomanNumber.checkValidity(this.value);
}

RomanNumber.checkValidity = n => {
  if (isNaN(n)) {
    throw new Error("invalid value");
  }
  if (!Number.isInteger(n)) {
    throw new Error("invalid float value");
  }
  if (n < 1 || n > 3999) {
    throw new RangeError("invalid range value");
  }
};

RomanNumber.prototype.toInt = function() {
  return this.value;
};

RomanNumber.prototype.toString = function() {
  let s = ""; // value to return
  const v = this.value + ""; // stringify base10 arabic value

  for (let i = 0; i < v.length; i++) {
    const a = +v[i];
    const n = v.length - 1 - i;
    if (a < 4) {
      s += romanSymbols[4 * n].repeat(a);
    } else if (a === 4) {
      s += romanSymbols[4 * n + 1];
    } else if (a === 5) {
      s += romanSymbols[4 * n + 2];
    } else if (a < 9) {
      s += romanSymbols[4 * n + 2] + romanSymbols[4 * n].repeat(a - 5);
    } else {
      s += romanSymbols[4 * n + 3];
    }
  }
  return s; // we could cache it, for perf
};

export default value => {
  try {
    if (typeof value === "string") {
      return {
        isValid: true,
        value: RomanNumber(value).toInt()
      };
    } else if (typeof value === "number") {
      return {
        isValid: true,
        value: RomanNumber(value).toString()
      };
    }
  } catch (err) {
    return {
      isValid: false,
      message: err.message
    };
  }
};
