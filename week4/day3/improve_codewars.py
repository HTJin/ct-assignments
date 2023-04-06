# Problem 1 - Equal Sides Of An Array
# https://www.codewars.com/kata/5679aa472b8f57fb8c000047

def find_even_index(arr):
    for index, num in enumerate(arr):
        if sum(arr[:index]) == sum(arr[index+1:]):
            return index
    return -1

