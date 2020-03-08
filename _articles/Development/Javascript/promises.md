---
layout: article
title:  Javascript promises
description:
date: 2019-09-09
tags: development javascript
supertag: javascript
---

## Promises

First of all: ```async/await``` is better than Promise, but understanding how Promises work is essential to becoming an successful javascript developer.

## This is what's is all about

```javascript
doSomething()
.then(result => doSomethingElse(result))
```

### Returning a promise from a function

```javascript
function MyPromiseFunction(issuekey) {

    return new Promise(function (resolve, reject) {
        if (1==1)   // Not much going wrong here... :)
            resolve("job completed");
        else
            reject("job failed");
        });
}
```

and to use it:

```javascript
MyPromiseFunction("SUP-579")
    .then(r => console.log("Return from the promise: " + r))
    .catch(e => console.log("Error calling promise: " + e));
```

... or

```javascript
let result = await MyPromiseFunction("Case7");
```

## More information

Read all about them [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
