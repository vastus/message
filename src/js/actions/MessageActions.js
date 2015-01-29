var constants = require('../constants');
var Dispatcher = require('../Dispatcher');

var messageActions = {

  create: function (text) {
    Dispatcher.dispatch({
      type: constants.MESSAGE_CREATE,
      text: text,
    });
  },

  initialize: function (messages) {
    Dispatcher.dispatch({
      type: constants.INITIAL_LOAD,
      messages: messages,
    });
  },

};

module.exports = messageActions;
