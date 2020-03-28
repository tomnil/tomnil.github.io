---
layout: article
title:  Tips and tricks for PostMan
description: 
date: 2019-12-07
tags: rest
supertag: rest
---

## Fetching bearer and storing to global variable (from headers)

To add scripts to execute after a request has completed, just go to the "Tests" tab.

![](2020-03-01-19-02-43.png)

```javascript
let key = pm.response.headers.get('x-vcloud-authorization');
console.log("Found it: " + key)
pm.globals.set("x-vcloud-authorization", key);
```

## Fetching bearer and storing to global variable (from body)

If the returned body looks loke:

```json
{
    token: "abc123"
}
```

then this script works:

```javascript
let body = pm.response.json();
let token = body.token;
console.log("Found it: " + token);
pm.globals.set("token", token);
```

## Using global variables

Global variables can be viewed in the top right eye ![](2020-03-01-19-03-50.png) .

To use them, just reference then with double brackets as {{x-vcloud-authorization}}. Example:

![](2020-03-01-19-04-50.png)

## Enjoy.

:)
