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

