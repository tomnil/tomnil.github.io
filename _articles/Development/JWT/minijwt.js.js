const jsonwebtoken = require('jsonwebtoken');
const express = require("express");
const bodyparser = require('body-parser')

// Some constants
const port = 3005;
const app = express();
const config = {
    jwt: {
        key: "dfhjkafhaebHbhjb2jhbHJ"
    }
}

// Main :)

main();

function main() {

    // Setup express

    app.use(bodyparser.json());
    setupInterceptMiddleware();
    setupRoutes();

    // Begin listening

    app.listen(port, () =>
        console.log(`Webserver started. URL=http://localhost:${port}/`)
    );


}



function setupInterceptMiddleware() {

    app.use(function decode(req, res, next) {

        let result = decodeToken(req);  // See below on the gettoken call
        if (result) {

            // console.log("setupInterceptMiddleware():\tA valid token was found: Decoded result=" + JSON.stringify(result));

            // This is a neat trick :) Why? See /ping1 call
            req.me = {
                username: result.username
            }
        }
        next();
    });

}


function setupRoutes() {

    app.post(`/login`, (req, res) => {

        const { username, password } = req.body;

        if (!(username && password)) {
            res.status(401).json({ error: "Need username and password" });
        }
        else {

            // Fake user login :)
            // let user = userlist.find(username);
            let user = {
                login: () => { return true; }
            }

            if (user && user.login(password)) {

                let jwtcontents = {
                    username: username,
                }

                let jwt = jsonwebtoken.sign(jwtcontents, config.jwt.key, { expiresIn: 3600 });

                res.json({ token: jwt });
            }
            else
                res.json({ message: "Bad username or password" });

        }

        res.end();

    });


    app.get(`/ping1`, OnlyAuthenticatedMiddleware, (req, res) => {

        // Try to access this code with both a valid and an expired token (the latter will fail
        // because it passes the middleware OnlyAuthenticatedMiddleware).

        console.log(`/ping1: Username=${req.me.username}`);
        res.json({ pong: `Hello from ping1. Username=${req.me.username}` })

    });

    app.get(`/ping2`, (req, res) => {

        // Try to access this code with both a valid and an expired token (both will work,
        // but without logging in "Hello guest" will be returned)

        if (req.me && req.me.username) {
            console.log(`/ping2: Username=${req.me.username}`);
            res.json({ pong: `Hello from ping2. You are authenticated with username=${req.me.username}` })
        }
        else {
            console.log(`/ping2: Username not found (no valid token)`);
            res.json({ pong: `Hello guest` })
        }
    });

}



function OnlyAuthenticatedMiddleware(req, res, next) {

    // If the token was decoded properly, then run next()
    if (req.me && req.me.username) {
        next()
    }
    else {
        // Sorry, you need to authenticate (error 401)
        res.status(401).json({ error: "Token expired" });
        res.end();
    }
};

function decodeToken(req) {

    let result;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

        // Get the JWT
        let token = req.headers.authorization.split(' ')[1];

        // Verify the token (make sure it's not modified) using our secret key
        try {
            result = jsonwebtoken.verify(token, config.jwt.key);
        } catch (error) {
            console.log("decodeToken(): Could not verify & decode token. Error=" + error);
        }
    }

    return result; // Return undefined if not found/not valid
}

function login() {

}