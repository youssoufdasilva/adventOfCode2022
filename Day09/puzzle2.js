const fs = require("fs");

function loadInput() {
    // const fileName = "testinput2.txt";
    const fileName = "input.txt";

    const input = fs.readFileSync(fileName, "utf8").split("\n");

    let allInputList = [];

    for (const inputLine of input) allInputList.push(inputLine.split(" "));

    return allInputList;
}

function moveKnot(knotCoords, direction) {
    // console.log("Moving knot ", direction);
    if (direction === "U") return [knotCoords[0], knotCoords[1]+1];
    if (direction === "D") return [knotCoords[0], knotCoords[1]-1];
    if (direction === "R") return [knotCoords[0]+1, knotCoords[1]];
    if (direction === "L") return [knotCoords[0]-1, knotCoords[1]];
}

// HD TL
// 00 00
// 10 00
// 20 

function followKnot(headCoords, tailCoords) {
    let newTailCoords = tailCoords;

    const xDelta = headCoords[0] - tailCoords[0];
    const yDelta = headCoords[1] - tailCoords[1];

    // Tail Should not Move
    if (Math.abs(xDelta) <= 1 && Math.abs(yDelta) <= 1) return newTailCoords;

    // console.log("\n Moving Tail!")

    if (yDelta > 0) newTailCoords = moveKnot(newTailCoords, "U");
    if (yDelta < 0) newTailCoords = moveKnot(newTailCoords, "D");
    if (xDelta > 0) newTailCoords = moveKnot(newTailCoords, "R");
    if (xDelta < 0) newTailCoords = moveKnot(newTailCoords, "L");

    return newTailCoords;
}

const allMotions = loadInput();
// console.log("allMotions :: ", allMotions);

const ropeLength = 10;
let tailTracker = {};
let rope = [];

for (let i = 0; i < ropeLength; i++) {
    rope.push([0,0]);
}

// let headCoords = [0,0];
// let tailCoords = [0,0];

// add the tail's starting location to the tail tracker
tailTracker[rope[ropeLength-1].toString()] = 1;

// console.log("tailTracker :: ", tailTracker);

for (const myMotion of allMotions) {
    const totalMoves = parseInt(myMotion[1]);
    for (let moveCounter = 0; moveCounter < totalMoves; moveCounter++){
        // console.log("\n Moving Head!")
        for (let i = 0; i < ropeLength; i++) {
            // Moving the head
            if (i === 0) rope[i] = moveKnot(rope[i], myMotion[0]);
            else {
                // Moving the body
                const newKnotPosition = followKnot(rope[i-1], rope[i]);
                // if this part of the body did not move, stop moving the body
                if (newKnotPosition[0] === rope[i][0] && newKnotPosition[1] === rope[i][1]) break;
                else rope[i] = newKnotPosition;
            }
        }
        // headCoords = moveKnot(headCoords, myMotion[0]);
        // tailCoords = followKnot(headCoords, tailCoords);

        // Update the tail tracker
        if (tailTracker[rope[ropeLength-1].toString()] === undefined)
            tailTracker[rope[ropeLength-1].toString()] = 1;
        else
            tailTracker[rope[ropeLength-1].toString()]++;

    }
    // console.log();
}

// console.log("tailTracker :: ", tailTracker);
console.log("Count :: ", Object.keys(tailTracker).length);