// Make an instace of the  express opject avalilube
const express= require('express');
// make a vairbale call appl that will handle all of the servers side express MUST BE AT THE TOP TO WORK
// make an instance of moongoose as an object
const mongoose= require('mongoose')
// usese mongooses .connect method to
mongoose.connect('mongodb://localhost/rotten').catch(function (err) {
    console.log('Unable to connect to the mongodb instance. Error: ', err);
});
const bodyParser = require('body-parser');
const methodOverride =require('method-override');
const app = express();
// Using body parse to be able to parse the post requests from forms such as the songs and the comments
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
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

//SHOW ALL POSTS
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
//NEW POST
// a route to add new Songs
app.get('/songs/new',function(req,res){
  res.render('songs-new.handlebars')
})

// CREATE
//The post method is always used to create or sometimes update a new route
app.post('/songs', (req, res) => {
  // takes the model 'Song' and becuase it is a mongoose model it can have the creat method to add to the Database by grabbing the req.body
  Song.create(req.body).then((song) =>{
    //the (song) is now a mongoose object and has an ID number(useful for later)
    console.log(song) // this will console log the mongoos object
    res.redirect('/songs/'+ song._id) // redirects to the page where the info is pullled from the model by
  }).catch((err)=>{
    console.log(err.message)
  })

})
//SHOW
// this route  based on the id will show all of the  information on a singe song sby its ID
app.get('/songs/:id', (req,res) =>{
  // based on what parameter is sent( based on the link thats clicked fomr the previus page) it gramces the id and uses that to grab the song from the database
  Song.findById(req.params.id).then((song) => {
    // renders the page with the info from the song that was grabbed
    res.render('song-show',{song})
  }).catch((err)=>{
    console.log(err.message)
  })
})

// EDIT
//finds the song by its ID
app.get('/songs/:id/edit', function (req, res) {
  // searches the model  via it being a mongoose object. uses the findById function and searches it base d on the params
  Song.findById(req.params.id, function(err, song) {
    // renders the template song edit with the information based on the song ID in the params
    res.render('songs-edit', {song});
  })
})

// UPDATE
// this uses method override due to html forms not being able to handle the put methods
app.put('/songs/:id', (req, res) => {
  //searches the database based on the param id and takes that information and replaces it in the data base with rew.body
  Song.findByIdAndUpdate(req.params.id, req.body).then((song) => {
    /// redirects to the page with the song to she the new updates
    res.redirect('/songs/' + song._id)
  }).catch((err) => {
    console.log(err.message)
  })
})

//DELETE
//searches the database and findes the song bases on the link that was clicked(parames) it then takes the body, removes it and redirects to the home page
app.delete('/songs/:id',(req,res) =>{
  Song.findByIdAndRemove(req.params.id, req.body).then((song) =>{
    res.redirect('/')
  }).catch((err)=>{
    console.log(err.message)
  })

})
// give it a port to listen on
app.listen(3000, function(){
  console.log('Alive on 3000 hoe')
})
