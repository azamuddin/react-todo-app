var React = require('react');
var PropTypes = React.PropTypes;

var TodoCounter = React.createClass({
  filter: function(status){
    this.props.onFilter(status);
  },
  render: function() {
    return (
      <div className="counter">
        <span onClick={this.filter.bind(this, 'all')}>semua ({this.props.all}) </span>
        <span onClick={this.filter.bind(this, 'yes')}>selesai ({this.props.done}) </span>
        <span onClick={this.filter.bind(this, 'notdone')}>belum selesai ({this.props.notdone}) </span>
      </div>
    );
  }

});

module.exports = TodoCounter;
