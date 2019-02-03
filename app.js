(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController ', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var nidCtrl = this;

        nidCtrl.found = "";

        nidCtrl.found = function () {
            MenuSearchService.getMatchedMenuItems(nidCtrl.searchTerm);
        };
    }

    function MenuSearchService() {
        var service = this;

        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            return $http('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
                // process result and only keep items that match
                foundItems.push(result);

                // return processed items
                return foundItems;
            });
        };

        service.removefoundItems = function (itemIdex) {
            foundItems.splice(itemIdex, 1);
        };

        service.getfoundItems = function () {
            return foundItems;
        };
    }

})();