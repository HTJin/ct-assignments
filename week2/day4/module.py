from math import pi
from collections import Counter


print(int(4.222223))

def printName(name):
    print(f"Hello Mr/Ms {name}...we've been waiting for you!")

# 1a)
def getArea(length, width):
    return length*width
# 1b)
def getCircumference(radius):
    return 2*radius*pi

# 2)
def posCountNegSum(array):
    positive_count = 0
    negative_sum = 0
    result = []
    if not array: return []
    for num in array:
        if num > 0:
            positive_count += 1
        elif num < 0:
            negative_sum += num
    result.append(positive_count)
    result.append(negative_sum)
    return result

# 3)
def lowPosSum(array):
    sorted_array = sorted(array)
    return sorted_array[0] + sorted_array[1]

# 4)
def mostFreqItem(array):
    itemsDict = dict(Counter(array))
    mostCount = max(itemsDict.values())
    
    return [item for item, count in itemsDict.items() if count == mostCount]