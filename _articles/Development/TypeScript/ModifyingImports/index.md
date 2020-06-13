---
layout: article
title: Add own object to Express.Request and keep intellisense
description: 
date: 2020-06-13
tags: vscode typescript
supertag: typescript
---

It's possible to modify an existing interface (in this case, Express) and add your own properties.

```javascript
import Express from "express";

declare global {
  namespace Express {
    interface Request {
      loggedInUser: string
    }
  }
}

// Demo code 
let DecodeFromAuthorization = (iAuth: string | undefined) => { return "John"; }

// Initialize Express
const app = Express();

// All incoming calls should try to determinate who's logged in
app.use((req, res, next) => {
  req.loggedInUser = DecodeFromAuthorization(req.headers["authorization"]);
  next();
});

// On /ping
app.get('/ping', function (req: Express.Request, res: Express.Response) {
  console.log(`Logged in user=${req.loggedInUser}`);
  res.send(`Pong ${req.loggedInUser}`);
})


app.listen(4000, () => console.log('Listening on port 4000!'))
```

Run and check the result at [http://localhost:4000/ping](http://localhost:4000/ping).
