var React = require('react');
var MessageActions = require('../../actions/MessageActions');

var Input = React.createClass({

  render: function() {
    return (
      <form onSubmit={this._handleSubmit}>
        <input ref="text" type="text" placeholder="Type your message and press enter" />
      </form>
    );
  },

  _handleSubmit: function (e) {
    var node = this.refs.text.getDOMNode();

    MessageActions.create(node.value);
    node.value = '';
    e.preventDefault();
  }

});

module.exports = Input;
