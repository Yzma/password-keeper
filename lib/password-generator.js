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

const range = (num1, num2) => {
  let result = [];
  let counter = 0;
  for (let i = num1; i <= num2; i++) {
    result[counter++] = String.fromCharCode(i);
  }
  return result;
};

const uppercaseCodePoints = range(65, 90);
const lowercaseCodePoints = range(97, 122);
const numberCodePoints = range(49, 57);
const symbolCodePoints = [range(33, 47), range(58, 64), range(91, 96)];

// TODO:
// 1: Cleanup
// 2: Cache current settings array instead of generating a new one each time a password is generated
const generatePassword = (options) => {
  let result = [];
 
  if (options.uppercase) {
    result = result.concat(uppercaseCodePoints);
  }

  if (options.lowercase) {
    result = result.concat(lowercaseCodePoints);
  }

  if (options.numbers) {
    result = result.concat(numberCodePoints);
  }

  if (options.symbols) {
    result = result.concat(symbolCodePoints.flat());
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += result[crypto.randomInt(0, result.length)];
  }

  return password;
};

// const options = {
//   uppercase: true,
//   lowercase: true,
//   numbers: true,
//   symbols: true,
//   length: 20
// };

// for (let i = 0; i < 5; i++) {
//   console.log(generatePassword(options));
// }

module.exports = generatePassword;
