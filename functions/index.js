const functions = require('firebase-functions/v2');
const api = require('./api'); // Import the api.js module

exports.myFunction = functions.https.onRequest({ region: 'us-east1' }, api.main);
