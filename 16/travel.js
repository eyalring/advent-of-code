const directions = require("./directions");
const coordinateAsAString = require("./coordinateAsAString");
const traverse = require("./traverse");
module.exports = ({ matrix, threads, energizedPoints }) => {
  const newThreads = [];
  for (let i = 0; i < threads.length; i++) {
    const { x, y } = traverse({
      coordinate: threads[i].coordinate,
      direction: threads[i].direction,
      matrix,
    });
    if (x === -1 || y === -1) {
      continue;
    }
    energizedPoints.set(coordinateAsAString(x, y), { x, y });

    const nextChar = matrix[y][x];
    switch (nextChar) {
      case ".":
        {
          newThreads.push({
            coordinate: {
              x,
              y,
            },
            direction: threads[i].direction,
          });
        }
        break;
      case "|":
        {
          if ([directions.UP, directions.DOWN].includes(threads[i].direction)) {
            newThreads.push({
              coordinate: {
                x,
                y,
              },
              direction: threads[i].direction,
            });
          } else {
            newThreads.push({
              coordinate: {
                x,
                y,
              },
              direction: directions.UP,
            });
            newThreads.push({
              coordinate: {
                x,
                y,
              },
              direction: directions.DOWN,
            });
          }
        }
        break;
      case "-":
        {
          if (
            [directions.LEFT, directions.RIGHT].includes(threads[i].direction)
          ) {
            newThreads.push({
              coordinate: {
                x,
                y,
              },
              direction: threads[i].direction,
            });
          } else {
            newThreads.push({
              coordinate: {
                x,
                y,
              },
              direction: directions.LEFT,
            });
            newThreads.push({
              coordinate: {
                x,
                y,
              },
              direction: directions.RIGHT,
            });
          }
        }
        break;
      case "Q":
        {
          switch (threads[i].direction) {
            case directions.UP: {
              newThreads.push({
                coordinate: {
                  x,
                  y,
                },
                direction: directions.LEFT,
              });
              break;
            }
            case directions.LEFT: {
              newThreads.push({
                coordinate: {
                  x,
                  y,
                },
                direction: directions.UP,
              });
              break;
            }
            case directions.RIGHT: {
              newThreads.push({
                coordinate: {
                  x,
                  y,
                },
                direction: directions.DOWN,
              });
              break;
            }
            case directions.DOWN: {
              newThreads.push({
                coordinate: {
                  x,
                  y,
                },
                direction: directions.RIGHT,
              });
              break;
            }
          }
        }
        break;
      case "/":
        {
          switch (threads[i].direction) {
            case directions.UP: {
              newThreads.push({
                coordinate: {
                  x,
                  y,
                },
                direction: directions.RIGHT,
              });
              break;
            }
            case directions.RIGHT: {
              newThreads.push({
                coordinate: {
                  x,
                  y,
                },
                direction: directions.UP,
              });
              break;
            }
            case directions.LEFT: {
              newThreads.push({
                coordinate: {
                  x,
                  y,
                },
                direction: directions.DOWN,
              });
              break;
            }
            case directions.DOWN: {
              newThreads.push({
                coordinate: {
                  x,
                  y,
                },
                direction: directions.LEFT,
              });
              break;
            }
          }
        }
        break;
    }
  }
  return newThreads;
};
