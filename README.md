# bamazon

### Welcome to bamazon!

Bamazon is a storefront app that uses **MySQL** and **Node.js**.

When the app is started, it asks the user if they would like to purchase something from the store, and the user has the option to type "y" for yes and "n" for no.

![Opening Message](https://github.com/ryanweingart/bamazon/blob/master/Images/Opening%20Message.png)

If the user selects no, they are given a message that thanks them for stopping by.

![Answer No](https://github.com/ryanweingart/bamazon/blob/master/Images/Answer%20No.png)

If the user selects yes, they are presented with a table of items that are available for purchase. Each item contains the following:

* Item Number
* Product Name
* Department
* Price
* Quantity

![Original Table](https://github.com/ryanweingart/bamazon/blob/master/Images/Original%20Table.png)

The user is then asked which item they would like to buy, or they can choose to type the word "exit" if they would like to get out of the app, as shown below:

![Answer Exit](https://github.com/ryanweingart/bamazon/blob/master/Images/Answer%20Exit.png)

If the user enters an item, they are asked how many they would like to buy. After the user enters an amount, and there is enough of that item in stock, they are presented with the total for their purchase and asked if they would like to purchase another item.

![Total Purchase](https://github.com/ryanweingart/bamazon/blob/master/Images/Total%20Purchase.png)

If the user chooses no, they will be given the same message thanking them for stopping by. If they choose yes, they will be presented with the same table, but the amount of the purchased item will be subtracted from the total quantity and reflected in the new table.

![Updated Table](https://github.com/ryanweingart/bamazon/blob/master/Images/Updated%20Table.png)

If the user chooses to purchase an item, but then types an amount that is more than what is in stock, they are given a message that tells them there is not enough of that item in stock, as shown below:

![Not Enough Stock](https://github.com/ryanweingart/bamazon/blob/master/Images/Not%20Enough%20Stock.png)

