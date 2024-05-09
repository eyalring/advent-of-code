const input = require("./input2");
const { Heap } = require("heap-js");
const directions = require("./directions");
const matrix = input.split("\n").map((row) => row.split(""));
const concat = (arr) => arr.join(",");

const seen = new Set();

const customPriorityComparator = (a, b) => a.hl - b.hl;
const pq = new Heap(customPriorityComparator);
pq.init([{ hl: 0, r: 0, c: 0, dr: 0, dc: 0, n: 0 }]);

while (pq.length) {
  console.log(pq.peek().hl);
  const shifted = pq.pop();
  const { hl, r, c, dr, dc, n } = shifted;

  if (r === matrix.length - 1 && c === matrix[0].length - 1) {
    console.log("the result is", hl);
    break;
  }

  if (seen.has(concat([r, c, dr, dc, n]))) continue;

  seen.add(concat([r, c, dr, dc, n]));

  if (n < 10 && (dr !== 0 || dc !== 0)) {
    nr = r + dr;
    nc = c + dc;
    if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length) {
      pq.push({
        hl: hl + parseInt(matrix[nr][nc]),
        r: nr,
        c: nc,
        dr,
        dc,
        n: n + 1,
      });
    }
  }

  if (n === 0 || n >= 4) {
    [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ].forEach(([ndr, ndc]) => {
      if ((ndr !== dr || ndc !== dc) && (ndr !== -dr || ndc !== -dc)) {
        nr = r + ndr;
        nc = c + ndc;
        if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length) {
          pq.push({
            hl: hl + parseInt(matrix[nr][nc]),
            r: nr,
            c: nc,
            dr: ndr,
            dc: ndc,
            n: 1,
          });
        }
      }
    });
  }
}
