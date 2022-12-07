const fs = require("fs");

// const fileName = "testinput2.txt";
const fileName = "input.txt";

function loadInput(fileName) {

    const input = fs.readFileSync(fileName, "utf8").split("\n");

    let allInputList = [];

    for (const inputLine of input) allInputList.push(inputLine.split(" "));

    return allInputList;
}

function processTerminalOutput(terminalOutput) {
    let currentDirPath = [];
    let currentCmd = "";
    let resultTree = {}

    for (const myOutput of terminalOutput) {
        // console.log("myOutput :: ", myOutput);

        if (myOutput[0] === '$') {
            // this is a command
            currentCmd = myOutput[1];

            if (myOutput[1] === "cd") {
                // the current command is to change directory
                if (myOutput[2] === "..") currentDirPath.pop();
                else {
                    currentDirPath.push(myOutput[2]);
                }

                // currentDir = currentDirPath.length > 0 ? currentDirPath.slice(-1) : "/";
            }
        } else if (myOutput[0] === 'dir') {
            // this is a listed directory
            const myFullPath = currentDirPath.toString();
            // console.log("myFullPath :: ", myFullPath);
            if (resultTree[myFullPath] === undefined) {
                resultTree[myFullPath] = { totalSize: 0, contents: {}};
                resultTree[myFullPath].contents[myOutput[1]] = 0;
            } else resultTree[myFullPath].contents[myOutput[1]] = 0;
        } else {
            // this is a listed file
            const myFileSize = parseInt(myOutput[0]);
            const myFileName = myOutput[1];

            const lastDir = currentDirPath.slice(-1)[0]
            const myDirectory = []
            for ( const directory of currentDirPath) {
                // console.log("\n> Traversing currentDirPath :: directory :: ", directory);
                myDirectory.push(directory);
                const updateDirPath = myDirectory.toString();
                // console.log("updateDirPath :: ", updateDirPath);

                if (resultTree[updateDirPath] === undefined) {
                    resultTree[updateDirPath] = { totalSize: myFileSize, contents: {}};
                    resultTree[updateDirPath].contents[myFileName] = myFileSize;
                } else {
                    resultTree[updateDirPath].totalSize += myFileSize;
                    resultTree[updateDirPath].contents[myFileName] = myFileSize;
                }
            }
        }
    }

    return resultTree;
}

const terminalOutputList = loadInput(fileName);
// console.log(terminalOutputList);

const terminalTree = processTerminalOutput(terminalOutputList);
// console.log(terminalTree);

const totalDiskAvailable = 70000000;
const totalDiskNeeded = 30000000;
const currentUsedSpace = terminalTree["/"].totalSize;
const currentUnusedSpace = totalDiskAvailable - currentUsedSpace;
const currentSpaceNeeded = totalDiskNeeded - currentUnusedSpace; // could be zero

console.log("totalDiskAvailable :: ", totalDiskAvailable);
console.log("totalDiskNeeded :: ", totalDiskNeeded);
console.log("currentUsedSpace :: ", currentUsedSpace);
console.log("currentUnusedSpace :: ", currentUnusedSpace);
console.log("currentSpaceNeeded :: ", currentSpaceNeeded);

let smallDirSize = currentUsedSpace;

for (const directory of Object.keys(terminalTree)) {
    const dirSize = terminalTree[directory].totalSize; 
    if (dirSize >= currentSpaceNeeded && dirSize <= smallDirSize) {
        smallDirSize = dirSize;
    }
}

console.log("smallDirSize = ", smallDirSize);