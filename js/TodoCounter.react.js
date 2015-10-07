var React = require('react');
var PropTypes = React.PropTypes;

var TodoCounter = React.createClass({
  filter: function(status){
    this.props.onFilter(status);
  },
  render: function() {
    return (
      <div className="counter">
        <span>semua ({this.props.all}) </span>
        <span>selesai ({this.props.done}) </span>
        <span>belum selesai ({this.props.notdone}) </span>
      </div>
    );
  }

});

module.exports = TodoCounter;
