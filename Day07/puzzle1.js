const fs = require("fs");

function loadInput() {
    // const fileName = "testinput.txt";
    const fileName = "input.txt";

    const input = fs.readFileSync(fileName, "utf8").split("\n");

    let allInputList = [];

    for (const inputLine of input) allInputList.push(inputLine.split(" "));

    return allInputList;
}

function processTerminalOutput(terminalOutput) {
    let currentDirPath = [];
    let resultTree = {}

    for (const myOutput of terminalOutput) {
        // console.log("myOutput :: ", myOutput);

        if (myOutput[0] === '$') {
            // this is a command
            if (myOutput[1] === "cd") {
                // the current command is to change directory
                if (myOutput[2] === "..") currentDirPath.pop();
                else currentDirPath.push(myOutput[2]);

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
            //test
            // console.log("currentDirPath :: ", currentDirPath);
            // console.log("resultTree :: ", resultTree);
            // this is a listed file
            const myFileSize = parseInt(myOutput[0]);
            const myFileName = myOutput[1];

            const lastDir = currentDirPath.slice(-1)[0]
            const myDirectory = []
            for ( const directory of currentDirPath) {
                // console.log("\n> Traversing currentDirPath :: directory :: ", directory);
                // console.log("lastDir :: ", lastDir);
                if (directory === lastDir) {
                    // console.log("this is the last dir");
                    const myFullPath = currentDirPath.toString();

                    if (resultTree[myFullPath] === undefined) {
                        resultTree[myFullPath] = { totalSize: myFileSize, contents: {}};
                        resultTree[myFullPath].contents[myFileName] = myFileSize;
                    } else {
                        resultTree[myFullPath].totalSize += myFileSize;
                        resultTree[myFullPath].contents[myFileName] = myFileSize;
                    }

                    // console.log("resultTree :: ", resultTree);
                } else {
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
    }

    return resultTree;
}

const terminalOutputList = loadInput();
// console.log(terminalOutputList);

const terminalTree = processTerminalOutput(terminalOutputList);
// console.log(terminalTree);

let totalSize = 0;

for (const directory of Object.keys(terminalTree)) {
    if (terminalTree[directory].totalSize <= 100000) {
        totalSize += terminalTree[directory].totalSize;
    }
}

console.log("Total Size = ", totalSize);