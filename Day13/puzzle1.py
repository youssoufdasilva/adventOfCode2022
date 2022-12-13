"""First Puzzle of Day 13"""

FILE_NAME = "testinput.txt"
# FILE_NAME = "input.txt"
NUM_OF_ROUNDS = 20

def load_data(file_name):
    """Function to load and process the file input"""
    signal_data = {}
    datastream = open(file_name, 'r', encoding="utf8").read().strip().split("\n")

    pair_counter = 1
    current_pair_name = "1"
    signal_data[current_pair_name] = {
        "left": "",
        "right": ""
    }

    for line in datastream:
        line_list = line.strip()
        print("line_list :: ", line_list)
        if line_list == "":
            # Update the pair name
            pair_counter += 1
            current_pair_name = str(pair_counter)
            signal_data[current_pair_name] = {
                "left": "",
                "right": ""
            }
        elif signal_data[current_pair_name]["left"] == "":
            signal_data[current_pair_name]["left"] = line_list
        else:
            signal_data[current_pair_name]["right"] = line_list

    return signal_data



all_packets = load_data(file_name = FILE_NAME)
print("\n")
print(all_packets)