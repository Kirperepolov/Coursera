(function() {
  'use strict';

  angular.module('public')
  .controller('UserInfoController',UserInfoController);

  UserInfoController.$inject = ['SignUpService'];
  function UserInfoController(SignUpService){
    var userCtrl = this;
    userCtrl.user = SignUpService.user;
  };
}());
