const type = {
  "1,5": 7,
  "2,4,1": 6,
  "2,3,2": 5,
  "3,3,1,1": 4,
  "3,2,2,1": 3,
  "4,2,1,1,1": 2,
  "5,1,1,1,1,1": 1,
};

module.exports = ({ analysis }) => {
  const size = Object.keys(analysis).length;
  const numbers = Object.values(analysis);
  const sortedArray = numbers
    .sort(function (a, b) {
      return b - a;
    })
    .join(",");
  return type[`${size},${sortedArray}`];
};
