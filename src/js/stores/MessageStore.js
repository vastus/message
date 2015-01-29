var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Dispatcher = require('../Dispatcher');
var constants = require('../Constants');

var CHANGE_EVENT = 'change';

var _dispatchToken;
var _messages = {};

function create(id, text) {
  var message = {
    id: id || Date.now(),
    text: text,
  };

  _messages[message.id] = message;
}

function createAll(messages) {
  messages.forEach(function (message, _) {
    create(message.key, message.value);
  });
}

var MessageStore = assign({}, EventEmitter.prototype, {

  getDispatchToken: function () {
    return _dispatchToken;
  },

  getMessages: function () {
    return _messages;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

_dispatchToken = Dispatcher.register(function (action) {
  switch (action.type) {
    case constants.MESSAGE_CREATE:
      create(Date.now(), action.text.trim());
      MessageStore.emitChange();
    break;

    case constants.INITIAL_LOAD:
      createAll(action.messages);
      MessageStore.emitChange();
    break;
  }
});

module.exports = MessageStore;
