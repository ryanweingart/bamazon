var mysql = require("mysql");
var inquirer = require("inquirer");
var log = console.log;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ryan0913rmw89",
    database: "bamazon"
})

connection.connect(function(error) {
    if (error) throw error;
    log("Connection Successful!")

    table();
})

function table() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            log("Item #" + res[i].item_id + "\n" + 
                "Product: " + res[i].product_name + "\n" + 
                "Department: " + res[i].department_name + "\n" + 
                "Price: $" + res[i].price + "\n" + 
                "Quantity Available: " + res[i].stock_quantity + "\n");
        }
        customer(res);
    })
}

function customer(res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "Which item would you like to buy? [Type EXIT to leave the app]"
    }]).then(function(answer) {
        var correct = false;
        if (answer.choice.toUpperCase() === "EXIT") {
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;

                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer) {
                    if ((res[id].stock_quantity - answer.quantity) > 0) {
                        connection.query("UPDATE products SET stock_quantity='" + (res[id].stock_quantity - answer.quantity) + "' WHERE product_name='" + product + "'", function(err,res2) {
                            log("You have purchased the product!");
                            table();
                        })
                    } else {
                        log("Not enough in stock!");
                        customer();
                    }
                })
            }
        }
        if ( i === res.length && correct === false) {
            log("Your request has not been processed; please try again");
            customer(res);
        }
    })
}
