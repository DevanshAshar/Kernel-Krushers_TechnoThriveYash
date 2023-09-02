const usedCodes = new Set();

function generateUniqueCode() {
  let code;
  do {
    code = generateRandomCode();
  } while (usedCodes.has(code));

  usedCodes.add(code);
  return code;
}

function generateRandomCode() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
export default generateUniqueCode;