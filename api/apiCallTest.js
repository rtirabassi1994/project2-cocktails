const inquirer = require("inquirer");
// const connection = require("./config/connection");
// const DB = require("./test");
const API = require("./apiServices");
const api = new API;
// const db = new DB;
var axios = require("axios").default;
var response;
var drinksTable;
var searchTable;

async function getTop5() {
  var options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/popular.php',
    headers: {
      'x-rapidapi-key': '1fb5bf74ddmsh5f6ba0a2a786e4bp19be3ejsn84732bde066a',
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
  };

  return await axios.request(options).then(function(results){
    return api.top5Drinks(results.data)
  })
  
  // await axios.request(options).then((response) => {
  //   return drinksTable = response.data;
  // });
  // return drinksTable;
}

async function searchIngredientName(ingredientName) {

  var options = {
  method: 'GET',
  url: 'https://the-cocktail-db.p.rapidapi.com/search.php',
  params: {i: ingredientName},
  headers: {
    'x-rapidapi-key': '1fb5bf74ddmsh5f6ba0a2a786e4bp19be3ejsn84732bde066a',
    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
  }
  };

  await axios.request(options).then(function (response) {
  return searchTable = response.data;
  });
  return searchTable;
  }

  async function filterByIngredient(ingredientName) {

    var options = {
      method: 'GET',
      url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
      params: {i: ingredientName},
      headers: {
        'x-rapidapi-key': '1fb5bf74ddmsh5f6ba0a2a786e4bp19be3ejsn84732bde066a',
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
      }
    };

    await axios.request(options).then(function (response) {
      // console.log(response.data.drinks);
      return searchTable = response.data.drinks;
    });
    return searchTable;
  }
  // filterByIngredient();


  
  function like(response) {
      var drinksTable = response.data.drinks;
      var drinks = [];
      var drinkNames = [];
      for(var i = 0; i < drinksTable.length; i++) {
          var drinkObj = {
              drinkId: drinksTable[i].idDrink,
              drinkName: drinksTable[i].strDrink
          }
          drinkNames.push(drinksTable[i].strDrink);
          drinks.push(drinkObj);
      }
      questions.likedDrinks[0].choices = drinkNames;
  
      inquirer.prompt(questions.likedDrinks).then(function(answer) {
        console.log(answer);
        db.getByName(answer.likeDrink);
      });
  }
  
module.exports = {getTop5, searchIngredientName, filterByIngredient};
