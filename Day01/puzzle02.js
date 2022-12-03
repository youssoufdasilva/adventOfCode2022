var fs = require("fs");

try {
    var allCalories = fs.readFileSync("input.txt", "utf8").split("\n");
    var allTotalCalories = [];
    var currentTotalCalories = 0;

    for (const currentCalory of allCalories) {
        if (currentCalory === "") {
            // console.log("\nBreak Detected!");
            // console.log("Current Total Calories = ", currentTotalCalories);
            allTotalCalories.push(currentTotalCalories);
            currentTotalCalories = 0;
        } else {
            currentTotalCalories += parseInt(currentCalory);
        }
    }

    // Sort allTotalCalories
    const sortedTotalCalories = sortCalories(allTotalCalories);
    // console.log("sortedTotalCalories :: ", sortedTotalCalories);

    // Find the sum of the top 3
    const top3 = sortedTotalCalories[0] + sortedTotalCalories[1] + sortedTotalCalories[2];
    console.log("Sum Of Top 3 = ", top3);
} catch(e) {
    console.log("Error: ", e.stack);
}


function sortCalories(listOfCalories) {
    // Base Case
    if (listOfCalories.length <= 1) return listOfCalories

    // Find the Middle of the List
    const middleIndex = Math.floor(listOfCalories.length / 2);

    // Divide the List
    const left = listOfCalories.slice(0, middleIndex);
    const right = listOfCalories.slice(middleIndex);

    // Recursively combine the left and right lists
    return mergeSort(sortCalories(left), sortCalories(right));
}

function mergeSort(leftList, rightList) {
    let resultList = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < leftList.length && rightIndex < rightList.length) {
        if (leftList[leftIndex] > rightList[rightIndex]) {
            resultList.push(leftList[leftIndex]);
            leftIndex++;
        } else {
            resultList.push(rightList[rightIndex]);
            rightIndex++;
        }
    }

    return resultList.concat(leftList.slice(leftIndex)).concat(rightList.slice(rightIndex));
}