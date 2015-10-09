var express = require('express');
var app = express();
var lowdb = require('lowdb');
var db = lowdb('server/db/todos.json');
var bodyParser = require('body-parser');
var cors = require('cors');
var uuid = require('uuid');
var assign = require('object-assign');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(express.static(__dirname+'/'));


app.get('/api/todos', function (req, res){
  if(req.query.filter){
    switch(req.query.filter){
      case "yes":
        res.send( db('todos').chain().where({done: 'yes'}).value() );
        break;
      case "notdone":
        res.send( db('todos').chain().where({done: ''}).value() );
        break;
      default:
        res.send( db('todos') );
    }
  }
  res.send(db('todos'));
});

app.get('/', function(req, res){
  res.sendFile('../index.html');
});

app.post('/api/todos', function(req, res){
  var item = req.body.item;
  db('todos').push(assign({id: uuid()}, item));
  res.send('ok');
});

app.post('/api/todos/:id', function(req, res){
  var id = req.params.id;
  var updatedItem = req.body.updatedItem;
  var item = db('todos').chain().find({id: id}).assign(updatedItem).value();
  res.send(updatedItem);

});

app.delete('/api/todos/:id', function(req, res){
  var id = req.params.id;
  db('todos').remove({id: id});
  res.send('ok');
});

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Todolist app listening at http://%s:%s', host, port);
});
