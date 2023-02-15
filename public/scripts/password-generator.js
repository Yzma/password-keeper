const crypto = require("crypto");

/*
options = {
  uppercase: true/false, - Default: true
  lowercase: true/false, - Default: true
  numbers: true/false, - Default: true
  symbols: true/false, - Default: false
  length: 5-100 - Default: 10
}
*/
const defaultOptions  = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
  length: 10
};

module.exports = class PasswordGenerator {

  constructor(options = defaultOptions) {
    this.setOptions(options);
  }

  setOptions(options) {
    this.options = options;
    
    let result = [];
    const uppercaseCodePoints = this.range(65, 90);
    const lowercaseCodePoints = this.range(97, 122);
    const numberCodePoints = this.range(49, 57);
    const symbolCodePoints = [this.range(33, 47), this.range(58, 64), this.range(91, 96)];
 
    if (this.options.uppercase) {
      result = result.concat(uppercaseCodePoints);
    }

    if (this.options.lowercase) {
      result = result.concat(lowercaseCodePoints);
    }

    if (this.options.numbers) {
      result = result.concat(numberCodePoints);
    }

    if (this.options.symbols) {
      result = result.concat(symbolCodePoints.flat());
    }

    this.shuffleArray(result);

    this.cachedPasswordArray = result;
  }

  // TODO:
  // 1: Cleanup
  // 2: Cache current settings array instead of generating a new one each time a password is generated
  generatePassword() {

    let password = '';
    for (let i = 0; i < this.options.length; i++) {
      password += this.cachedPasswordArray[crypto.randomInt(0, this.cachedPasswordArray.length)];
    }

    return password;
  }

  // ref: https://stackoverflow.com/a/12646864/1090359
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  range(num1, num2) {
    let result = [];
    let counter = 0;
    for (let i = num1; i <= num2; i++) {
      result[counter++] = String.fromCharCode(i);
    }
    return result;
  }
};
