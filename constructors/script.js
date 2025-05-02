// Constructor is a function that creates objects

function SuperElement(tag, text, color){
  // const this = {};
  let private = "private"

  this.el = document.createElement(tag);
  this.el.textContent = text;
  this.el.style.color = color;

  document.body.append(this.el);

  this.el.addEventListener("click", function(e) {
    console.log(this)
  });

  /* 
  this.setText = function(text) {
    this.el.textContent = text;
  }

  this.setColor= function(color) {
    this.el.style.color = color;
  }
  */

  this.reveal = function() {
    return private; //  is not accessible from outside, but the reveal method can still access it because it's defined inside the same scope (closure).
  }

  // return this;
}

SuperElement.prototype.setText = function(text) {
  this.el.textContent = text;
};

SuperElement.prototype.setColor = function(color) {
  this.el.style.color = color;
};

SuperElement.prototype.reveal = function() {
  return private; // the error happens because reveal() was defined outside the constructor's scope, so it has no access to privateVar.
}

/* 
  Methods Inside Constructor
    Pluses:
    - Can access private variables via closure.
    - Simple and straightforward.

    Minuses:
    - Each instance gets its own copy → more memory usage.
    - Not ideal for many instances.

  Methods on Prototype
    Pluses:
    - Shared across all instances → memory efficient.
    - Good for reusable methods.

    Minuses:
    - Can’t access private variables inside constructor.
    - Slightly more verbose syntax.
*/

const h1 = new SuperElement("h1", "Hello World", "Red")
console.log(h1)
