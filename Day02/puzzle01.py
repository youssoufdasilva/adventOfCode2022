
def computeOutcome(strategy):
    if (strategy[0] == "A" and strategy[1] == "X"):
        return 3
    elif (strategy[0] == "A" and strategy[1] == "Y"):
        return 6
    elif (strategy[0] == "A" and strategy[1] == "Z"):
        return 0
    elif (strategy[0] == "B" and strategy[1] == "X"):
        return 0
    elif (strategy[0] == "B" and strategy[1] == "Y"):
        return 3
    elif (strategy[0] == "B" and strategy[1] == "Z"):
        return 6
    elif (strategy[0] == "C" and strategy[1] == "X"):
        return 6
    elif (strategy[0] == "C" and strategy[1] == "Y"):
        return 0
    elif (strategy[0] == "C" and strategy[1] == "Z"):
        return 3
    else:
        print("SCREAM: Something went wrong!")
        return -1



def computeScore(strategy):
    outcomeScore = computeOutcome(strategy)
    if (outcomeScore == -1): return outcomeScore
    
    shapeScore = 0
    
    if (strategy[1] == "X"):
        shapeScore = 1
    elif (strategy[1] == "Y"):
        shapeScore = 2
    elif (strategy[1] == "Z"):
        shapeScore = 3
    else:
        return -1

    return shapeScore + outcomeScore




# Reading input file using readlines()
allStrategies = open('input.txt', 'r', encoding='utf8').readlines()

totalScore = 0

for strategy in allStrategies:
    currentStrategy = strategy.strip().split(" ")
    # print("currentStrategy => ", currentStrategy)
    currentScore = computeScore(currentStrategy)

    # print("currentScore :: ", currentScore)
    if currentScore == -1:
        print("Something went wrong!")
    else:
        totalScore += currentScore

print("The total score is ", totalScore)