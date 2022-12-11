"""First Puzzle of Day 11"""
import math

# FILE_NAME = "testinput.txt"
FILE_NAME = "input.txt"
NUM_OF_ROUNDS = 20

def load_data(file_name):
    """Function to load and process the file input"""
    monkey_data = {}
    datastream = open(file_name, 'r', encoding="utf8").read().strip().split("\n")

    current_monkey_name = ""
    for line in datastream:
        line_list = line.strip().split(":")
        # print("line_list :: ", line_list)
        if line_list[0] == "":
            continue
        if line_list[1] == "":
            current_monkey_name = line_list[0].strip().split(" ")[1]
            monkey_data[current_monkey_name] = {}
        elif line_list[0] == "Starting items":
            monkey_data[current_monkey_name]["Items"] = line_list[1].strip().split(",")
        elif line_list[0] == "Operation":
            monkey_data[current_monkey_name]["Operation"] = line_list[1].strip()
        elif line_list[0] == "Test":
            monkey_data[current_monkey_name]["Test"] = line_list[1].strip()
        elif line_list[0] == "If true":
            monkey_data[current_monkey_name]["If true"] = line_list[1].strip()
        elif line_list[0] == "If false":
            monkey_data[current_monkey_name]["If false"] = line_list[1].strip()

    for my_monkey_data in monkey_data.items():
        # print(my_monkey_data)
        # for each monkey
        new_items = []
        old_items = my_monkey_data[1]["Items"]
        for item in old_items:
            new_items.append(int(item.strip()))
        my_monkey_data[1]["Items"] = new_items
        my_monkey_data[1]["InspectionCount"] = 0

    return monkey_data

def inspect_item(item, operation):
    """Function to compute the new worry value of an item after inspection"""
    operation_list = operation.split(" ")
    worry_factor = item
    if operation_list[-1] != "old":
        worry_factor = int(operation_list[-1])

    if operation_list[-2] == "+":
        return math.floor((item + worry_factor) / 3)
    # if operation_list[-2] == "*":
    return math.floor((item * worry_factor) / 3)

def test_item(item, test):
    """Function to test an item"""
    test_list = test.split(" ")
    test_value = int(test_list[-1])
    return item % test_value == 0

all_monkeys = load_data(FILE_NAME)
# print(all_monkeys)

for my_round in range(NUM_OF_ROUNDS):
    # Monkey Turn
    for current_monkey in all_monkeys.items():
        # for each monkey
        num_items = len(current_monkey[1]["Items"])

        if (num_items > 0):
            old_items = current_monkey[1]["Items"]
            for item_count in range(num_items):
                current_item = old_items.pop(0)
                current_monkey[1]["InspectionCount"] += 1
                item_after_inspection = inspect_item(current_item, current_monkey[1]["Operation"])
                TARGET_MONKEY = ""
                if test_item(item_after_inspection, current_monkey[1]["Test"]):
                    TARGET_MONKEY = current_monkey[1]["If true"].split(" ")[-1]
                else:
                    TARGET_MONKEY = current_monkey[1]["If false"].split(" ")[-1]
                all_monkeys[TARGET_MONKEY]["Items"].append(item_after_inspection)
                # print("Item with worry level",item_after_inspection, "is thrown to monkey", TARGET_MONKEY)


def insertion_sort(array):
    """A function to sort an array by insertion sorting"""
    # Traverse through 1 to len(arr)
    for i in range(1, len(array)):

        key = array[i]

        # Move elements of array[0..i-1], that are
        # greater than key, to one position ahead
        # of their current position
        j = i-1
        while j >=0 and key < array[j]:
            array[j+1] = array[j]
            j -= 1
        array[j+1] = key


all_inspection_counts = []
# print("\nall_monkeys after ", NUM_OF_ROUNDS, "rounds")
for m in all_monkeys.items():
    # print(m[1]["Items"], m[1]["InspectionCount"])
    inspection_count = int(m[1]["InspectionCount"])
    all_inspection_counts.append(inspection_count)


# print("all_inspection_counts :: ", all_inspection_counts)
insertion_sort(all_inspection_counts)
# print("\n",all_inspection_counts)

print(all_inspection_counts[-1] * all_inspection_counts[-2])
