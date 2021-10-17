class Animal {

    #myvariable = 80;

    constructor(name = 'test') {
        this.type = 7;
        console.log(this.#myvariable);  // Will return 80
    }

    #hidden = () => {
        console.log("This is hidden");
    }

    visible() {
        console.log("Visible!");
        this.#hidden();
    }

}


let a = new Animal();
a.visible();

// console.log(a.#myvariable);
// Cannot uncomment this line, will give error:
// SyntaxError: Private field '#myvariable' must be declared in an enclosing class
