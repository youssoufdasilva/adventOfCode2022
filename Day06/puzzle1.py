"""Pylint shutup!"""

# FILE_NAME = "testinput.txt"
FILE_NAME = "input.txt"
datastream = open(FILE_NAME, 'r', encoding="utf8").read().strip()
print(datastream)

if len(datastream) < 4:
    print("The datastream is too short!")
else:
    char_one = datastream[0]
    char_two = datastream[1]
    char_three = datastream[2]
    char_four = datastream[3]

    for char_id, char in enumerate(datastream):
        if char_id < 4:
            continue
        elif char_one == char_two or char_one == char_three or char_one == char_four or char_two == char_three or char_two == char_four or char_three == char_four:
            print("char_id = ", char_id, " | char = ", char)
            char_one = char_two
            char_two = char_three
            char_three = char_four
            char_four = char
        else:
            print("Found code at index ", char_id)
            break
