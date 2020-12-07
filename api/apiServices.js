class API {
    top5Drinks(response) {
        var drinksTable = response.drinks;
          var drinks = [];
          var drinkNames = [];
          for(var i = 0; i < 5; i++) {
              var drinkObj = {
                  drinkId: drinksTable[i].idDrink,
                  drinkName: drinksTable[i].strDrink
              }
              drinkNames.push(drinksTable[i].strDrink);
              drinks.push(drinkObj);
          }
          console.log("Top 5 Drinks");
          console.log("-------------");
          var counter = 0;
          drinkNames.forEach(function(drink) {
            counter++;
            console.log(counter + ") " + drink);
          });
          return drinkNames;
      
    }
}

module.exports = API;