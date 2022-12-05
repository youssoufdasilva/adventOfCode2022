import {readFileSync} from 'fs';

function loadData(): {allCrates: {[crate: string]: Array<string>}, allProcedures: Array<string>} {
    // const fileName: string = "testinput.txt";
    const fileName: string = "input.txt"; 

    const fileData : string = readFileSync(fileName, 'utf8');
    // console.log("fileData :: \n", fileData.split("\n"));

    let crateData: {[crate: string]: Array<string>} = {}, procedureData: Array<string> = [];
    let emptyLineFound: boolean = false;

    for (const dataRow of fileData.split("\n")) {
        if (dataRow === "" && !emptyLineFound) emptyLineFound = true;
        else {
            if (emptyLineFound) procedureData.push(dataRow); 
            if (dataRow.trim().charAt(0) !== "[") continue
            else {
                let stackCounter: number = 1;

                for (let i:number = 0; i < dataRow.length; i=i+4) {
                    
                    // console.log(`Data Row from index '${i}' to index ${i+3}`)
                    // console.log(dataRow.substring(i, i+3));

                    const stackName = stackCounter.toString();

                    // const stackItem = dataRow.substring(i, i+3);
                    // if (crateData[stackName] === undefined) crateData[stackName] = [stackItem];
                    // else crateData[stackName].unshift(stackItem);

                    const stackItem = dataRow.substring(i, i+3).trim();
                    
                    if (crateData[stackName] === undefined) crateData[stackName] = stackItem ==="" ? [] : [stackItem.split("")[1]];
                    else if (stackItem !== "") crateData[stackName].unshift(stackItem.split("")[1]);

                    stackCounter++;

                }
            }
        }
    }

    // console.log("All Crates => ", crateData);
    // console.log("All Procedures => ", procedureData);

    return {allCrates: crateData, allProcedures: procedureData}
}

function moveCrate(fromStack: Array<string> = [] , toStack: Array<string>): Array<Array<string>> {
    if (fromStack.length < 1) return [fromStack, toStack];
    else {
        let item: string | undefined = fromStack.pop();
        toStack.push(item || "");
        return [fromStack, toStack];
    }
}


const inputData: {allCrates: {[crate:string]: Array<string>}, allProcedures: Array<string>} = loadData();

// console.log("allCrates => ", inputData.allCrates);

let finalCrateArrangement: {[crate:string]: Array<string>} = {...inputData.allCrates}
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
}

// console.log("\nfinalCrateArrangement :: ", finalCrateArrangement);

const allStacks: Array<string> = Object.keys(finalCrateArrangement);
let topCrates: string = "";

for (const stack of allStacks) {
    const stackLength: number = finalCrateArrangement[stack].length;
    if ( stackLength > 0) topCrates+=(finalCrateArrangement[stack][stackLength-1])
}

console.log("Result: ",topCrates.toString());

