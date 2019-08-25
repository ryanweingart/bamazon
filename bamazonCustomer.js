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
        message: "Which item would you like to buy? Please use the Item #"
    }]).then(function(answer) {
        var correct = false;
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id === answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;

                
            }
        }
    })
}
