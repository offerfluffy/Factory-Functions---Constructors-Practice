// Function Factory
// Simpler and more flexible

function createPerson(name) {
  return {
    name,
    talk() { // function is copied to every object
      return `I am ${this.name}`
    }
  }
}

const me = createPerson("kyrylo")
const you = createPerson("jonh")

console.log(me)
console.log(you)

me.talk = function() {
  return `Hello, I am ${this.name}`;
} // the function only changes inside me

console.log(me.talk())
console.log(you.talk())

// Fix

let myProto = {
  talk() {
    return `Hello, I am ${this.name}`;
  }
}

// Object.create(proto, propertiesObject) creates a new object,
// sets its prototype to `proto`, and optionally defines its own properties.
// The new object will inherit methods and properties from `proto`.

function protoCreatePerson(name) {
  return Object.create(myProto, {
    name: {
      value: name
    }
  })
}

const protoMe = protoCreatePerson("kyrylo");
const protoYou = protoCreatePerson("john");

console.log(protoMe.talk())
console.log(protoYou.talk())

myProto.talk = function() {
  return `I am ${this.name}`;
}

/* Does not work because we are creating a new object
myProto = {
  talk() {
    return `I am ${this.name}`;
  }
};
*/

console.log(protoMe.talk())
console.log(protoYou.talk())

// Function Constructor
console.log("// Function Constructor //")

function Person(name){
  this.name = name
}

const ben = new Person("Ben") 
// Ben is an instance of a new type, inhereting from Person

console.log(ben)

Person.prototype.talk = function() {
  return `Hello, I am ${this.name}`;
}

console.log(ben.talk())
console.log(ben)

// Classes
// Essentialy just constructor (Syntax Sugar)