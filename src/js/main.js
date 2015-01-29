var React = require('react');
var Dispatcher = require('./Dispatcher');
var MessageStore = require('./stores/MessageStore');
var MessageActions = require('./actions/MessageActions');
var constants = require('./constants');
var App = require('./views/App.react');

/*
 * Wrap this in a clojure and export it.
 * Pass data, and other necessary parts to it.
 */

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

var messages = [
  {
    id: 12,
    text: 'holla holla!'
  },
];


MessageActions.initialize(messages);
