var React = require('react');
var PropTypes = React.PropTypes;
var $ = require('jquery');
var _ = require('lodash');

var Todos = require('./Todos.react');
var TodoCounter = require('./TodoCounter.react');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos: [],
      filtered: []
    };
  },
  componentDidMount: function(){
    this.getDataFromServer();
  },
  getDataFromServer: function(){
    var component = this;
    $.ajax({
      method: 'get',
      url: 'http://localhost:9000/api/todos',
      cache: false,
      success: function(data){
        component.setState({todos: [], filtered: []});
        component.setState({todos: data, filtered: data});
      },
      error: function(xhr, status, err){
        alert(err);
      }
    });
  },
  addItem: function(e){
    e.preventDefault();

    var component = this;
    var value = this.refs.newTodo.getDOMNode().value;
    var newTodo = {title: value, done: ""};
    $.ajax({
      method: 'post',
      url: 'http://localhost:9000/api/todos',
      data: {item: newTodo},
      success: function(){
        component.getDataFromServer();
        component.clearInput();
      },
      error: function(xhr, status, err){
        alert(status);
      }
    });
  },
  updateItem: function(item){
    console.log(item);
    var component = this;
    $.ajax({
      method: 'post',
      url: 'http://localhost:9000/api/todos/'+item.id,
      data: {
        updatedItem: item
      },
      success: function(){
        component.getDataFromServer();
      },
      error: function(xhr, status, err){
        alert(status);
      }
    });
  },
  deleteItem: function(item){
    var component = this;
    $.ajax({
      method: 'delete',
      url: 'http://localhost:9000/api/todos/'+item.id,
      success: function(){
        component.getDataFromServer();
      },
      error: function(){
        alert('gagal menghapus data');
      }
    });
  },
  clearInput: function(){
    this.refs.newTodo.getDOMNode().value = ''; // clear input
  },
  filterTodos: function(status){
    var component = this;
    $.ajax({
      method: 'get',
      url: 'http://localhost:9000/api/todos',
      data: {
        filter: status
      },
      cache: false,
      success: function(data){
        component.setState({
          filtered: []
        });
        component.setState({filtered: data});
      },
      error: function(xhr, status){
        alert(status);
      }
    });
  },
  render: function() {
    return (
      <div className="todo-container">
        <h1>{this.props.title}</h1>

        <form onSubmit={this.addItem}>
          <input type="text" ref="newTodo" placeholder="Apa yang harus dikerjakan?" />
        </form>

        <Todos
          onUpdateItem={this.updateItem}
          onDeleteItem={this.deleteItem}
          items={this.state.filtered}/>

        <TodoCounter
          all={this.state.todos.length}
          done={_.where(this.state.todos, {done: 'yes'}).length}
          notdone={_.where(this.state.todos, {done: ''}).length}
          onFilter={this.filterTodos}
          />
      </div>
    );
  }

});

module.exports = TodoApp;
