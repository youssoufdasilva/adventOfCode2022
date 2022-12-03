var fs = require("fs");

try {
    var allCalories = fs.readFileSync("input.txt", "utf8").split("\n");
    var maxTotalCalories = 0;
    var currentTotalCalories = 0;

    for (const currentCalory of allCalories) {
        if (currentCalory === "") {
            console.log("\nBreak Detected!");
            console.log("Max Total Calories = ", maxTotalCalories);
            console.log("Current Total Calories = ", currentTotalCalories);
            if (currentTotalCalories > maxTotalCalories) maxTotalCalories = currentTotalCalories;
            currentTotalCalories = 0;
        } else {
            currentTotalCalories += parseInt(currentCalory);
        }
    }

    const returnData =  maxTotalCalories > currentTotalCalories ? maxTotalCalories : currentTotalCalories;
    console.log("Max Calories = ", returnData);
} catch(e) {
    console.log("Error: ", e.stack);
}