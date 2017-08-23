const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const Cards = require('./models/cards.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/magic');
const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

  app.engine('mustache', mustacheExpress());
  app.set('views', './views');
  app.set('view engine', 'mustache')


  app.get('/', function(req, res) {
    Cards.find()
    .then(function(cards){res.render('cardsdisplayindex', {myCards:cards})})
})

app.post('/', function(req,res){
  const newName = req.body.cardName;
  const newMultiId = req.body.cardMultiId;
  const newSetName = req.body._set;
  const newColorId = req.body.colorId;
  const card = new Cards({name: newName, multiverseid:newMultiId, _set:newSetName, colorId:newColorId});
  card.save()
  .then(function () {
    return Cards.find()
    }).then(function(cards){
    res.render('cardsdisplayindex', {myCards:cards})
  }).catch(function (error, cards) {
    console.log('error ' + JSON.stringify(error));
    res.redirect('/')
  })
})

app.post('/:id', function(req,res){
  
})
// const recipe = new Recipe({name: name, source: "Grandma"});
// recipe.save()
//   .then(function () {
//     console.log('saved ' + name);
//     return Recipe.findOne({name: "Pancakes" + suffix})
//   }).then(function(results) {
//     console.log('\nfindOne returned\n' + results);
//     return Recipe.find({cookTime: {$gt: 15, $lt: 60}})
//   }).then(function (results) {
//     console.log('\n\nfind returned ' + results.length + ' results');
//   }).catch(function (error) {
//     console.log('error ' + JSON.stringify(error));
//   })

  app.listen(3000, function() {
    console.log('successfully started Express Application');
  })

  process.on('SIGINT', function() {
    console.log("\nshutting down");
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected on app termination');
      process.exit(0);
    });
  });
