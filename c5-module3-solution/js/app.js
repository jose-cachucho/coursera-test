(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'menuTemplate.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController(){
    var list = this;    
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.getItems = function(){
      var promise =  MenuSearchService.getMatchedMenuItems(menu.searchString);
      promise.then(function(response){
        menu.found = response;
      });
    };

    menu.removeItem = function (itemIndex) {
      menu.found.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
       return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(result){
        var foundItems = [];
        if(searchTerm && searchTerm.trim().length > 0){
          //searchTerm provided, find corresponding menu items
          for(var i = 0; i < result.data.menu_items.length; i++){
            if(result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) !== -1){
              foundItems.push(result.data.menu_items[i]);
            }
          }
        }
        //searchTerm not provided, return empty array
        return foundItems;
      });
    };
  }
})();
