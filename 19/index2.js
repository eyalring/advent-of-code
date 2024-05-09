const input = require("./input1");
const types = require("./types");

const lines = input.split("\n");
const n = lines.indexOf("");
const rules = lines.slice(0, n);
const rulesMap = new Map();

function buildRulesMap() {
  rules.forEach((rule) => {
    const [key, value1] = rule.split("{");
    const value = value1.replace("}", "");
    const miniRules = value.split(",");
    const processedRules = miniRules.map((mini) => {
      const miniRule = {};

      miniRule.original = mini;
      if (mini.includes(">")) {
        miniRule.type = types.GREATER;
        const [key, value] = mini.split(">");
        miniRule.group = key;
        const [amount, result] = value.split(":");
        miniRule.amount = parseInt(amount);
        miniRule.result = result;

        switch (result) {
          case "A":
            miniRule.resultType = types.ACCEPT;
            break;
          case "R":
            miniRule.resultType = types.REJECT;
            break;
          default:
            miniRule.resultType = types.GOTO;
            break;
        }
      } else if (mini.includes("<")) {
        miniRule.type = types.SMALLER;
        const [key, value] = mini.split("<");
        miniRule.group = key;
        const [amount, result] = value.split(":");
        miniRule.amount = parseInt(amount);
        miniRule.result = result;

        switch (result) {
          case "A":
            miniRule.resultType = types.ACCEPT;
            break;
          case "R":
            miniRule.resultType = types.REJECT;
            break;
          default:
            miniRule.resultType = types.GOTO;
            break;
        }
      } else if (mini.includes("A")) {
        miniRule.type = types.ACCEPT;
      } else if (mini.includes("R")) {
        miniRule.type = types.REJECT;
      } else if (mini.length > 1) {
        miniRule.type = types.GOTO;
        miniRule.result = mini;
      }
      return miniRule;
    });

    rulesMap.set(key, processedRules);
  });
}

function getData() {
  const data = lines.slice(n + 1);
  const processedData = data.map((line) => {
    const dataWithoutBrackets = line.replace("{", "").replace("}", "");
    const dataMap = new Map();
    const dataArr = dataWithoutBrackets.split(",");
    dataArr.forEach((data) => {
      const [key, value] = data.split("=");
      dataMap.set(key, parseInt(value));
    });
    return dataMap;
  });
  return processedData;
}

const processGroup = (key, data) => {
  const rules = rulesMap.get(key);
  for (let i = 0; i < rules.length; i++) {
    const result = processRule(rules[i], data);
    if (result === undefined) {
      continue;
    }

    if (result.resultType === types.ACCEPT) {
      return data.get("a") + data.get("m") + data.get("x") + data.get("s");
    }
    if (result.resultType === types.REJECT) {
      return 0;
    }
    if (result.resultType === types.GOTO) {
      return processGroup(result.result, data);
    }
  }
};

const processRule = (rule, data) => {
  switch (rule.type) {
    case types.GREATER:
      if (data.get(rule.group) > rule.amount) {
        return { resultType: rule.resultType, result: rule.result };
      }
      break;
    case types.SMALLER:
      if (data.get(rule.group) < rule.amount) {
        return { resultType: rule.resultType, result: rule.result };
      }
      break;
    case types.ACCEPT:
      return { resultType: rule.type };
    case types.REJECT:
      return { resultType: rule.type };
    case types.GOTO:
      return { resultType: rule.type, result: rule.result };
    default:
      return types.ERROR;
  }
};

buildRulesMap();
console.log(rulesMap);

const boundariesMap = new Map();
boundariesMap.set("a", []);
boundariesMap.set("m", []);
boundariesMap.set("x", []);
boundariesMap.set("s", []);

for (const rules of rulesMap.values()) {
  rules.forEach((rule) => {
    if (rule.group) {
      boundariesMap.get(rule.group).push(rule.amount);
    }
  });
}

for (const [key, value] of boundariesMap.entries()) {
  boundariesMap.get(key).sort((a, b) => a - b);
}

console.log(boundariesMap);
const newBoundariesMap = new Map();

const lastABoundary = boundariesMap.get("a")[boundariesMap.get("a").length - 1];
const firstABoundary = boundariesMap.get("a")[0];
newBoundariesMap.set("a", [
  { min: 0, max: 0, use: 0, multiplier: 1 },
  { min: 1, max: 1, use: 1, multiplier: firstABoundary - 1 },
  { min: 3999, max: 3999, use: 3999, multiplier: 4000 - lastABoundary - 1 },
  { min: 4000, max: 4000, use: 4000, multiplier: 1 },
]);
const lastMBoundary = boundariesMap.get("m")[boundariesMap.get("m").length - 1];
const firstMBoundary = boundariesMap.get("m")[0];
newBoundariesMap.set("m", [
  { min: 0, max: 0, use: 0, multiplier: 1 },
  { min: 1, max: 1, use: 1, multiplier: firstMBoundary - 1 },
  { min: 3999, max: 3999, use: 3999, multiplier: 4000 - lastMBoundary - 1 },
  { min: 4000, max: 4000, use: 4000, multiplier: 1 },
]);
const lastXBoundary = boundariesMap.get("x")[boundariesMap.get("x").length - 1];
const firstXBoundary = boundariesMap.get("x")[0];
newBoundariesMap.set("x", [
  { min: 0, max: 0, use: 0, multiplier: 1 },
  { min: 1, max: 1, use: 1, multiplier: firstXBoundary - 1 },
  {
    min: 3999,
    max: 3999,
    use: 3999,
    multiplier: 4000 - lastXBoundary - 1,
  },
  { min: 4000, max: 4000, use: 4000, multiplier: 1 },
]);
const lastSBoundary = boundariesMap.get("s")[boundariesMap.get("s").length - 1];
const firstSBoundary = boundariesMap.get("s")[0];
newBoundariesMap.set("s", [
  { min: 0, max: 0, use: 0, multiplier: 1 },
  { min: 1, max: 1, use: 1, multiplier: firstSBoundary - 1 },
  { min: 3999, max: 3999, use: 3999, multiplier: 4000 - lastSBoundary - 1 },
  { min: 4000, max: 4000, use: 4000, multiplier: 1 },
]);

for (const [key, value] of boundariesMap.entries()) {
  console.log(key, value);

  for (let i = 0; i < value.length; i++) {
    if (value[i + 1]) {
      newBoundariesMap.get(key).push({
        min: value[i],
        max: value[i + 1],
        use: value[i] + 1,
        multiplier: value[i + 1] - value[i] - 1,
      });
    }
    newBoundariesMap
      .get(key)
      .push({ min: value[i], max: value[i], use: value[i], multiplier: 1 });
  }
}

console.log(newBoundariesMap);

// i need to build all th possible combinations of the boundaries , for the ranges to pick a number in between , and for the exact values to pick the exact value

const allCombinations = [];
for (let i = 0; i < newBoundariesMap.get("a").length; i++) {
  for (let j = 0; j < newBoundariesMap.get("m").length; j++) {
    for (let k = 0; k < newBoundariesMap.get("x").length; k++) {
      for (let l = 0; l < newBoundariesMap.get("s").length; l++) {
        const combination = new Map();
        combination.set("a", newBoundariesMap.get("a")[i].use);
        combination.set("m", newBoundariesMap.get("m")[j].use);
        combination.set("x", newBoundariesMap.get("x")[k].use);
        combination.set("s", newBoundariesMap.get("s")[l].use);

        allCombinations.push({
          combination,
          multiplier: {
            a: newBoundariesMap.get("a")[i].multiplier,
            m: newBoundariesMap.get("m")[j].multiplier,
            x: newBoundariesMap.get("x")[k].multiplier,
            s: newBoundariesMap.get("s")[l].multiplier,
          },
        });
      }
    }
  }
}

// console.log(allCombinations);
// for (const combination of allCombinations) {
//   console.log("combination", combination);
// }
let accumulator = [];
allCombinations.forEach((combination) => {
  const result = processGroup("in", combination.combination);
  if (result > 0) {
    accumulator.push(
      BigInt(
        combination.multiplier.a *
          combination.multiplier.m *
          combination.multiplier.x *
          combination.multiplier.s
      )
    );
  } else if (result !== 0) {
    throw new Error("unexpected result");
  }
});

// const sum = allCombinations.reduce((acc, combination) => {
//   const result = processGroup("in", combination.combination);
//   if (result > 0) {
//     console.log(
//       combination.multiplier.a *
//         combination.multiplier.m *
//         combination.multiplier.x *
//         combination.multiplier.s
//     );
//     return (
//       acc +
//       BigInt(
//         combination.multiplier.a *
//           combination.multiplier.m *
//           combination.multiplier.x *
//           combination.multiplier.s
//       )
//     );
//   } else if (result !== 0) {
//     throw new Error("unexpected result");
//   }
// }, BigInt(0));

// const acceptedCombinations = allCombinations.filter(
//   (combination) => combination.get("result") > 0
// );

// console.log(acceptedCombinations);
// console.log(acceptedCombinations.length);

console.log(accumulator);

const sum = accumulator.reduce((acc, value) => acc + value, BigInt(0));
console.log(sum);
