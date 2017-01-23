(function() {
  'use strict';

  angular.module('MenuApp')
  .component('itemsComponent',{
    templateUrl: 'src/templates/items.component.html',
    bindings: {
      items: '<'
    }
  })
}());
