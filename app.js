(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController ', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    FoundItems.$inject = ['NarrowItDownController', 'MenuSearchService'];
    function FoundItems(NarrowItDownController, MenuSearchService) {
        var ddo = {
            scope: {
                foundItems: '<',
                removeFoundItemzs: '&onRemove'
            },
            controller: FoundItemsController,
            bindToController: true,
            controllerAs: 'dirCtrl',
            templateUrl: 'founditems.html'
        };

        return ddo;
    }

    ControllerFunction.$inject = ['MenuSearchService'];
    function ControllerFunction(MenuSearchService) {
        var dirCtrl = this;

        dirCtrl.removeFoundItemz = function () {
            dirCtrl.foundItems = MenuSearchService.removeFoundItems($index);
        };
    }




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
            return $http({
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                // process result and only keep items that match
                foundItems.push(result);

                // return processed items
                return foundItems;
            });
        };

        service.removeFoundItems = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        };

        service.getFoundItems = function () {
            return foundItems;
        };
    }

})();