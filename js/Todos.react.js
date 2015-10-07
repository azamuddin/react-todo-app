var React = require('react');
var PropTypes = React.PropTypes;

var TodoItem = require('./TodoItem.react');

var Todos = React.createClass({
  updateItem: function(item){
    this.props.onUpdateItem(item); // kirim lagi ke parent
  },
  deleteItem: function(item){
    this.props.onDeleteItem(item); // kirim lagi ke parent
  },
  render: function() {
    var component = this;
    return (
      <div>
        <ul className="list-item">
          {this.props.items.map(function(todo, i){
            return (
              <TodoItem
                item={todo}
                onUpdateItem={component.updateItem}
                onDeleteItem={component.deleteItem}
                key={i}
              />
            )
          })}
        </ul>
      </div>
    );
  }

});

module.exports = Todos;
