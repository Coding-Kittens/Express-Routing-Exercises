const { mode, mean, median, getNums } = require("./operations");

describe("getNums tests", () => {
  test("Should turn a string of numbers into a list of numbers", () => {
    const stringNums = "1,2,3,4,5";
    const nums = [1, 2, 3, 4, 5];

    let res = getNums(stringNums);
    expect(res).toEqual(nums);
  });

  test("Should throw error if the list is empty or there only one item", () => {
    expect(() => {
      getNums(num);
    }).toThrow();

    let nums;
    expect(() => {
      getNums(nums);
    }).toThrow();
  });

  test("Should throw error if there are words or letters in the string", () => {
    let stringNums = "1,2,dog,3,4,5";

    expect(() => {
      getNums(stringNums);
    }).toThrow();

    stringNums = "1,2,dog,3,cat,4,5";
    expect(() => {
      getNums(stringNums);
    }).toThrow();
  });
});

describe("mode tests", () => {
  test("Should return the number that appers the most in a list of numbers", () => {
    const nums = [1, 2, 3, 4, 5, 2, 2];
    expect(mode(nums)).toEqual("2");
  });
  test("Should return 0 if there is the same amount of each number", () => {
    let nums = [1, 2, 3, 4, 5];
    expect(mode(nums)).toEqual(0);
    nums = [1, 2, 3, 1, 4, 5, 2, 3, 4, 5];
    expect(mode(nums)).toEqual(0);
  });
});

describe("mean tests", () => {
  test("Should get the average of all the numbers", () => {
    expect(mean([3, 5])).toBeCloseTo(4);
    expect(mean([3, 4])).toBeCloseTo(3.5);
    expect(mean([1, 2, 3, 4, 3, 4])).toBeCloseTo(2.83);
  });
});

describe("median tests", () => {
  test("If there are two middle number it should return the mid point between them", () => {
    let nums = [1, 2, 3, 4, 1, 2];
    expect(median(nums)).toBeCloseTo(3.5);
  });

  test("Should return the middle number", () => {
    let nums = [1, 2, 3, 4, 1, 2, 2];
    expect(median(nums)).toEqual(4);
  });
});
