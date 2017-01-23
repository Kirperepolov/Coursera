(function() {
  'use strict';

  angular.module('Data')
  .service('MenuData',MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http){
    var service = this;

    /**
     * getAllCategories - retrieves all the categoties in a JSON
     *                                            from the remote server
     *
     * @return {promise}  an array of objects wrapped in a promise
     */
    service.getAllCategories = function(){
      let path = 'https://davids-restaurant.herokuapp.com/categories.json';

      return $http.get(path)
        .then(function (result) {
          service.categories = result.data;
          return service.categories;
        })
        .catch(error=>error.message);
      };

    /**
     * getItemsForCategory - retrieves all the items in a specified category
     *                                            from the remote server
     *
     * @param  {string} categoryShortName a short name for the
     *                                                   desired category
     * @return {promise} - an array of objects wrapped in a promise
     */
    service.getItemsForCategory = function(categoryShortName){
      let path = 'https://davids-restaurant.herokuapp.com/menu_items.json';

      return $http.get(path,{
        params:{
          category:categoryShortName
        }
      })
        .then(function (result) {
          service.items = result.data;
          return service.items;
        })
        .catch(error=>error.message);
    };
  };
}());
