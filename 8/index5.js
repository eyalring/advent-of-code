const calculateGCD = (num1, num2) => {
  if (num2 === 0) return num1;
  else return calculateGCD(num2, num1 % num2);
};

const arrayOfNumbers = [18113, 16271, 14429, 24253, 13201, 22411];

calculateLCM = (num1, num2) => {
  return (num1 * num2) / calculateGCD(num1, num2);
};

const lcm = arrayOfNumbers.reduce((acc, number) => {
  return calculateLCM(acc, number);
}, arrayOfNumbers[0]);

console.log(lcm);
11188774513823;
