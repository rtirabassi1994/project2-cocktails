var express = require("express");
var path = require("path");
var router = express.Router();
var apiCall = require("../api/apiCallTest");
const API = require("../api/apiServices");
const api = new API;

router.get("/", function(req, res) {
  apiCall.featuredDrinks().then(function(featuredDrinks) {
    // console.log(featuredDrinks);
    // console.log("THIS THAT SHIT YOU LOOKING FOR!!!!!!!");
    res.status(200).render("index", {featuredDrinks});
  });
  // cat.all(function(data) {
  //   var hbsObject = {
  //     cats: data
  //   };
    // console.log(hbsObject);
  // });
});

router.get("/top5", function(req, res) {
  console.log("-------");
  apiCall.getTop5().then(function(drinks) {
    res.render("index", {top5Drinks: drinks});
  })
});

  router.get("/api/ingredients/:filterKeyword", function(req, res) {
    var ingredientName = req.params.filterKeyword;
    apiCall.filterByIngredient(ingredientName).then(function(drinks) {
      // scary merge
      res.status(200).render("index", {searchByIngredient: drinks});
    });
  });
  router.get("/api/cocktails/:filterKeyword", function(req, res) {
    var drinkName = req.params.filterKeyword;
    var searchByDrinkName = {};
    apiCall.filterByDrinkName(drinkName).then(function(drink) {
      searchByDrinkName = drink;
      // console.log(searchByDrinkName);
      // have raman look
      res.status(200).render("index", {searchByDrinkName});
    });
  });
  router.get("/api/shots/:filterKeyword", function(req, res) {
    var ingredientName = req.params.filterKeyword;
    var searchByIngredient = {};
    apiCall.filterByIngredient(ingredientName).then(function(response) {
      searchByIngredient = response;
      console.log(searchByIngredient);
      res.status(200).render("index", {searchByIngredient});
    });
  });
  router.get("/api/punch_partyDrink/:filterKeyword", function(req, res) {
    var ingredientName = req.params.filterKeyword;
    var searchByIngredient = {};
    apiCall.filterByIngredient(ingredientName).then(function(response) {
      searchByIngredient = response;
      console.log(searchByIngredient);
      res.render("index", {searchByIngredient});
    });
  });

  // i added all of this
  router.post("/api/drinks/create", function(req, res) {
    // console.log(req.query.drinkId);
    var drinkId = req.body.drinkId;
    apiCall.filterByDrinkId(drinkId).then(function(drinkObj) {
      console.log("LOOK OVER HERE ASS FACE!!!!!!!!!");
      // console.log(drinkObj);
      db.saveDrink(drinkObj).then(function() {
        // res.status(200).redirect("/api/savedDrinks");
        res.status(200).render("");
      });
    });

  });

  router.get("/db/savedDrinks",function(req, res) {
    // var savedDrinkDetails = [];
    db.showSaved()
    .then(function(drinkIds) {
      // return new Promise(function(resolve, reject) {
        return new Promise(function(resolve, reject) {
          drinkIds.map((id) => {
            resolve(apiCall.filterByDrinkId(id));
          })
        });
        // drinkIds.map((id) => {
        //   return new Promise(function(resolve,reject) {
        //     resolve(apiCall.filterByDrinkId(id));
        //   });
        // }));
        // return savedDrinkDetails = drinkIds.map((id) => {
        //   apiCall.filterByDrinkId(id).then(function(response) {
        //     savedDrinkDetails.push(response);
        //   });
        // });
        // console.log(savedDrinkDetails);

        // for(var i = 0; i < drinkIds.length; i++) {
        //   apiCall.filterByDrinkId(drinkIds[i]).then(function(response) {
        //     savedDrinkDetails.push(response);
        //     return savedDrinkDetails;
        //     // console.log(response);
        //     // console.log("What you're looking for!!!!!!!!!!!!!!!")
        //   });
        //   // .then(function(savedDrinks) {
        //   //   // console.log(savedDrinkDetails);
        //   //   console.log(savedDrinkDetails[0])
        //   //   console.log("THIS IS IT")
        //   //   return savedDrinks;
        //   //   // res.render("index", {savedDrinkDetails});
        //   //   // console.log(response);
        //   //   // console.log(savedDrinkDetails);
        //   // });
        // }
        // return savedDrinkDetails;
      // });
      // .then(function(response) {
      //   console.log(response);
      // });

      // return savedDrinkDetails;
      // console.log(savedDrinkDetails);
      // return hello
      // console.log(savedDrinkDetails);
      // return savedDrinkDetails;
      // apiCall.filterByDrinkId()
    }).then(function(response) {
      console.log(response);
    });
    // .then(function(response) {
    //   console.log(response);
    // });
  });

module.exports = router;