var xhr = require('xhr');
var constants = require('../Constants');

function initMessage(id, text) {
  return {
    _id: id.toString(),
    text: text,
  };
}

module.exports = function Rest() {
  function create(id, text) {
    return new Promise(function (resolve, reject) {
      var m = initMessage(id, text);

      xhr({
        uri: constants.API_URL,
        method: 'POST',
        body: JSON.stringify(m),
        headers: {
          'Content-Type': 'application/json',
        }
      }, function (err, resp, body) {
        if (err) {
          reject(err);
        }

        if (400 <= resp.statusCode) {
          reject(JSON.parse(body));
        }

        resolve(resp);
      });
    });
  }

  return {
    create: create,
  };
}();
