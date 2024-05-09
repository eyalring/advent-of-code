module.exports = (map) => {
  for (let y = 0; y < map.length; y++) {
    process.stdout.write("\n");
    for (let x = 0; x < map[y].length; x++) {
      process.stdout.write(map[y][x]);
    }
  }
  console.log("\n");
};
