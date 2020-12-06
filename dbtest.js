const connection = require("./config/config.json");

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
}

module.exports = DB;