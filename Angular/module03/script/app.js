(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .controller('FoundItemsDirectiveController',FoundItemsDirectiveController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',foundItemsDirective);
  //
  function foundItemsDirective(){
    var ddo = {
      // template: '{{ctrl.searchItem}}'
      templateUrl: 'foundItems.html',
      scope: {
        items: '<foundItems'
        // myTitle: '@title',
        // onRemove: '&'
      },
      // controller: 'FoundItemsDirectiveController as items',
      // bindToController: true,
      restrict:'E'
      //     // link: ShoppingListDirectiveLink,
      // transclude: true
    };

    return ddo;
  };

  function FoundItemsDirectiveController() {
  var scope = this;

  scope.nothingFound = function () {
    if (scope.items.found.length) {
      return true;
    }
    return false;
  };
}
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
    ctrl.found;

    ctrl.find = function(searchItem){
      var foundPromise = MenuSearchService.getMatchedMenuItems(searchItem);

      foundPromise.then(function(list){
                  ctrl.found=list;
                }).catch(error=>console.log(error.message));
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


    service.getMatchedMenuItems = function(searchTerm){
      let path = 'https://davids-restaurant.herokuapp.com/menu_items.json'
      service.foundItems = [];

      return $http.get(path)
              .then(function (result) {
                // process result and only keep items that match
                let menu = result.data.menu_items;
                searchTerm = searchTerm.toLowerCase();
                // let foundItems = [];

                for (let i=0;i<menu.length;i++){
                  if (menu[i].description.toLowerCase().indexOf(searchTerm)!==-1){
                    service.foundItems.push(menu[i]);
                  }
                }
                //
                // return processed items
                return service.foundItems;
              })
              .catch(error=>error.message);
    };

    service.removeItem = function (itemIndex) {
      service.foundItems.splice(itemIndex, 1);
    };

    service.getFoundItems = function(){
      return service.foundItems;
    };
  };
  //

}());
