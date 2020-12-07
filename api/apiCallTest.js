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
  async function filterByDrinkName(drinkName) {
    // var axios = require("axios").default;
var options = {
  method: 'GET',
  url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
  params: {s: drinkName},
  headers: {
    'x-rapidapi-key': '2fd9fe7e66msh451a62629ec6d5cp148f77jsnc954c105156a',
    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
  }
};

await axios.request(options).then(function (response) {
  // console.log(response.data.drinks);
  return drinksTable = response.data.drinks;
});
return drinksTable;
}

// commented out
async function featuredDrinks() {
  // var axios = require("axios").default;
  var options = {
    method: 'GET',
    url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    headers: {
      'x-rapidapi-key': '2fd9fe7e66msh451a62629ec6d5cp148f77jsnc954c105156a',
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
  };
  var featuredDrinksArray = [];
  for(var i = 0; i < 5; i++) {
    await axios.request(options).then(function (response) {
      // console.log(response.data.drinks);
      // console.log(response.data.drinks[0]);
      featuredDrinksArray.push(response.data.drinks[0]);
      console.log(featuredDrinksArray);
    });
  }
  return featuredDrinksArray;
}
// featuredDrinks();
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

  async function filterByDrinkId(drinkId) {

    var options = {
      method: 'GET',
      url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
      params: {i: drinkId},
      headers: {
        'x-rapidapi-key': '1fb5bf74ddmsh5f6ba0a2a786e4bp19be3ejsn84732bde066a',
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
      }
    };
    var drinks = [];
    var ingredientDetails = {
      ingredients: [],
      measurements: []

    };
    var drinkDetails = {};

    await axios.request(options).then(function (response) {
      // console.log(response.data);
      // var ingredients = [];
      // console.log(response.data.drinks[0]);
      console.log("SHIT FACE HAMSTER")
      for(var i = 0; i < response.length; i++) {

      var drinkObj = response.data.drinks[0];

      drinkDetails.id = drinkObj.idDrink;
      drinkDetails.name = drinkObj.strDrink,
      drinkDetails.instructions = drinkObj.strInstructions;
      drinkDetails.image = drinkObj.strDrinkThumb;

      for(var propt in drinkObj) {
        // console.log(propt);
        // console.log("this is the property")
        // console.log(propt)
        if(propt.includes("strIngredient")){

          if(drinkObj[propt]) {
            // console.log("+++++++++++++++++++++++++++++++")
            // console.log(drinkObj[propt]);
            // console.log(propt+':'+drinkObj[propt]);
            ingredientDetails.ingredients.push(drinkObj[propt]);
            // ingredientDetails.measurements.push(drinkObj[propt]);
          }
        }
        else if(propt.includes("strMeasure")){
          // console.log("---------------------")
          if(drinkObj[propt]) {
            // console.log("=================================");
            // console.log(drinkObj[propt]);
            // console.log(propt+':'+drinkObj[propt]);
            ingredientDetails.measurements.push(drinkObj[propt]);
            // ingredientDetails.measurements.push(drinkObj[propt]);
          }
        }
        // console.log(ingredientDetails)
        drinkDetails.ingredients = ingredientDetails;
        drinks.push(drinkDetails);
      }
    }
      // drinkDetails.ingredients = ingredientDetails;



      // console.log(drinkDetails);
      // return drinkDetails;
      // console.log(drinkObj);
      //     return array;
      //   }

      // }
      // console.log("DRINK INGREDIENTS")
      // console.log(drinkDetails.ingredients);
    });
    // console.log("=======================================++++++++++++++++++++++++++++")
    // console.log(drinkDetails);
    return drinkDetails;
    // return drinkDetails;
  }


  // filterByDrinkId();



  module.exports = {getTop5, searchIngredientName, filterByIngredient, filterByDrinkName, featuredDrinks};