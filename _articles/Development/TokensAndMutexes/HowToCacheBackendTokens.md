---
layout: article
title: Using mutex and caches to store backend tokens
description: 
date: 2020-03-26
tags: nodejs javascript
supertag: nodejs
---

## Authentication against an online cloud service

If you like to write code in NodeJS then you will eventually connect to a backend system. This could be a database or some cloud service. Now, authentication is an expensive operation so once you've gotten a token the most basic caching should be added. The trouble is to ensure that only *one* authentication takes place (NodeJs is asyncronous in it's nature).

## Mutex

A mutex is a gatekeeper that ensures only one can pass through to the next line of code. If there are many simultaneous calls, then the first call will pass (and "lock the door"). All others has to wait for the unlock.

## The example code

Note there are two main-functions that shows how mutexes work.

* *main1()* : Shows how caching works (every 10 seconds the cache will expire and a new token will be fetched.).
* *main2()* : Shows that only one shall pass - even if there's 10 simultaneous calls only one will do the actual fetch of the token (and place it in cache for the other 9 following calls)

```javascript
{% include_relative code.js %}
```
