(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject=['MenuData','categories'];
  function CategoriesController(MenuData,categories){
    let catCtrl = this;
    catCtrl.categories = categories;
  };
}());
