// https://www.codewars.com/kata/55f347cfb44b879e1e00000d/javascript
// Highest number with two prime factors

function highestBiPrimeFac(p1, p2, n) {
    let maxk1 = Math.floor(Math.log(n) / Math.log(p1))
    let maxk2 = Math.floor(Math.log(n) / Math.log(p2))
    let largest = 0
    let highk1 = 0
    let highk2 = 0

    for (let i = 1; i <= maxk1; i++) {
        for (let j = 1; j <= maxk2; j++) {
            let current = p1 ** i * p2 ** j
            if (current <= n && current > largest) {
                largest = current
                highk1 = i
                highk2 = j
            }
        }
    }

    return [largest, highk1, highk2]
}

// https://www.codewars.com/kata/514b92a657cdc65150000006/javascript
// Multiples of 3 or 5

function solution(number) {
    if (number <= 0) {
        return 0
    }

    let total = 0
    for (let i = 1; i < number; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            total += i
        }
    }

    return total
}