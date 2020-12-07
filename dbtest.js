// const connection = require("./config/config.json");

// class DB {
//     getByName(likedDrink) {
//         const query = "SELECT * FROM cocktails WHERE drinkName = ?;";
//         connection.query(query,[likedDrink], (err, results) => {
//             if(err) throw err;
//             else {
//                 if(results.length <= 0) {
//                     console.log("No such drink in database");
//                 }
//                 else {
//                     this.addLike(results);
//                     results[0].numOfLikes += 1;
//                     // console.log(results);
//                 }
//             }
//         });
//     }

//     addLike(drinkRow) {
//         const query = "UPDATE cocktails SET numOfLikes = ? WHERE id = ?;";
//         drinkRow[0].numOfLikes += 1;
//         console.log(drinkRow);
//         connection.query(query, [drinkRow[0].numOfLikes, drinkRow[0].id], (err, results) => {
//             if(err) throw err;
//             else {
//                 console.log("Liked!");
//             }
//         });
//     }
// }

// module.exports = DB;

const connection = require("./config/connection");

class DB {
    getByName(likedDrink) {
        const query = "SELECT * FROM cocktails WHERE drinkName = ?;";
        connection.query(query,[likedDrink], (err, results) => {
            if(err) throw err;
            else {
                if(results.length <= 0) {
                    console.log("No such drink in database");
                }
                else {
                    this.addLike(results);
                    results[0].numOfLikes += 1;
                    // console.log(results);
                }
            }
        });
    }

    addLike(drinkRow) {
        const query = "UPDATE cocktails SET numOfLikes = ? WHERE id = ?;";
        drinkRow[0].numOfLikes += 1;
        console.log(drinkRow);
        connection.query(query, [drinkRow[0].numOfLikes, drinkRow[0].id], (err, results) => {
            if(err) throw err;
            else {
                console.log("Liked!");
            }
        });
    }

    async saveDrink(drinkObj) {
        console.log("THIS IS THE SAVE DRINK FUNCTIONS")
        // console.log(drinkObj);
        console.log(drinkObj.id)
        console.log(drinkObj.name);
        // console.log(drinkObj)
        const query = "INSERT INTO savedDrinks(drinkName, apiDrinkId) VALUES(?,?);";
        await connection.query(query,[drinkObj.name, drinkObj.id], function(err, results) {
            if(err) throw err;
            else {
                // console.log("THIS IS THE SQL RESULT")
                // console.log(results);
            }
            
        });
    }

    async showSaved() {
        return new Promise(function(resolve, reject) {
            var drinkIds;
            const query = "SELECT apiDrinkId FROM savedDrinks;";
            connection.query(query,function(err, result) {
                if(err) throw err;
                else {
                    if(result) {
                        drinkIds = result.map((ids) => ids.apiDrinkId);
                        resolve(drinkIds);
                    }
                    // console.log(drinkIds);
                    // return drinkIds;
                }
                console.log(drinkIds);
            });
        }).then(function(response) {
            // console.log(response);
            return response;
        }).catch(function(err) {
            console.log(err);
        });

    }


}

module.exports = DB;