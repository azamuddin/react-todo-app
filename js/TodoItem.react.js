var React = require('react');
var PropTypes = React.PropTypes;
var _ = require('lodash');

var TodoItem = React.createClass({
  getInitialState: function(){
    return {
      item: this.props.item,
      isEditing: false
    };
  },
  toggleDone: function(e){
    var todoDone;
    if(Boolean(this.state.item.done)){
      todoDone = "";
    } else {
      todoDone = "yes";
    }
    this.setState({
      item: _.merge(this.state.item, {done: todoDone})
    }, this.props.onUpdateItem(this.state.item));
  },
  deleteItem: function(e){
    this.props.onDeleteItem(this.state.item);
  },
  handleTitleChange: function(){
    var newTitle = this.refs.title.getDOMNode().value;
    this.setState({
      item: _.merge(this.state.item, {title: newTitle})
    });
  },
  updateItem: function(e){
    e.preventDefault();
    this.props.onUpdateItem(this.state.item);
  },
  editItem: function(e){
    this.setState({
      isEditing: true
    });
  },
  render: function() {
    return (
      <div className="item" onDoubleClick={this.editItem}>
        <div style={{display: this.state.isEditing ? 'none' : 'block'}}>
          <input
            ref="done"
            type="checkbox"
            checked={Boolean(this.state.item.done)}
            onChange={this.toggleDone}
          />
        <span className={this.state.item.done ? 'done' : 'not'}>{this.state.item.title}</span>
          <a onClick={this.deleteItem} className="delete-item">hapus</a>
        </div>

        <div style={{display: this.state.isEditing ? 'block': 'none'}}>
          <form onSubmit={this.updateItem}>
            <input type="text" value={this.state.item.title} ref="title" onChange={this.handleTitleChange}/>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = TodoItem;
