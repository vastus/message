var React = require('react');
var MessageInput = require('./messages/Input.react');
var MessageList = require('./messages/List.react');

var App = React.createClass({

  render: function() {
    return (
      <div>
        <h2>Messages</h2>
        <MessageInput />
        <MessageList />
      </div>
    );
  }

});

module.exports = App;
