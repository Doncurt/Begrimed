// Make an instace of the  express opject avalilube
const express= require('express');
// make a vairbale call appl that will handle all of the servers side express MUST BE AT THE TOP TO WORK
const app = express();

const handlebars = require('express-handlebars')
// set the templating engine as well as tell it where the main layout file( TO BE DISPLAYED ON EVERYPAGE) is located
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
// set the extension it will ises as . hanblebars
app.set('view engine', 'handlebars');



app.get('/', function(req,res){
  res.render('home')
})

// give it a port to listen on
app.listen(3000, function(){
  console.log('Alive on 3000 hoe')
})
