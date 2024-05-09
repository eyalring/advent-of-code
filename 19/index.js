const input = require("./input2");
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
        miniRule.amount = amount;
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

const processedData = getData();

console.log(processedData);
const sum = processedData.reduce((acc, data) => {
  const result = processGroup("in", data);
  console.log(result);
  return (acc += result);
}, 0);

console.log(sum);
