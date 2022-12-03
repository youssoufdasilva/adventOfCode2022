const fs = require("fs");

// const filename = "testinput.txt";
const filename = "input.txt";

// Creating an easy (Big O(1)) way to map items to their priority value
const priorityDictionary = {
    // Lowercase
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10, 'k': 11, 'l': 12, 'm': 13,
    'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26,
    // Uppercase
    'A': 27, 'B': 28, 'C': 29, 'D': 30, 'E': 31, 'F': 32, 'G': 33, 'H': 34, 'I': 35, 'J': 36, 'K': 37, 'L': 38, 'M': 39,
    'N': 40, 'O': 41, 'P': 42, 'Q': 43, 'R': 44, 'S': 45, 'T': 46, 'U': 47, 'V': 48, 'W': 49, 'X': 50, 'Y': 51, 'Z': 52,
}

function sortCompartment(compartment) {
    // Guard the function if the input is not an array 
    if (!Array.isArray(compartment)) return -1;

    // Base Case
    if (compartment.length <= 1) return compartment;

    // Find the middle of the array
    const middle = Math.floor(compartment.length / 2);
    const left = compartment.slice(0, middle);
    const right  = compartment.slice(middle);

    return mergeSortCompartments(sortCompartment(left), sortCompartment(right));
}

function mergeSortCompartments(leftList, rightList) {
    let resultList = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < leftList.length && rightIndex < rightList.length) {
        if (leftList[leftIndex] < rightList[rightIndex]) {
            resultList.push(leftList[leftIndex]);
            leftIndex++;
        } else {
            resultList.push(rightList[rightIndex]);
            rightIndex++;
        }
    }
    return resultList.concat(leftList.slice(leftIndex)).concat(rightList.slice(rightIndex));
}

try {
    // Load file
    const allRucksacks = fs.readFileSync(filename, "utf8").trim().split("\n");

    let totalPriority = 0;

    for (const rucksack of allRucksacks) {
        const sackMiddle = Math.floor(rucksack.length / 2);
        const leftCompartment = rucksack.split('').slice(0, sackMiddle);
        const rightCompartment = rucksack.split('').slice(sackMiddle);

        let pLeftCompartment = [];
        for (const item of leftCompartment) {
            pLeftCompartment.push(priorityDictionary[item]);
        }

        let pRightCompartment = [];
        for (const item of rightCompartment) {
            pRightCompartment.push(priorityDictionary[item]);
        }

        const sortedPLeftCompartment = sortCompartment(pLeftCompartment);
        const sortedPRightCompartment = sortCompartment(pRightCompartment);

        console.log("\nRucksack: ", rucksack);
        // // console.log("leftCompartment: ", leftCompartment);
        // console.log("pLeftCompartment: ", pLeftCompartment);
        // console.log("sortedPLeftCompartment: ", sortedPLeftCompartment);

        // // console.log("rightCompartment: ", rightCompartment);
        // console.log("pRightCompartment: ", pRightCompartment);
        // console.log("sortedPRightCompartment: ", sortedPRightCompartment);

       let leftIndex = 0, rightIndex = 0;

       while (leftIndex < sortedPLeftCompartment.length && rightIndex < sortedPRightCompartment.length) {
        const leftValue = sortedPLeftCompartment[leftIndex];
        const rightValue = sortedPRightCompartment[rightIndex];

        // console.log(`Comparing ${leftValue} vs ${rightValue}`);

        if (leftValue == rightValue) {
            totalPriority += sortedPLeftCompartment[leftIndex];
            break;
        } else {
            if (leftValue < rightValue) leftIndex++;
            else rightIndex++;
        }
       }
        
    }

    console.log("Total Priority = ", totalPriority);

} catch (e) {
    console.log("Error: ", e.stack);
}