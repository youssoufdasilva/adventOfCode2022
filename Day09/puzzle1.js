const fs = require("fs");

function loadInput() {
    // const fileName = "testinput.txt";
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

function followHead(headCoords, tailCoords) {
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

let headCoords = [0,0];
let tailCoords = [0,0];
let tailTracker = {};

// add the tail's starting location to the tail tracker
tailTracker[tailCoords.toString()] = 1;

// console.log("tailTracker :: ", tailTracker);

for (const myMotion of allMotions) {
    const totalMoves = parseInt(myMotion[1]);
    for (let moveCounter = 0; moveCounter < totalMoves; moveCounter++){
        // console.log("\n Moving Head!")
        headCoords = moveKnot(headCoords, myMotion[0]);
        tailCoords = followHead(headCoords, tailCoords);

        // Update the tail tracker
        if (tailTracker[tailCoords.toString()] === undefined)
            tailTracker[tailCoords.toString()] = 1;
        else
            tailTracker[tailCoords.toString()]++;

    }
    // console.log();
}

// console.log("tailTracker :: ", tailTracker);
console.log("Count :: ", Object.keys(tailTracker).length);