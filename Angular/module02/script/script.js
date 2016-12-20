(function(){
  'use strict';

  angular.module("ShoppingListCheckOff",[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService)


  /**
   * ToBuyController - this controller I supposed to use for
   * the toBuyList managing
   *
   * @param  {function} ShoppingListCheckOffService a singleton service for
   *  data storing and sharing
   *
   */

  ToBuyController.$inject=['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var list = this;
    list.items=ShoppingListCheckOffService.getItemsToBuy();

    list.buyItem = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };


  };

  /**
   * AlreadyBoughtController - this controller i supposed for for
   * the boughtList managing
   *
   * @param  {function} ShoppingListCheckOffService a singleton service for
   *  data storing and sharing
   *
   */
  AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var list = this;
    list.items=ShoppingListCheckOffService.getItemsBought();



  };

  function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [];
  var itemsBougth =[];

    // I decided to fullfil my toBuyList using the object constructor
  for (let i=1;i<6;i++){
    let itemEntity = new Items('Cookie(s)',i);
    itemsToBuy.push(itemEntity);
  };

  service.buyItem = function (itemIdex) {
    itemsBougth.push(itemsToBuy[itemIdex]);
    itemsToBuy.splice(itemIdex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBougth;
  };

};

/**
 * Items - the constructor to create items in itemsList
 *
 * @param  {string} name     a name for the item
 * @param  {number} quantity quontity of items
 * @return {object}          the resulting item object
 */
function Items(name,quantity) {
  this.name=name;
  this.quantity=quantity;
};


})();
