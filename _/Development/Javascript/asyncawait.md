# 2019-09-09 Javascript async & await

## Async & Await example

In typical javascript, many functions expect either a callback or possibly return a promise. This makes the code hard to write, and with callbacks you might end up in callback hell. Now, for the sake of illustrating this problem, we have some code:

```javascript
let fs = require("fs");

loadfile = (fileName) => {

    fs.readFile(fileName, function (file) {
        console.log("File was read");
    });

    console.log("This is after readfile")
}

loadfile("c:\\temp\\a.txt");
```

In all cases, the following output will be rendered:

```text
This is after readfile
File was read
```

This can easily be solved with async/await:

```javascript
let fs = require("fs");

loadfile = async (fileName) => {
    let file = await fs.readFileSync(fileName);
    console.log("File was read");
    console.log("This is after readfile")
}

loadfile("c:\\temp\\a.txt");
```

## But from promises to async/await then?

Convert from:

```javascript
doSomething()
.then(result => {
  console.log(`Got the result: ${result}`);
})
.catch(...);
```

to:

```javascript
async function foo() {
  try {
    const result = await doSomething();
    console.log(`Got the result: ${result}`);
  } catch(error) {
    ...
  }
}
```

## Promise + async/await = perfect match

A function that's tagged async will be backwards compatible with a promise (and vice versa).

## "Upgrading" callback-only functions

For functions that only support callbacks, it's often possible to upgrade them to a promise (and therefore to a async/await):

```javascript
let util = require("util");
let upgradedfunction = util.promisify(callbackonly);
```

## Cannot use async on functions in the root

This doesn't work:

```javascript
console.log(await iwanttodebug());  // Not allowed to have await outside of async function

async function iwanttodebug(){
  return true;
}
```

The easy fix is to *always* have a async main() function as:

```javascript
main();

async function main(){
  console.log(await iwanttodebug())
}

async function iwanttodebug(){
  return true;
}
```

### Alternative way

```javascript
(async () => {
   console.log(await iwanttodebug())
})();
```
