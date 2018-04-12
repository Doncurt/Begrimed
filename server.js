// Make an instace of the  express opject avalilube
const express= require('express');
// make a vairbale call appl that will handle all of the servers side express MUST BE AT THE TOP TO WORK
// make an instance of moongoose as an object
const mongoose= require('mongoose')
// usese mongooses .connect method to
mongoose.connect('mongodb://localhost/rotten').catch(function (err) {
    console.log('Unable to connect to the mongodb instance. Error: ', err);
});
const bodyParser= require('body-parser')
const app = express();
// Using body parse to be able to parse the post requests from forms such as the songs and the comments
app.use(bodyParser.urlencoded({ extended: true }));
const handlebars = require('express-handlebars')
// set the templating engine as well as tell it where the main layout file( TO BE DISPLAYED ON EVERYPAGE) is located
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
// set the extension it will ises as . hanblebars
app.set('view engine', 'handlebars');


//HOME ROUTE

//Songs ROUTE
//create a song model with moongoose
const Song = mongoose.model('Song',{
  //the title schema will be a string
  title:String,
  // the artist schema will be a string
  artist:String,
  // orgin lyrics will be a string
  origLyr:String,
  // the stranslation chema will be a string
  trans:String
});
app.get('/', function(req,res){
  // single there's no parameter pased in it will return all of the songs in the database
  Song.find().then((songs) => {
    // render the page with the songs
    res.render('songs.handlebars',{songs})
    // otherwise try to catch the error and console log it
}).catch((err)=>{
   console.log(err);
})
})

// a route to add new Songs
app.get('/songs/new',function(req,res){
  res.render('songs-new.handlebars')
})

// CREATE The post method is always used to create or sometimes update a new route
app.post('/songs', (req, res) => {
  // takes the model 'Song' and becuase it is a mongoose model it can have the creat method to add to the Database by grabbing the req.body
  Song.create(req.body).then((song) =>{
    //the (song) is now a mongoose object and has an ID number(useful for later)
    console.log(song) // this will console log the mongoos object
    res.redirect('/') // redirects to the home page where the rest fo the reviews are being pullled from the model
  }).catch((err)=>{
    console.log(err.message)
  })

})
app.get('/songs/:id', (req,res) =>{
  res.send('A single Song')
})
// give it a port to listen on
app.listen(3000, function(){
  console.log('Alive on 3000 hoe')
})
