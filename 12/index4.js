const input = require("./input2");
function arrangements(r, state, memo = {}) {
  const hash = `${state.pos},${state.grp},${state.len}`; // Hash the current state for memoization

  // Have we seen this state before?
  if (memo[hash] !== undefined) {
    return memo[hash];
  }

  // Base case: We have reached the end of the string
  if (state.pos === r.springs.length) {
    if (state.len !== 0 && state.len !== r.lengths[state.grp]) {
      return 0; // Invalid arrangement
    }
    return state.grp + (state.len === r.lengths[state.grp] ? 1 : 0) ===
      r.lengths.length
      ? 1
      : 0;
  }

  let n = 0; // Keep track of number of valid configurations
  const { springs, lengths } = r;
  const chr = springs[state.pos];

  // Damaged spring
  if (
    chr !== "." &&
    state.grp < lengths.length &&
    state.len < lengths[state.grp]
  ) {
    n += arrangements(
      r,
      { pos: state.pos + 1, grp: state.grp, len: state.len + 1 },
      memo
    );
  }

  // Operational spring
  if (chr !== "#" && (state.len === lengths[state.grp] || state.len === 0)) {
    n += arrangements(
      r,
      {
        pos: state.pos + 1,
        grp: state.grp + (state.len === lengths[state.grp] ? 1 : 0),
        len: 0,
      },
      memo
    );
  }

  memo[hash] = n; // Log this state in case we visit it again.
  return n;
}

function parse(input) {
  const records = [];
  for (const line of input.split("\n")) {
    const [springs, grps] = line.split(/\s+/);
    const newSprings =
      springs + "?" + springs + "?" + springs + "?" + springs + "?" + springs;

    const numbers = grps.split(",").map(Number);
    records.push({
      springs: newSprings,
      lengths: [...numbers, ...numbers, ...numbers, ...numbers, ...numbers],
    });
  }
  return records;
}

console.log(
  parse(input).reduce(
    (sum, record) => sum + arrangements(record, { pos: 0, grp: 0, len: 0 }),
    0
  )
);
