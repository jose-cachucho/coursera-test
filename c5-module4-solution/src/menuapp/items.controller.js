(function() {
  'use strict'

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['MenuDataService', 'items'];

  function ItemsController(MenuDataService, items) {
    var mainItems = this;
    mainItems.items = items.menu_items;
    mainItems.category = items.category;
  }
})();
