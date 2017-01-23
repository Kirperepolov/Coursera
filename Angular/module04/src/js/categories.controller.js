(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject=['categories'];
  function CategoriesController(categories){
    let catCtrl = this;
    catCtrl.categories = categories;
  };
}());
