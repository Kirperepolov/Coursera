(function(){
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope){
    $scope.lunchList;
    $scope.message;
    $scope.caution;

    $scope.checkLunch = function(){
      if($scope.lunchList) {
        var lunchCautionMessage = lunchCaution($scope.lunchList);
        var checkLunchMessage = lunchMessage($scope.lunchList);
      } else {
        var checkLunchMessage = 'Please enter data first';
      };
      $scope.caution = lunchCautionMessage;
      $scope.message = checkLunchMessage;
    };

    function lunchCaution(string){
      string = string.replace(/ /gi,'');
      if (/,,/.test(string)) {
        var caution = 'Please don\'t enter empty data';
      };
      return caution;
    };

    function lunchMessage(string){
      var lunchListToArray = string.split(',');
      let filteredLunchList = lunchListToArray.filter(substr=>substr!=='');
      if (filteredLunchList.length<4) {
        var message = 'Enjoy!';
      } else {
        var message = 'Too much!';
      };
      return message;
    };
  };

})();
