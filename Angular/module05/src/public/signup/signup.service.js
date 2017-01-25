(function() {
  'use strict';

  angular.module('public')
  .service('SignUpService',SignUpService);

  SignUpService.$inject = ['$http', 'ApiPath'];
  function SignUpService($http, ApiPath){
    var service = this;

    service.saveUser = function(userObject){

      $http.get(ApiPath+'/menu_items/'+userObject.dish+'.json')
      .then(r=>console.log(r));

      service.user = userObject;

    };
  };
}());
