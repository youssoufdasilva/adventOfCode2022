"""Pylint shutup!"""

# FILE_NAME = "testinput.txt"
FILE_NAME = "input.txt"
datastream = open(FILE_NAME, 'r', encoding="utf8").read().strip()
print(datastream)

if len(datastream) < 14:
    print("The datastream is too short!")
else:
    start_of_message = []

    for char_id, char in enumerate(datastream):

        if len(start_of_message) == 14:
            print("Found code at index ", char_id)
            # print("start_of_message :: ", start_of_message)
            break
        else:
            if char in start_of_message:
                while char in start_of_message:
                    start_of_message.pop(0)

                start_of_message.append(char)
            else:
                start_of_message.append(char)