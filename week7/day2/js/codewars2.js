// https://www.codewars.com/kata/5266876b8f4bf2da9b000362/javascript
// Who likes it?

function likes(names) {
    let likesCount = names.length
    return likesCount > 3 ? `${names.slice(0, 2).join(', ')} and ${likesCount - 2} others like this` :
        likesCount > 2 ? `${names[0]}, ${names.slice(1, 3).join(' and ')} like this` :
        likesCount > 1 ? `${names.join(' and ')} like this` :
        likesCount > 0 ? `${names[0]} likes this` :
        'no one likes this'
}

// https://www.codewars.com/kata/525f50e3b73515a6db000b83/javascript
// Create Phone Number
function createPhoneNumber(numbers) {
    return `(${numbers.slice(0, 3).join('')}) ${numbers.slice(3, 6).join('')}-${numbers.slice(6, 10).join('')}`
}

// Lil too easy, I'll do one more :)
// https://www.codewars.com/kata/54da5a58ea159efa38000836/javascript
// Find the odd int
function findOdd(A) {
    let times = {}
    let count = 0
    for (i in A) {
        if (times[A[i]]) {
            times[A[i]]++
        } else {
            times[A[i]] = 1
        }
    } for (let n in times) {
        if (times[n] % 2 == 1) {
            return Number(n)
        }
    }
}
// super spicy solution
function findOdd(A) {
    let result = 0
    for (let num of A) {
        result ^= num
    } return result
}
/*
    XOR returns 0 if two bits are the same
    returns 1 if they are different
    if you XOR all the elements in the array
    the result will be the element that appears an odd number of times
*/