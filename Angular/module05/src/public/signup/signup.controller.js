(function() {
  'use strict';

  angular.module('public')
  .controller('SignUpController',SignUpController);

  SignUpController.$inject = ['SignUpService'];
  function SignUpController(SignUpService) {
    var signupCtrl = this;

    signupCtrl.user = {};
    signupCtrl.submit = function(){
      SignUpService.saveUser(signupCtrl.user);
    };
  };

}());
