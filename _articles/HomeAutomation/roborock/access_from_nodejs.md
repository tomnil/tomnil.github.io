---
layout: article
title:  Access roborock using javascript
description: 
date: 2020-01-24
tags: homeautomation
supertag: homeautomation
---

## Prereqs

Install nodejs and npm.

## Creating the mini project

```bash
### Create project folder
mkdir roborock
cd roborock

# Initialize project
npm init -y

## Add miio dependency
npm install miio
```

Create ```index.js```

```javascript
const miio = require('miio');

miio.device({ address: '192.168.1.165', token: 'THETOKEN' })
    .then(device => console.log('Connected to', device))
    .catch(err => handleErrorHere);

```

Get the [token](HowTo.md).

For more examples, see [miio](https://www.npmjs.com/package/miio)

Run:

```bash
node index.js
```
