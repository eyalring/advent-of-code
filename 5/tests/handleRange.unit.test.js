jest.mock("../calculateSeed");

const handleRange = require("../handleRange");
const calculateSeed = require("../calculateSeed");

describe("handleRange", () => {
  beforeEach(() => {
    calculateSeed.mockClear();
  });

  test("Range includes only one number -> return its result", () => {
    calculateSeed.mockReturnValue(10);

    const result = handleRange({ start: 1, end: 1 });
    expect(result).toBe(10);
  });
  test("Range includes two numbers -> return the smallest one", () => {
    calculateSeed.mockReturnValueOnce(1).mockReturnValueOnce(2);

    const result = handleRange({ start: 1, end: 2 });
    expect(result).toBe(1);
  });
  test("Range include two numbers which the second result is less than the first result by the difference between the numbers -> return the smallest one", () => {
    calculateSeed.mockImplementation((number) => {
      if (number === 1) return 10;
      else return 5;
    });

    const result = handleRange({ start: 1, end: 2 });
    expect(result).toBe(5);
  });

  test("Check 3 numbers", () => {
    calculateSeed.mockImplementation(({ number }) => {
      if (number === 1) return 10;
      if (number === 2) return 8;
      else return 19;
    });
    const result = handleRange({ start: 1, end: 3 });
    expect(result).toBe(8);
  });
  test("Check 4 numbers", () => {
    calculateSeed.mockImplementation(({ number }) => {
      if (number === 1) return 20;
      if (number === 2) return 21;
      if (number === 3) return 8;
      else return 9;
    });
    const result = handleRange({ start: 1, end: 4 });
    expect(result).toBe(8);
  });
});
