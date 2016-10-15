(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    toBuyList.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();    

  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Cookies",
        quantity: "400"
      },
      {
        name: "Donuts",
        quantity: "100"
      },
      {
        name: "Chocolate",
        quantity: "10"
      },
      {
        name: "Coffee",
        quantity: "20"
      }
    ];
    var boughtItems = [];

    service.getToBuyItems = function() {
      return toBuyItems;
    };
    service.getBoughtItems = function() {
      return boughtItems;
    }
    service.buyItem = function(itemIndex) {
      boughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    };
  }

})();
