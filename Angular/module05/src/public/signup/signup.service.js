(function() {
  'use strict';

  angular.module('public')
  .service('SignUpService',SignUpService);

  SignUpService.$inject = ['$http', 'ApiPath'];
  function SignUpService($http, ApiPath){
    var service = this;

    service.saveUser = function(userObject){
      service.user = userObject;
      service.noDish = false;
      
      let category = service.user.dish.toUpperCase();
      return $http.get(ApiPath+'/menu_items/'+category+'.json')
          .then(function(r){

            return r.data;
          })
          .catch(function(err){
            if (+err.status===500){
              service.noDish = true;
            };
            return;
          });

    };
  };
}());
