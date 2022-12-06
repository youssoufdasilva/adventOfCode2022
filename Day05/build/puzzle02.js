"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function loadData() {
    // const fileName: string = "testinput.txt";
    const fileName = "input.txt";
    const fileData = (0, fs_1.readFileSync)(fileName, 'utf8');
    // console.log("fileData :: \n", fileData.split("\n"));
    let crateData = {}, procedureData = [];
    let emptyLineFound = false;
    for (const dataRow of fileData.split("\n")) {
        if (dataRow === "" && !emptyLineFound)
            emptyLineFound = true;
        else {
            if (emptyLineFound)
                procedureData.push(dataRow);
            if (dataRow.trim().charAt(0) !== "[")
                continue;
            else {
                let stackCounter = 1;
                for (let i = 0; i < dataRow.length; i = i + 4) {
                    // console.log(`Data Row from index '${i}' to index ${i+3}`)
                    // console.log(dataRow.substring(i, i+3));
                    const stackName = stackCounter.toString();
                    // const stackItem = dataRow.substring(i, i+3);
                    // if (crateData[stackName] === undefined) crateData[stackName] = [stackItem];
                    // else crateData[stackName].unshift(stackItem);
                    const stackItem = dataRow.substring(i, i + 3).trim();
                    if (crateData[stackName] === undefined)
                        crateData[stackName] = stackItem === "" ? [] : [stackItem.split("")[1]];
                    else if (stackItem !== "")
                        crateData[stackName].unshift(stackItem.split("")[1]);
                    stackCounter++;
                }
            }
        }
    }
    // console.log("All Crates => ", crateData);
    // console.log("All Procedures => ", procedureData);
    return { allCrates: crateData, allProcedures: procedureData };
}
function moveCrate(fromStack = [], toStack) {
    if (fromStack.length < 1)
        return [fromStack, toStack];
    else {
        let item = fromStack.pop();
        toStack.push(item || "");
        return [fromStack, toStack];
    }
}
function moveCrates(numOfCrates, fromStack, toStack) {
    if (fromStack.length < numOfCrates)
        return [fromStack, toStack];
    else {
        let items = fromStack.splice(fromStack.length - numOfCrates, numOfCrates);
        return [fromStack, toStack.concat(items)];
    }
}
const inputData = loadData();
// console.log("allCrates => ", inputData.allCrates);
let finalCrateArrangement = Object.assign({}, inputData.allCrates);
const allProcedures = inputData.allProcedures;
for (const procedure of allProcedures) {
    const myProcedure = procedure.split(" ");
    const numOfMoves = parseInt(myProcedure[1]);
    const from = myProcedure[3];
    const to = myProcedure[5];
    // console.log(`Moving ${numOfMoves} crates from stack ${from} to stack ${to}`);
    const moveResult = moveCrates(numOfMoves, finalCrateArrangement[from], finalCrateArrangement[to]);
    finalCrateArrangement[from] = moveResult[0];
    finalCrateArrangement[to] = moveResult[1];
}
// console.log("\nfinalCrateArrangement :: ", finalCrateArrangement);
const allStacks = Object.keys(finalCrateArrangement);
let topCrates = "";
for (const stack of allStacks) {
    const stackLength = finalCrateArrangement[stack].length;
    if (stackLength > 0)
        topCrates += (finalCrateArrangement[stack][stackLength - 1]);
}
console.log("Result: ", topCrates.toString());
