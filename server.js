// Require Express.js
const express = require("express");

// Create app using express
const app = express();

// Initialize args, define argument "port", and assign port a value
const args = require("minimist")(process.argv.slice(2));
args["port"];
const port = args.port || process.env.PORT || 5555;

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port));
});

// Check endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

// Multiple flips endpoint
app.get('/app/flips/:number', (req, res) => {
    var num = parseInt(req.params.number);
    var flips = coinFlips(num);
    var count = countFlips(flips);
    var out = {raw: flips, summary: count};

    res.status(200).json(out);
});

// Single flip endpoint
app.get('/app/flip/', (req, res) => {
	const result = coinFlip();
    const out = {flip: result};

    res.status(200).json(out);
});

// Guess flip endpoint
app.get('/app/flip/call/:call', (req, res) => {
    const call = req.params.call;
    const out = flipACoin(call);

    res.status(200).json(out);
});

// Default endpoint
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND');
});


// Coin functions:
function coinFlip() {
    return Math.floor(Math.random() * 2) ? "heads" : "tails";
}

function coinFlips(flips) {
    var out = [];
    for (var i = 0; i < flips; i++) {
      out[i] = coinFlip();
    }
    return out;
}

function countFlips(array) {
    var headsCount = 0;
    var tailsCount = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == "heads") {
            headsCount++;
        } else {
            tailsCount++;
        }
    }
    return {heads: headsCount, tails: tailsCount};
}

function flipACoin(call) {
    var flip = coinFlip();
    return {call: call, flip: flip, result: flip == call ? "win" : "lose"};
}