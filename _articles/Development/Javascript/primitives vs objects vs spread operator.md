---
layout: article
title:  Javascript primitives vs objects vs spread operator
description:
date: 2020-02-20
tags: development javascript
supertag: javascript
---

## Javascript primitives

Javascript has the following primivities:

* string (any string)
* number (any number including NaN, Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY)
* boolean (true/false)
* null
* undefined
* symbol

Read more about them [here](https://medium.com/@DveMac/a-quick-tour-of-javascript-primitives-894eceee31c2).

## Objects

Everything else outside of the primitives are objects. This includes dates, arrays, JSON and so forth.

## Passing parameters to a function

Now this is important. Passing parameters and then modifying them inside a function *might* modify the input permanently, depeding on how you use it.

Consider the following code:

```javascript
function test(primitiveparam1, objparam1, objparam2){
    console.log(`original primitiveparam1=${primitiveparam1}`);
    primitiveparam1="Modified";  // Will modify input parameter, but after this function is completed it will be it's original value.
    console.log(`modified primitiveparam1=${primitiveparam1}`);

    console.log(`original objparam1=${JSON.stringify(objparam1)}`);
    objparam1 = { replace: "modified"};   // Will modify input parameter, but after this function is completed it will be it's original value.
    console.log(`modified objparam1=${JSON.stringify(objparam1)}`);

    console.log(`original objparam2=${JSON.stringify(objparam2)}`);
    objparam2.test = 9; // This call will modify the incoming object, and after this function is completed the *modified* object will be returned.
    console.log(`modified objparam2=${JSON.stringify(objparam2)}`);
}

let mypp="bar";
let myop1={ test: 7 }
let myop2={ test: 7 }

console.log("-------------------------------")
console.log("Running test...")
test(mypp, myop1, myop2);
console.log("-------------------------------")

console.log("After test my variables are:");
console.log(`RESULT mypp=${mypp}`);
console.log(`RESULT myop1=${JSON.stringify(myop1)}`);
console.log(`RESULT myop2=${JSON.stringify(myop2)}`);
```

This will print

```text
-------------------------------
Running test...
original primitiveparam1=bar
modified primitiveparam1=Modified
original objparam1={"test":7}
modified objparam1={"replace":"modified"}
original objparam2={"test":7}
modified objparam2={"test":9}
-------------------------------
After test my variables are:
RESULT mypp=bar              <==== Unmodified
RESULT myop1={"test":7}      <==== Unmodified
RESULT myop2={"test":9}      <==== Modified. This is most likely not what you want.
```

## This problem can be solved using the spread operator.. or not?

Consider the following code:

```javascript
function test(objparam1){
    let mycopy = { ... objparam1 };
    console.log(`original mycopy=${JSON.stringify(mycopy)}`);
    mycopy.test = 9; // This call will modify the incoming object
    console.log(`modified mycopy=${JSON.stringify(mycopy)}`);
}

let myop1={ test: 7 }
console.log("-------------------------------")
console.log("Running test...")
test(myop1);
console.log("-------------------------------")
console.log(`RESULT myop1=${JSON.stringify(myop1)}`);
```

This will return

```text
-------------------------------
Running test...
original mycopy={"test":7}     <=== This is a copy.. or is it?
modified mycopy={"test":9}
-------------------------------
RESULT myop1={"test":7}        <=== Original value, as we want!
```

So what's the problem? Well, if you pass a more complex object this happens:

```javascript
function test(objparam1){
    let mycopy = { ... objparam1 };
    console.log(`original mycopy=${JSON.stringify(mycopy)}`);
    mycopy.test = 9; // This call will modify the incoming object
    mycopy.items.push(20000);
    console.log(`modified mycopy=${JSON.stringify(mycopy)}`);
}

let myop1={
    test: 7,
    items: [7, 8, 9]
}
console.log("-------------------------------")
console.log("Running test...")
test(myop1);
console.log("-------------------------------")
console.log(`RESULT myop1=${JSON.stringify(myop1)}`);
```

This returns:

```text
-------------------------------
Running test...
original mycopy={"test":7,"items":[7,8,9]}
modified mycopy={"test":9,"items":[7,8,9,20000]}
-------------------------------
RESULT myop1={"test":7,"items":[7,8,9,20000]}     <=== Modified items (!!!)
```

So the spread operator is making "half a copy" (called a ```shallow copy```)

## Deep cloning - the easy fix

The real solution to the problem is called deep cloning. Now the easy, quick and dirty fix is to do:

```javascript
let mycopy = JSON.parse(JSON.stringify(orig));
```

.. but this has some troubles since some items can be lost/modified.

```javascript
let orig={
    test: 7,
    items: [7, 8, 9],
    lost: undefined
}

let mycopy = JSON.parse(JSON.stringify(orig));
console.log(`mycopy=${JSON.stringify(mycopy)}`);
console.log(`orig keys=${Object.keys(orig)}`);
console.log(`mycopy keys=${Object.keys(mycopy)}`);
```

This will output:

```text
mycopy={"test":7,"items":[7,8,9]}
orig keys=test,items,lost
mycopy keys=test,items  <=== orig.lost is not here
```

## Deep cloning - the proper way

Now this is a topic in it self. I recommend you use [stackoverflow](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript) and decide for the method yourself.
