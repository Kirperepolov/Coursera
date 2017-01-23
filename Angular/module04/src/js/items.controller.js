(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController',ItemsController);

  ItemsController.$inject=['MenuData','items'];
  function ItemsController(MenuData,items){
    let itemsCtrl = this;
    itemsCtrl.items = items.menu_items;
    itemsCtrl.category = items.category;
  };
}());
