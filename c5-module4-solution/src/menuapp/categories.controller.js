(function() {
  'use strict'
  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['MenuDataService', 'items'];
  function CategoriesController(MenuDataService, items) {
    var mainCategories = this;
    mainCategories.items = items;    
  }
})();
