var React = require('react');
var MessageStore = require('../../stores/MessageStore');
var MessageItem = require('./Item.react');

var List = React.createClass({

  componentDidMount: function () {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MessageStore.removeChangeListener(this._onChange);
  },

  getInitialState: function () {
    return { messages: MessageStore.getMessages() };
  },

  render: function() {
    var messages = Object.keys(this.state.messages).map(function (key) {
      var m = this.state.messages[key];

      return (
        <MessageItem
          id={m.id}
          key={m.id}
          text={m.text}
        />
      );
    }.bind(this));

    return (
      <ul>
        {messages}
      </ul>
    );
  },

  _onChange: function () {
    this.setState({ messages: MessageStore.getMessages() });
  },

});

module.exports = List;
