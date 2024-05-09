const input = require("./input2");

let counter = 0;

const count = (record, sizes, cache, group_size = 0, before = "") => {
  const key = record + sizes.join("") + group_size;
  const cacheValue = cache.get(key);
  if (cacheValue !== undefined) {
    const cacheSize = cache.size;
    // console.log("cache hit", key, counter++, cacheSize, "returns", cacheValue);
    return cacheValue;
  }
  if (record === "") {
    if (sizes.length === 0) {
      cache.set(key, 1);
      return 1;
    } else {
      cache.set(key, 0);
      return 0;
    }
  }

  //  console.log("record", record, "sizes", sizes, "group_size", group_size);

  if (sizes.some((size) => size - group_size > record.length)) {
    cache.set(key, 0);
    return 0;
  }

  const currentChar = record.substring(0, 1);
  const rest = record.substring(1);

  switch (currentChar) {
    case "?": {
      const countWithDot = count("." + rest, sizes, cache, group_size, before);
      const countWithHash = count("#" + rest, sizes, cache, group_size, before);

      cache.set(key, countWithDot + countWithHash);
      return countWithDot + countWithHash;
    }

    case "#": {
      const countOfHash = count(
        rest,
        sizes,
        cache,
        group_size + 1,
        before + "#"
      );
      cache.set(key, countOfHash);
      return countOfHash;
    }
    case ".": {
      if (group_size > 0) {
        if (group_size === sizes[0]) {
          const returnWithSize = count(
            rest,
            sizes.slice(1),
            cache,
            0,
            before + "."
          );
          cache.set(key, returnWithSize);
          return returnWithSize;
        } else {
          cache.set(key, 0);
          return 0;
        }
      }

      const countOfRest = count(rest, sizes, cache, 0, before + ".");
      cache.set(key, countOfRest);
      return countOfRest;
    }
  }
};

const lines = input.split("\n");
const sum = lines.reduce((acc, line) => {
  console.log("line", line);
  const [record, sizes] = line.split(" ");
  const recordWithDotAtTheEnd =
    record + "?" + record + "?" + record + "?" + record + "?" + record + ".";
  const sizesFiveTimes = [
    ...sizes.split(","),
    ...sizes.split(","),
    ...sizes.split(","),
    ...sizes.split(","),
    ...sizes.split(","),
  ];
  const cache = new Map();

  acc.push(count(recordWithDotAtTheEnd, sizesFiveTimes.map(Number), cache));
  console.log(acc);
  return acc;
}, []);

console.log(sum);

console.log(
  sum.reduce(
    (acc, value) => {
      console.log("acc", acc, "value", value);
      return acc + value;
    },

    0
  )
);
