"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function loadData() {
    const fileName = "testinput.txt";
    // const fileName: string = "input.txt"; 
    const fileData = (0, fs_1.readFileSync)(fileName, 'utf8').trim().split("\n");
    console.log("fileData :: \n", fileData);
    let crateData = {}, procedureData = [];
    let min_x, max_x;
    let min_y, max_y;
    // Initialize variables
    const initCoords = fileData[0].split(" -> ")[0].split(",");
    console.log("initCoords :: \n", initCoords);
    console.log(fileData[0]);
    if (min_x === undefined)
        min_x = max_x = parseInt(initCoords[0]);
    if (min_y === undefined)
        min_y = max_y = parseInt(initCoords[1]);
    console.log("min_x :: ", min_x);
    console.log("max_x :: ", max_x);
    console.log("min_y :: ", min_y);
    console.log("max_y :: ", max_y);
    // for (const dataRow of fileData) {
    //     const data = dataRow.split(" -> ");
    //     console.log("data :: ", data);
    // }
    // console.log("All Crates => ", crateData);
    // console.log("All Procedures => ", procedureData);
    return { allCrates: crateData, allProcedures: procedureData };
}
const inputData = loadData();
console.log("allCrates => ", inputData.allCrates);
/* let finalCrateArrangement: {[crate:string]: Array<string>} = {...inputData.allCrates}
const allProcedures: Array<String> = inputData.allProcedures;

for (const procedure of allProcedures) {
    const myProcedure: Array<string> = procedure.split(" ");

    const numOfMoves: number = parseInt(myProcedure[1]);
    const from: string = myProcedure[3];
    const to: string = myProcedure[5];

    // console.log(`Moving ${numOfMoves} crates from stack ${from} to stack ${to}`);

    let moveCounter: number = 0;
    
    while (moveCounter < numOfMoves) {
        const moveResult: Array<Array<string>> = moveCrate(finalCrateArrangement[from], finalCrateArrangement[to]);
        // console.log("moveResult :: ", moveResult);
        finalCrateArrangement[from] = moveResult[0];
        finalCrateArrangement[to] = moveResult[1];
        moveCounter++;
    }
} */
