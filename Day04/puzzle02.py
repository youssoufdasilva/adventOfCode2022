# filename = "testinput.txt"
filename = "input.txt"

def has_overlap(elf_assignments):
    detection_dict = {}

    left_assignment = elf_assignments[0].strip().split("-")
    right_assignment = elf_assignments[1].strip().split("-")

    # print("Left Assignment :: ", left_assignment)
    # print("Right Assignment :: ", right_assignment)

    start_left = int(left_assignment[0])
    end_left = int(left_assignment[1]) + 1
    # end_left = int(left_assignment[1]) + 1 if start_left == int(left_assignment[1]) else int(left_assignment[1])

    start_right = int(right_assignment[0])
    end_right = int(right_assignment[1]) + 1
    # end_right = int(right_assignment[1]) + 1 if start_right == int(right_assignment[1]) else int(right_assignment[1])

    for assignment_id in range(start_left, end_left):
        my_id = str(assignment_id)
        if my_id in detection_dict:
            detection_dict[my_id] += 1
        else:
            detection_dict[my_id] = 1

    for assignment_id in range(start_right, end_right):
        my_id = str(assignment_id)
        if my_id in detection_dict:
            detection_dict[my_id] += 1
        else:
            detection_dict[my_id] = 1
        
    print(detection_dict)

    for dict_item in detection_dict.items():
        if dict_item[1] > 1:
            return True
    
    return False

all_assignments = open(filename, 'r', encoding='utf8').read().strip().split("\n")

# check_assignment_overlap = has_overlap(all_assignments[0].strip().split(","))
# print("check_overlap :: ", check_assignment_overlap)

# check_assignment_overlap = has_overlap(all_assignments[17].strip().split(","))
# print("check_overlap :: ", check_assignment_overlap)

overlap_counter = 0

for elf_assignment in all_assignments:
    print("\nElf Assignment Pair: ", elf_assignment)
    if has_overlap(elf_assignment.strip().split(",")):
        print("Has Overlap!")
        overlap_counter += 1

print("overlap_counter = ", overlap_counter)
