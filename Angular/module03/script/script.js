(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',foundItemsDirective)

  /**
   * NarrowItDownController - description
   *
   * @param  {type} MenuSearchService description
   * @return {type}                   description
   */
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var ctrl = this;

    ctrl.find = function(searchItem){
      ctrl.found = MenuSearchService.getMatchedMenuItems(searchItem);
      return ctrl.found;
    };

  };

  /**
   * foundItemsDirective - description
   *
   * @return {type}  description
   */
  function foundItemsDirective(){

  };

    /**
     * MenuSearchService - description
     *
     * @param  {type} $http description
     * @return {type}       description
     */
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
      return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
      .then(function (result) {
        // process result and only keep items that match
        let menu = result.menu_items;
        searchTerm = searchTerm.toLowerCase();
        var foundItems = [];
        for (let i=0;i<menu.length;i++){
          if (menu[i].description.toLowerCase().indexOf(searchTerm)!==-1){
            foundItems.push(menu[i]);
          }
        }
        //
        // // return processed items
        return foundItems;
      })
      .catch(error=>error.message);
    };
  };

}());
