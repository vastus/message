var xhr = require('xhr');
var constants = require('./constants');
var initializer = require('./initializer');

xhr({
  uri: constants.API_URL + '/_design/all/_view/all_messages',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}, function (err, resp, body) {
  if (err) {
    console.log('XHR Error.', err);
  }

  switch (resp.statusCode) {
    case 500:
    console.log('500 Internal server error', body);
    break;

    case 404:
    console.log('404 Not found', body);
    break;

    case 200:
    var messages = JSON.parse(body).rows;
    initializer(messages, 'torso');
    break;

    default:
    console.log('Do not know how to handle status code ' + statusCode);
  }
});
