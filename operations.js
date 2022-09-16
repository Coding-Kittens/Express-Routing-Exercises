const ExpressError = require("./newError");

//gets the number that appers the most
function mode(nums) {
  const numCount = nums.reduce((obj, val) => {
    if (obj[val]) {
      obj[val]++;
    } else {
      obj[val] = 1;
    }
    return obj;
  }, {});

  let num = nums[0];

  let isSameCount = true;
  Object.keys(numCount).forEach((k) => {
    if (numCount[k] > numCount[num]) {
      num = k;
      isSameCount = false;
    }
    if (numCount[k] < numCount[num]) {
      isSameCount = false;
    }
  });

  if (isSameCount) {
    num = 0;
  }
  return num;
}

//gets the average
function mean(nums) {
  num = 0;

  nums.forEach((n) => {
    num += n;
  });

  return num / nums.length;
}

//gets the mid point
function median(nums) {
  const len = nums.length;

  //checks if there are an even amount of numbers
  if (len % 2 === 0) {
    let index = len / 2;
    return mean([nums[index], nums[index - 1]]); //gets the mid point between the two middle numbers since there is not one middle number
  }

  let index = Math.floor(len / 2);

  return nums[index]; //returns the number at the middle index
}

//turns the string nums into numbers
//throws error if there are no nums
//throws error if there are letters
function getNums(numsList, type) {
  let regex = /,/;
  if (!numsList || !regex.test(numsList)) {
    throw new ExpressError(
      `Numbers are required. Try again with, ?nums=(numbers you want here seperated by commas). Ex:/${type}?nums=1,2,3,4,5,2,3,3`,
      400
    );
  }
  const letter = [];

  nums = numsList.split(/,/).map((val) => {
    let n = Number(val);
    if (n) {
      return n;
    } else {
      letter.push(val);
      return val;
    }
  });

  if (letter.length > 0) {
    if (letter.length === 1) {
      throw new ExpressError(`${letter} is not a number!`, 400);
    } else {
      throw new ExpressError(`${letter} are not numbers!`, 400);
    }
  }

  return nums;
}

module.exports = { mode, mean, median, getNums };
