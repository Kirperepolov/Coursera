(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .controller('FoundItemsDirectiveController',FoundItemsDirectiveController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',foundItemsDirective);

  /**
   * foundItemsDirective - this directive is used to fill in the list
   * of found items in DOM
   *
   */
  function foundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<foundItems'
      },
      controller: 'FoundItemsDirectiveController as itemsCtrl',
      bindToController: true,
      restrict:'E'  //as found-items is used both for an element and
      // its attribute I hade to define the restriction
    };

    return ddo;
  };

  /**
   * FoundItemsDirectiveController -  this controller is used inside
   *    the directive foundItemsDirective to deside what to show depending on
   *    the search results
   *
   */
  function FoundItemsDirectiveController() {
  var itemsCtrl = this;

  /**
   * itemsCtrl.nothingFound function - is invoked to check what information to
   * show to a user. 3 options r available:
   *  - nothing to show (when the page is just loaded)
   *  - show list (when the list of menu items is downloaded and can be shown)
   *  - error (when nothing is found)
   *
   * @return {type}  description
   */
  itemsCtrl.nothingFound = function () {
    if (itemsCtrl.items.found === undefined){
      return "show nothing";
    } else if (itemsCtrl.items.found.length>0) {
      return "show List";
    }
    return "error";
  };
}

  /**
  * NarrowItDownController - the main controller in the applicarion
  *
  * @param  {function} MenuSearchService a singleton service for
  *   data handling, storing and sharing (if needed), which is injected in the
  *   controller
  *
  */
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    ctrl.found;
    ctrl.searchItem="";
    ctrl.found;

    /**
     * ctrl.find - this function is invoked when a user tries to search
     * for a menu item.
     *          it stores the result to ctrl.found as an array.
     *
     * @param  {string} searchItem  - a string that matches (or not) something
     *  in the item description.
     * If nothing found the empty erray is stored.
     */
    ctrl.find = function(searchItem){
      if (searchItem === undefined||searchItem.trim()==='') {
        ctrl.found=[];
      } else {

        var foundPromise = MenuSearchService.getMatchedMenuItems(searchItem);
        foundPromise.then(function(list){
          ctrl.found=list;
        }).catch(error=>console.log(error.message));
      }
    };

    /**
     * ctrl.removeItem() - removes items from the retrieved list
     *
     * @param  {number} itemIndex an index in an array of items, corresponding
     *  to the items which must be removed
     *
     */
    ctrl.removeItem = function(itemIndex){
      MenuSearchService.removeItem(itemIndex);
    };

  };


  /**
  * MenuSearchService - a singleton service for data handling, storing and
  *  sharing (if needed)
  *
  * @param  $http  - an injected service for making asynch HTTP requests
  *
  */
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var service = this;
    /**
     * service.getMatchedMenuItems() - retrieves a list of matched items
     *
     * @param  {string} searchTerm a keyword for matching items' descriptions
     * @return {promise}            returns a list of matched items in a pomise
     */
    service.getMatchedMenuItems = function(searchTerm){
      let path = 'https://davids-restaurant.herokuapp.com/menu_items.json'
      service.foundItems = [];


      return $http.get(path)    //a shortcut method fot GET requests
              .then(function (result) {
                // process result and only keep items that match
                let menu = result.data.menu_items;
                searchTerm = searchTerm.toLowerCase();

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

    /**
     * service.removeItem() function - removes items from the previously
     * retrieved list
     *
     * @param  {number} itemIndex description
     *
     */
    service.removeItem = function (itemIndex) {
      service.foundItems.splice(itemIndex, 1);
    };
  };

}());
