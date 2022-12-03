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

    let totalPriority = 0, allElfGroups = [[]];

    for (const rucksack of allRucksacks) {
        const pRuckSack = [];

        for (const item of rucksack.split('')) {
            pRuckSack.push(priorityDictionary[item]);
        }

        const sortedPRucksack = sortCompartment(pRuckSack);
        // console.log("Sorted Rucksack :: ", sortedPRucksack);

        if (allElfGroups[allElfGroups.length - 1].length < 3) {
            allElfGroups[allElfGroups.length - 1].push(sortedPRucksack);
        } else {
            allElfGroups[allElfGroups.length] = [sortedPRucksack];
        }

        // console.log("All Elf Groups :: ", allElfGroups);
    }

    for (const elfGroup of allElfGroups) {
        // console.log(elfGroup);

        let leftIndex = 0, middleIndex = 0, rightIndex = 0;
    
        while (leftIndex < elfGroup[0].length && middleIndex < elfGroup[1].length && rightIndex < elfGroup[2].length) {
            const leftValue = elfGroup[0][leftIndex];
            const middleValue = elfGroup[1][middleIndex];
            const rightValue = elfGroup[2][rightIndex];

            if (leftValue == middleValue && middleValue == rightValue ) {
                totalPriority += middleValue;
                break;
            } else {
                if (leftValue < middleValue) leftIndex++;
                else if (middleValue < rightValue) middleIndex++;
                else rightIndex++;
            }
        }

    }

    
    console.log("Total Priority = ", totalPriority);

} catch (e) {
    console.log("Error: ", e.stack);
}