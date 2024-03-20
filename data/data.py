import json

with open('/home/joanna/elipse/crucible-components/data/question-data.json', 'r') as file:
    data = json.load(file)
questions = data["questions"]
count = 0

for question in questions:
    print(question)
    first_option = question["optionsList"][0]
    if first_option["optionCorrect"]:
        count += 1
print(count)