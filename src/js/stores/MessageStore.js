var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Dispatcher = require('../Dispatcher');
var constants = require('../Constants');
var Rest = require('../utils/Rest');

var CHANGE_EVENT = 'change';

var _dispatchToken;
var _messages = {};

function message(id, text) {
  return {
    id: id || Date.now().toString(),
    text: text,
  };
}

function create(id, text) {
  var m = message(id, text);
  _messages[id] = m;
  Rest.create(id, text).then(function success(resp) {
    console.log('Created', resp);
  }, function fail(err) {
    console.log('Failed', err);
  });
}

function addToCollection(messages) {
  messages.forEach(function (m, _) {
    _messages[m.id] = message(m.id, m.value);
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
      addToCollection(action.messages);
      MessageStore.emitChange();
    break;
  }
});

module.exports = MessageStore;
