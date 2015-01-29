var React = require('react');
var Dispatcher = require('./Dispatcher');
var MessageStore = require('./stores/MessageStore');
var MessageActions = require('./actions/MessageActions');
var constants = require('./constants');
var App = require('./views/App.react');

function initializer(messages, elemId) {
  var dispatchToken = Dispatcher.register(function (action) {
    if (action.type !== constants.INITIAL_LOAD) {
      return;
    }

    var tokens = [MessageStore].map(function (store) {
      return store.getDispatchToken();
    });

    Dispatcher.waitFor(tokens);

    React.render(
      <App />,
      document.getElementById('torso')
      );

    Dispatcher.unregister(dispatchToken);
  });

  MessageActions.initialize(messages);
}

module.exports = initializer;
