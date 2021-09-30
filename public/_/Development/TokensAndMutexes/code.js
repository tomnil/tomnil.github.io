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

