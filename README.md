
# JavaScript Prototype System – Structured Summary

## 1. What is a Prototype?

- In JavaScript, **prototype** is an object associated with **constructor functions** and **classes**.
- The `prototype` object holds properties and methods that will be **shared** across all instances created by the constructor.

```js
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const user = new Person("Kyrylo");
user.sayHello(); // Hi, I'm Kyrylo
```

## 2. `__proto__` vs `prototype`

| Property     | Belongs To              | Description                                                                 |
|--------------|-------------------------|-----------------------------------------------------------------------------|
| `prototype`  | Constructor functions   | Shared object for instance inheritance                                     |
| `__proto__`  | All objects             | Points to the prototype object (i.e., internal `[[Prototype]]`)            |
| `[[Prototype]]` | Internal engine link | Official internal linkage used by JS engine (accessed via `__proto__`)     |

### Key Relationship:

```js
instance.__proto__ === Constructor.prototype; // true
```

- `prototype` is shared among instances.
- `__proto__` is specific to each instance but **points** to that shared `prototype`.

## 3. Prototype Chain

- When accessing a property or method, JS looks up the **prototype chain**:
```js
object → object.__proto__ → object.__proto__.__proto__ → ... → null
```

- If not found on the object, JS looks at its prototype, then the prototype's prototype, and so on.

### Visual Example:
```js
const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(rabbit.eats); // true
```

## 4. Function Prototypes and Class Syntax

- All functions (except arrow functions) have a `prototype` property.
- Classes are just syntactic sugar over function constructors.

```js
class Person {
  sayHi() {}
}
console.log(typeof Person); // "function"
console.log(Person.prototype.sayHi); // function
```

## 5. Object.create()

- Used to manually create a new object with a specific prototype:

```js
const parent = { greet() { console.log("Hello"); } };
const child = Object.create(parent);
child.greet(); // Hello
```

## 6. Prototype vs Scope Chain

| Feature              | Scope Chain                        | Prototype Chain                             |
|----------------------|------------------------------------|---------------------------------------------|
| Lookup target        | Variables/functions                | Object properties/methods                   |
| Chain direction      | Inner → Outer lexical environments | Object → prototype → prototype... → null    |
| Built from           | Lexical structure of code          | Object inheritance structure                |
| When built           | Compile time                       | Runtime                                     |
| Used in              | Variable resolution                | Property/method resolution                  |

## 7. Shadowing (Prototype Shadowing)

- Occurs when an object defines a property/method that has the **same name** as one in its prototype.

```js
function Person() {}
Person.prototype.sayHi = () => console.log("Hi from prototype");

const user = new Person();
user.sayHi(); // Hi from prototype

user.sayHi = () => console.log("Hi from instance");
user.sayHi(); // Hi from instance (shadows prototype)
```

- You can still manually access the original:

```js
Person.prototype.sayHi.call(user); // Hi from prototype
```

## 8. Why "Everything is an Object"?

- Most things in JS are objects or behave like objects via prototype mechanisms.
- Even primitives (e.g. strings, numbers) are **temporarily wrapped** in objects when you call methods on them.

```js
"abc".toUpperCase(); // "ABC" → treated as new String("abc")
```

| Type        | Inherits From                         |
|-------------|----------------------------------------|
| Arrays      | Array.prototype → Object.prototype     |
| Functions   | Function.prototype → Object.prototype  |
| Plain objects | Object.prototype                    |
| Classes     | Same as constructor functions          |

## 9. Best Practices & Notes

- Avoid using `__proto__` in production. Use:
  - `Object.getPrototypeOf(obj)`
  - `Object.setPrototypeOf(obj, proto)` (rarely, it's slow)
- Use `Function.prototype` or `Class.prototype` to define shared methods.
- Prototype inheritance provides memory-efficient behavior sharing.
