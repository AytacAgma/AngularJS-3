(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");




    function FoundItems() {
        var ddo = {
            scope: {
                items: '<',
                removeFoundItemsOn: '&onRemove'
            },
            controller: FoundItemsController,
            bindToController: true,
            controllerAs: 'dirCtrl',
            templateUrl: 'founditems.html'
        };

        return ddo;
    }

    FoundItemsController.$inject = ['MenuSearchService'];
    function FoundItemsController(MenuSearchService) {
        var dirCtrl = this;

        //dirCtrl.removeFoundItemz = function (index) {
        //    dirCtrl.foundItems = MenuSearchService.removeFoundItems(index);
        //};
    }





    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var nidCtrl = this;

        //nidCtrl.found = "Nothing Found.";

        nidCtrl.search = function () {
            MenuSearchService.clear();
            //nidCtrl.found = "Nothing Found.";
            if (nidCtrl.searchTerm !== "") {
                MenuSearchService.getMatchedMenuItems(nidCtrl.searchTerm)
                    .then(function (result) {
                        nidCtrl.found = result;
                    });
            }
        };

        nidCtrl.remove = function (itemIndex) {
            MenuSearchService.removeFoundItems(itemIndex);
        };
    }




    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                //method: "GET",
                url: ApiBasePath + "/menu_items.json"
            }).then(function (result) {
                var allItems = result.data.menu_items;
                for (var i = 0; i < allItems.length; i++)
                    if (allItems[i].description.toLowerCase().indexOf(searchTerm) !== -1)
                        // process result and only keep items that match
                        foundItems.push(allItems[i]);

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

        service.clear = function () {
            foundItems.splice(0, foundItems.length);
        };
    }

})();