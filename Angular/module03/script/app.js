(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',foundItemsDirective);
  //
  function foundItemsDirective(){
    var ddo = {
      // template: '{{ctrl.searchItem}}'
      templateUrl: 'foundItems.html',
      scope: {
        items: '=foundItems'
        // myTitle: '@title',
        // onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'ctrl',
      bindToController: true,
      restrict:'E'
      //     // link: ShoppingListDirectiveLink,
      // transclude: true
    };

    return ddo;
  };
  //
  //
  // /**
  // * NarrowItDownController - description
  // *
  // * @param  {type} MenuSearchService description
  // * @return {type}                   description
  // */
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    ctrl.found = MenuSearchService.getFoundItems();
    ctrl.searchItem="";


    ctrl.find = function(searchItem){
      MenuSearchService.getMatchedMenuItems(searchItem);
      // ctrl.found = MenuSearchService.foundItems;
    };

    ctrl.removeItem = function(itemIndex){
      MenuSearchService.removeItem(itemIndex);
    };

  };

  //
  // /**
  // * MenuSearchService - description
  // *
  // * @param  {type} $http description
  // * @return {type}       description
  // */
  //
  //
  //
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var service = this;

    var foundItems = [];
    service.getMatchedMenuItems = function(searchTerm){
      let path = 'https://davids-restaurant.herokuapp.com/menu_items.json'

      return $http.get(path)
      .then(function (result) {
        // process result and only keep items that match
        let menu = result.data.menu_items;
        searchTerm = searchTerm.toLowerCase();
        // let foundItems = [];

        for (let i=0;i<menu.length;i++){
          if (menu[i].description.toLowerCase().indexOf(searchTerm)!==-1){
            foundItems.push(menu[i]);
          }
        }
        //
        // return processed items
        return foundItems;
      })
      .catch(error=>error.message);
    };

    service.removeItem = function (itemIndex) {
      service.foundItems.splice(itemIndex, 1);
    };

    service.getFoundItems = function(){
      return foundItems;
    };
  };
  //

}());
