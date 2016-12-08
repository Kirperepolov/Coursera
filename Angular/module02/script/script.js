(function(){
  'use strict';

  angular.module("ShoppingListCheckOff",[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService)

  ToBuyController.$inject=['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var list = this;
    list.items=[];
    
  };

  AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var list = this;
    list.items=[];
    
  };

})();
