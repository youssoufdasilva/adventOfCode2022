# filename = "testinput.txt"
filename = "input.txt"

def has_full_overlap(elf_assignments):
    left_assignment = elf_assignments[0].strip().split("-")
    right_assignment = elf_assignments[1].strip().split("-")

    start_left = int(left_assignment[0])
    end_left = int(left_assignment[1])

    start_right = int(right_assignment[0])
    end_right = int(right_assignment[1])

    left_is_fully_contained = False
    right_is_fully_contained = False

    # if (start_right == end_right):
    #     if ()
    # el
    if (start_left >= start_right and end_left<= end_right):
        left_is_fully_contained = True
    
    if (start_right>=start_left and end_right<=end_left):
        right_is_fully_contained = True

    return left_is_fully_contained or right_is_fully_contained


all_assignments = open(filename, 'r', encoding='utf8').read().strip().split("\n")

# check_assignment_overlap = has_overlap(all_assignments[0].strip().split(","))
# print("check_overlap :: ", check_assignment_overlap)

# check_assignment_overlap = has_overlap(all_assignments[17].strip().split(","))
# print("check_overlap :: ", check_assignment_overlap)

overlap_counter = 0

for elf_assignment in all_assignments:
    print("\nElf Assignment Pair: ", elf_assignment)
    if has_full_overlap(elf_assignment.strip().split(",")):
        print("Has Overlap!")
        overlap_counter += 1

print("overlap_counter = ", overlap_counter)
