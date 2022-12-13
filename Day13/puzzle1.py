"""First Puzzle of Day 13"""
import json

# FILE_NAME = "testinput.txt"
FILE_NAME = "input.txt"
NUM_OF_ROUNDS = 20

def load_data(file_name):
    """Function to load and process the file input"""
    signal_data = {}
    datastream = open(file_name, 'r', encoding="utf8").read().strip().split("\n")

    pair_counter = 1
    current_pair_name = "1"
    signal_data[current_pair_name] = {
        "left": "",
        "right": "",
        "order_is_correct": False
    }

    for line in datastream:
        line_list = line.strip()
        # print("line_list :: ", line_list)
        if line_list == "":
            # Update the pair name
            pair_counter += 1
            current_pair_name = str(pair_counter)
            signal_data[current_pair_name] = {
                "left": "",
                "right": "",
                "order_is_correct": False
            }
        elif signal_data[current_pair_name]["left"] == "":
            signal_data[current_pair_name]["left"] = json.loads(line_list)
        else:
            signal_data[current_pair_name]["right"] = json.loads(line_list)

    return signal_data


def compare_pairs(left, right):
    """Function to compare left packet to right packet"""
    order_is_right = None
    l_index = 0
    r_index = 0

    if len(left) == 0:
        return True

    if len(right) == 0:
        return False

    while l_index < len(left) and r_index < len(right):
        if isinstance(left[l_index], int) and isinstance(right[r_index], int):
            # print("Numbers detected!")
            if left[l_index] == right[r_index]:
                pass
            else:
                order_is_right = left[l_index] < right[r_index]
        elif isinstance(left[l_index], list) and isinstance(right[r_index], list):
            # print("Lists detected!")
            order_is_right = compare_pairs(left[l_index], right[r_index])
        else:
            # print("Mixed types detected!")
            if isinstance(left[l_index], int):
                order_is_right = compare_pairs([left[l_index]], right[r_index])
            else:
                order_is_right = compare_pairs(left[l_index], [right[r_index]])
        l_index += 1
        r_index += 1

    if order_is_right is None:
        if isinstance(left, list) and isinstance(right, list):
            if len(left) < len(right):
                return True

    return order_is_right


all_packets = load_data(file_name = FILE_NAME)

# order_is_correct = compare_pairs(packet_1["left"], packet_1["right"])
# print(order_is_correct)

for packet in all_packets.items():
    print("Checking :: ", packet)
    result = compare_pairs(packet[1]["left"], packet[1]["right"])
    print("It's in order" if result else "It's NOT in order")
    packet[1]["order_is_correct"] = result

NUM_OF_CORRECT_PAIRS = 0
for packet in all_packets.items():
    if packet[1]["order_is_correct"] is True:
        print("Adding ", packet[0])
        NUM_OF_CORRECT_PAIRS += int(packet[0])

print("NUM_OF_CORRECT_PAIRS = ", NUM_OF_CORRECT_PAIRS)