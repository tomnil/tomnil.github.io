# 2020-03-26 Using mutex and caches to store backend tokens

## Authentication against an online cloud service

If you like to write code in NodeJS then you will eventually connect to a backend system. This could be a database or some cloud service. Now, authentication is an expensive operation so once you've gotten a token the most basic caching should be added. The trouble is to ensure that only *one* authentication takes place (NodeJs is asyncronous in it's nature).

## Mutex

A mutex is a gatekeeper that ensures only one can pass through to the next line of code. If there are many simultaneous calls, then the first call will pass (and "lock the door"). All others has to wait for the unlock.

## The example code

Note there are two main-functions that shows how mutexes work.

* *main1()* : Shows how caching works (every 10 seconds the cache will expire and a new token will be fetched.).
* *main2()* : Shows that only one shall pass - even if there's 10 simultaneous calls only one will do the actual fetch of the token (and place it in cache for the other 9 following calls)

```javascript
let Mutex = require("await-mutex").default;
let mutex = new Mutex();
let cache = new (require("cache"))(5 * 1000);	// 5 second cache

main1();

async function main1() {

	for (let i = 0; i < 30; i++) {
		console.log(new Date() + " The token is: " + await getToken());
		await sleep(1000);
	}

}

async function main2() {
	for (let i = 0; i < 10; i++) {
		getToken().then(token => console.log(token));
	}
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function getToken() {

	let unlock = await mutex.lock();	// This call makes sure only one "thread" can reach the next line of code

	let result = await cache.get("token");

	if (result) {
		unlock();
		return result;
	}

	console.log("Not found in cache, fetching from backend..")

	try {
		// Logon to backend systems and get the token here 
		result = "abcd1234"; 	// Fake token :)

		// Store in cache
		cache.put("token", result);

	} catch (e) {
		// Handle this :)
	} finally {
		// Finally is always run, even if there's an excetion
		unlock(); // Don't forget to unlock; if you do the entire NodeJS will stop.
	}

	return result;
}


```
