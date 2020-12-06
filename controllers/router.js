var express = require("express");
var path = require("path");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
// var cat = require("../models/cat.js");
var apiCall = require("../api/apiCallTest");
const API = require("../api/apiServices");
const api = new API;

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // cat.all(function(data) {
  //   var hbsObject = {
  //     cats: data
  //   };
    // console.log(hbsObject);
    res.render("index");
  // });
});

router.get("/top5", function(req, res) {
  // var top5Drinks = {};
  // console.log("route top 5");
  // console.log(res);
  console.log("FUCK FACE FUCK FACE FUCK FACE");
  apiCall.getTop5().then(function(drinks) {
    // console.log(top5Drinks);
    res.render("index", {top5Drinks: drinks});
  })


  // apiCall.getTop5().then(function(drinksObj) {
  //   top5Drinks = drinksObj;
  //   // console.log(top5);
  //   api.top5Drinks(top5Drinks).then(function(response) {
  //     top5Drinks = response;
  //     res.render("index")
  //     // console.log(top5);
  //   });
  //   // console.log(drinksObj);
  //   // res.render("index", {top5});
  //   // return drinksObj = response;
  // });
  // console.log(drinksObj);

  // console.log(hello);

  // res.render("index", {top5: true});
  // console.log("YOOOOOO");
  // console.log(res);
  // console.log(api);
});

// router.get("/search", function(req, res) {
//   var searchResults = {};
//   apiCall.searchDrinkName().then(function(response) {
//     searchResults = response;
//     console.log(response);
    

//     res.render("index", {searchResults});
//   });
// });

// router.post("/api/cats", function(req, res) {
//   cat.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   cat.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

router.get("/api/find/:searchParameter", function(req, res){
  // console.log(req.params.searchParameter);
  // console.log(req.body.searchParameters);
  // console.log(req.query.searchInput);
  var ingredientName = req.params.searchParameter;
  var searchResults = {};
  apiCall.searchIngredientName(ingredientName).then(function(response) {
    searchResults = response;
    // console.log(searchResults.ingredients[0].strIngredient);
    // console.log({searchResults: response});
    // console.log(response)
    // console.log(response);
    console.log({searchResults});
    console.log(searchResults)

    res.render("index", {searchResults});
  });
  });

  router.get("/api/filter/:filterKeyword", function(req, res) {
    // console.log(req.params.filterKeyword);
    var ingredientName = req.params.filterKeyword;
    // console.log("what you actually looking for")
    // console.log(ingredientName);
    var searchByIngredient = {};
    apiCall.filterByIngredient(ingredientName).then(function(response) {
      // console.log("What You're looking for");
      // console.log(response.drinks);
      searchByIngredient = response;
      console.log(searchByIngredient);
      res.render("index", {searchByIngredient});
    });
  });
  

// Export routes for server.js to use.
module.exports = router;



