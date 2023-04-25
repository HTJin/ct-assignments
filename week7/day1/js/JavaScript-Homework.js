//==================Exercise #1 ==========//
/*Write a function that takes in the string and the list of dog names, loops through 
the list and checks that the current name is in the string passed in. The output should be:
"Matched dog_name" if name is in the string, if no matches are present console.log "No Matches"
*/
let dog_string = "Hello Max, my name is Dog, and I have purple eyes!"
let dog_names = ["max","HAS","PuRple","dog", "hello"] // <-- added some extra elements 

function findWords(dstr, darr) {
    let matchedNames = []
    for (let i = 0; i < darr.length; i++) {
        if (dstr.includes(darr[i])) {
            matchedNames.push(darr[i])
        }
    } if (matchedNames.length > 0) {
        console.log('Matched '+matchedNames.join(', '))
        return 'Matched '+matchedNames.join(', ')
    } else {
        console.log('No Matches')
        return 'No Matches'
    }
} findWords(dog_string, dog_names)

// Experimenting: found out you can turn functions into expressions and pass parameters anonymously
console.log(function findWords2(dstr, darr) {
    let matchedNames = []
    for (let i = 0; i < darr.length; i++) {
        if (dstr.includes(darr[i])) {
            matchedNames.push(darr[i])
        }
    } if (matchedNames.length > 0) {
        return 'Matched '+matchedNames.join(', ')
    } else {
        return 'No Matches'
    }
}(dog_string, dog_names))

//============Exercise #2 ============//
/*Write a fucntion that takes in an array and removes every even index with a splice,
and replaces it with the string "even index" */

let stuff = ["Max","Baseball","Reboot","Goku","Trucks","Rodger"]

function replaceEvens(arr) {
    for (i in arr) {
        if (i % 2 == 0) {
            arr.splice(i, 1, 'even index')
        }
    } return arr
} replaceEvens(stuff) // console.log result = ["even index","Baseball","even index","Goku","even index","Rodger"]

//Expected output
//Given arr == ["Max","Baseball","Reboot","Goku","Trucks","Rodger"]
//Output arr == ["even index","Baseball","even index","Goku","even index","Rodger"]