//==========Exercise #1 ===========//
/*
Write a function that parses through the below object and displays all of their
favorite food dishes as shown:
*/

let person3 = {
	pizza: ["Deep Dish", "South Side Thin Crust"],
	tacos: "Anything not from Taco bell",
	burgers: "Portillos Burgers",
	ice_cream: ["Chocolate", "Vanilla", "Oreo"],
	shakes: [{
		oberwise: "Chocolate",
		dunkin: "Vanilla",
		culvers: "All of them",
		mcDonalds: "Sham-rock-shake",
		cupids_candies: "Chocolate Malt"
	}]
}

function displayFavoriteFoods(person) {
	let result = 'Favorite food types for this person are:\n'
	let order = 1

	for (let [food, dish] of Object.entries(person)) {
		let foodLine = `${order}) ${food} - `
		if (Array.isArray(dish)) {
			if (typeof dish[0] === 'object') {
				let flavors = []
				for (let [origin, flavor] of Object.entries(dish[0])) {
					flavors.push(`${flavor} is the best flavor from ${origin}`)
				}
				foodLine += flavors.join(', ')
			} else {
				foodLine += dish.join(', ')
			}
		} else {
			foodLine += dish
		}
		result += foodLine + '\n'
		order++
	} console.log(result)
	return result
} displayFavoriteFoods(person3)

//=======Exercise #2=========//
/*
Write an object prototype for a Person that has a name and age, has a
printInfo method, and also has a method that
increments the persons age by 1 each time the method is called.
Create two people using the 'new' keyword, and print
both of their infos and increment one persons
age by 3 years. Use an arrow function for both methods
*/

// Create our Person Prototype
class Person {
	constructor(name, age) {
		this.name = name
		this.age = age
	}
	// Use an arrow to create the printInfo method
	printInfo = () => {
		console.log(`Hi, my name is ${this.name}, I'm ${this.age} years old.`)
		return `Hi, my name is ${this.name}, I'm ${this.age} years old.`
	}
	// Create another arrow function for the addAge method that takes a single parameter
	// Adding to the age 
	addAge = (age) => {
		this.age = age + 1
		console.log(`1 year later... for ${this.name}`)
		return `1 year later... for ${this.name}`
	}
}
let howard = new Person('Howard', 34)
let anne = new Person('Anne', 42)

howard.printInfo()
anne.printInfo()
howard.addAge(howard.age)
howard.addAge(howard.age)
howard.addAge(howard.age)
howard.printInfo()

// =============Exercise #3 ============//
/*

	Create a Promised based function that will check a string to determine if it's length is greater than 10.
	If the length is greater than ten console log "Big word". 
	If the length of the string is less than 10 console log "Small Number"
*/
testString1 = 'Thisisgoingtobeabigwordforsure'
testString2 = 'smol'

const lengthCheckPromise = (msg) => {
	return new Promise((resolve, reject) => {
		if (msg.length > 10) {
			resolve(msg)
		} else {
			reject(msg)
		}
	})
}

lengthCheckPromise(testString1)
	.then(() => {
		console.log('Big word')
	})
	.catch(() => {
		console.log('Small Number')
	})
lengthCheckPromise(testString2).then(() => { console.log('Big word') }).catch(() => { console.log('Small Number') })