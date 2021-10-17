# 2019-09-09 Javascript classes

## Defining a class

The constructor runs when a class is instantiated (and there is no support for a desctructor).

```javascript
class Animal {
    constructor(name='test'){
        console.log(name);
    }
}
```

## Keyword _this_

this is used for all references within the class. For example, if we want to create a variable in the constructor it could look like:

```javascript
class Animal {
    constructor(name='test'){
        this.name = name;
    }
}
```

This also applies for functions:

```javascript
class Animal {

    Method1 = () => {
        console.log("Hello from Method1.");
        this.Method2();
    }

    Method2() {
        console.log("Method2 :)");
    }

}

let a = new Animal();
a.Method1();
```

## Functions

Functions can be defined with either old style syntax ```function myname(parameter1, ...) {}``` or with ```myname = (parameter1, ...) => {}```. Either works, but the latter is recommended.

## Private variables

:!: This applies for node v12 and higher (check your version by running ```node -v```).

```javascript
{% include_relative classes.js %}
```

## getters and setters

Implemented by:

```javascript
    // setter
    set eats(food) {
        this.food = food;
    }

    // getter
    get eats() {
        return this.food;
    }
```

## Larger class example

```javascript
class Animal {

    constructor(name = 'anonymous', legs = 4, noise = 'nothing') {
        this.type = 'animal';
        this.name = name;
        this.legs = legs;
        this.noise = noise;
    }

    speak() {
        console.log(`${this.name} says "${this.noise}"`);
    }

    walk() {
        console.log(`${this.name} walks on ${this.legs} legs`);
    }

    // setter
    set eats(food) {
        this.food = food;
    }

    // getter
    get dinner() {
        return `${this.name} eats ${this.food || 'nothing'} for dinner.`;
    }

}
```

## Some behaviours

```javascript
let a1 = new Animal("Dog");
a1.food = "Dogfood";
let b1 = new Animal("Horse");
b1.food = "Horsefood";

console.log(a1.speak());
console.log(b1.speak());

console.log(a1 === b1);        // returns false
console.log(a1 === a1);        // returns true
console.log(typeof (a1));    // Returns "object"
console.log(a1.constructor.name);    // Returns "Animal"
console.log(a1.type);        // Returns "animal"
```

## Export?

If you want to export a class to another file, just export the class. In ```animal.js``` make:

```javascript
class Animal {
    Method1 = () => {
        console.log("Hello from Method1.");
    }
}

module.exports = Animal;
```

in ```main.js``` use:

```javascript
let AnimalClass = require("./animal.js");
let Animal = new AnimalClass();
Animal.Method1();
```

## Singleton export?

I'd like to belive the following way is a pretty good solution to create a singleton.

In ```animal.js``` make:

```javascript
class Animal {
    Method1 = () => {
        console.log("Hello from Method1.");
    }
}

module.exports = new Animal();
```

in ```main.js``` use:

```javascript
let Animal = require("./animal.js");
Animal.Method1();
```
