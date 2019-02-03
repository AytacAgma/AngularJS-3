(function () {
    'use strict';

    var shoppingList = [
        {
            name: "Milk",
            quantity: "34"
        },
        {
            name: "Donuts",
            quantity: "65"
        },
        {
            name: "Cookies",
            quantity: "25"
        },
        {
            name: "Chocolate",
            quantity: "54"
        },
        {
            name: "Drink",
            quantity: "10"
        }
    ];

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var tobuy = this;

        tobuy.itemName = "";
        tobuy.itemQuantity = "";
        tobuy.items = ShoppingListCheckOffService.getItemsToBuy();

        tobuy.addItem = function () {
            ShoppingListCheckOffService.addItemToBuy(tobuy.itemName, tobuy.itemQuantity);
        };

        tobuy.removeItem = function (itemIdex) {
            ShoppingListCheckOffService.removeItemToBuy(itemIndex);
        };

        tobuy.buyToBought = function (itemIndex) {
            ShoppingListCheckOffService.addItemAlreadyBought(tobuy.items[itemIndex].name, tobuy.items[itemIndex].quantity);
            ShoppingListCheckOffService.removeItemToBuy(itemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadybought = this;

        alreadybought.items = ShoppingListCheckOffService.getItemsAlreadyBought();
        alreadybought.itemName = "";
        alreadybought.itemQuantity = "";
        alreadybought.addItem = function () {
            ShoppingListCheckOffService.addItemAlreadyBought(alreadybought.itemName, alreadybought.itemQuantity);
        };

        alreadybought.removeItem = function (itemIdex) {
            ShoppingListCheckOffService.removeItemAlreadyBought(itemIndex);
        };
    }


    function ShoppingListCheckOffService() {
        var service = this;

        // List of items to buy
        var itemsToBuy = shoppingList;

        // List of items already bought
        var itemsAlreadyBought = []

        service.addItemToBuy = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            itemsToBuy.push(item);
        };

        service.addItemAlreadyBought = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            itemsAlreadyBought.push(item);
        };

        service.removeItemToBuy = function (itemIdex) {
            itemsToBuy.splice(itemIdex, 1);
        };

        service.removeItemAlreadyBought = function (itemIdex) {
            itemsAlreadyBought.splice(itemIdex, 1);
        };

        service.getItemsToBuy = function () {
            return itemsToBuy;
        };

        service.getItemsAlreadyBought = function () {
            return itemsAlreadyBought;
        }

    }

})();