var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
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

    inquirer.prompt({
        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to purchase something from our store?",
        default: true
    }).then(function(answer) {
        if (answer.confirm) {
            table();
        } else {
            log("\nThank you for stopping by!\n")
            process.exit();
        }
    })
    })

function table() {
    var table = new Table({
        head: ["Item #", "Product", "Department", "Price", "Quantity"],
        colWidths: [10, 30, 15, 10, 10]
    });

    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }

        log(table.toString());
        customer(res);
    })
}

function customer(res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "Which item would you like to buy? [Type 'exit' to leave the app]"
    }]).then(function(answer) {
        var correct = false;
        if (answer.choice === "exit") {
            log("\nThank you for stopping by!\n");
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name.toLowerCase() === answer.choice) {
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
                            log("\nYou have purchased " + answer.quantity + " " + product + "(s). \n" +
                            "Your total for your purchase is $" + (answer.quantity * res[id].price).toFixed(2) + ".\n");

                            inquirer.prompt({
                                type: "confirm",
                                name: "confirm",
                                message: "Would you like to purchase another item?",
                                default: true
                            }).then(function(answer) {
                                if (answer.confirm) {
                                    table();
                                } else {
                                    log("\nThank you for stopping by!\n")
                                    process.exit();
                                }
                            })
                        })
                    } else {
                        log("\nNot enough in stock! There is/are only " + res[id].stock_quantity + " " + product + "(s) available, please try again.\n");
                        customer(res);
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
