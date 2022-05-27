let express = require('express');
// let mongodb = require('mongodb').MongoClient;
// destructuring - desconstruindo, em vez de usar código acima, vamos desconstruir pra usar somente os pacotes/objetos que queremos do mongodb, ñ queremos usar o próprio pacote mongodb, queremos oq tem dentro dele.
let {MongoClient} = require('mongodb'); // nome da variável é o próprio nome do pacote

let app = express();
let db

async function go(){
    // nova instancia
  let client = new MongoClient('mongodb+srv://admin:admin@cluster0.6arhq.mongodb.net/TodoApp?retryWrites=true&w=majority'); // no mongodb nuvem clicar em connect no seu cluster > connect to app > modificar a string adicionando sua senha e nome do banco de dados antes do ?
  await client.connect(); //conectar no bd
  // problema do código acima, temos que esperar ele ser concluído para as linhas abaixo serem executas, o programa para aqui. Ñ sabemos qnt tempo vai demorar. 
  // Solução é usar await mas await só funciona em ansync functions no JS
  db = client.db(); // torna nosso bd disponível
  // qdo nossa aplicação realmente for rodar e for referenciar o db vai estar apontando para o bd
  app.listen(3000, '0.0.0.0', function() {
      console.log('Listening to port:  ' + 3000);
      });
  
  }
go();

// dizer ao express para adicionar todos valores de formulários no objeto body e adicionar esse objeto body no objeto request(req), por padrão o express ñ faz isso
app.use(express.urlencoded({extended:false}));

// se receber uma requisição get para a página home
app.get("/", function(req, res){
   res.send(`
   <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple To-Do App!!!</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h1 class="display-4 text-center py-1">To-Do App!!!</h1>
    
    <div class="jumbotron p-3 shadow-sm">
      <form action="/create-item" method="POST">
        <div class="d-flex align-items-center">
          <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
          <button class="btn btn-primary">Add New Item</button>
        </div>
      </form>
    </div>
    
    <ul class="list-group pb-5">
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #1</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #2</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #3</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
    </ul>
    
  </div>
</body>
</html>
   `);
});

// qdo o brownser enviar um post request para esta url 
app.post('/create-item', function(req, res){

  // criar um documento no banco de dados MONGODB
  // o método collection vai selecionar uma coleção chamada items no banco de dados, insertOne serve pra criar um documento/objeto no bd
  db.collection('items').insertOne({text: req.body.item}, function(){
    res.send("<p>Thanks for submitting the form.</p>")
  })  
  // console.log(req.body.item); // pegar dado que está no input do formulário
});

