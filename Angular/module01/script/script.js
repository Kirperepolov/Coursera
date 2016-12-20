(function(){
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope){
    $scope.lunchList;
    $scope.message;
    $scope.caution;
    $scope.style;
    var messages = {
      ok:{text:'Enjoy!',style:'ok'},
      notOk:{text:'Too much!',style:'ok'},
      empty:{text:'Please enter data first',style:'worry'}
    };

    /**
     * .checkLunch - this method is called to check whether the entered list of
     *  lunch dishes is appropriate
     *
     * @return {undefined}  the function changes tha values of
     *                      ng-model variables and returns nothing
     */
    $scope.checkLunch = function(){
      if($scope.lunchList) {
        var lunchCautionMessage = lunchCaution($scope.lunchList);
        var checkLunchMessage = lunchMessage($scope.lunchList);
      } else {
        var checkLunchMessage = messages.empty;
      };
      $scope.caution = lunchCautionMessage;
      $scope.message = checkLunchMessage.text;
      $scope.style = checkLunchMessage.style;
    };

    /**
     * lunchCaution - checks whether a user enters empty items, which
     * are not considered in counting. If empty items appear
     * the caution message is displayed
     *
     * @param  {string} string an entered list of user's lunch dishes
     * @return {string}        a caution message. It is only returned when
     *  user enters empty items
     */
    function lunchCaution(string){
      string = string.replace(/ /gi,'');
      if (/,,/.test(string)) {
        var caution = 'Empty items, i.e., ",," are not considered';
      };
      return caution;
    };

    /**
     * lunchMessage - checks the xact number of dishes a user enters
     *
     * @param  {string} string an entered list of user's lunch dishes
     * @return {object}        an object with a message and message.style
     *                       depending on number of user's dishes
     */
    function lunchMessage(string){
      //as the spaces doesn't influence I decided to delete all of them
      // to make the next handling easier
      string = string.replace(/ /gi,'');
      var lunchListToArray = string.split(',');
      //by the .filter I discard empty inputs
      let filteredLunchList = lunchListToArray.filter(substr=>substr!=='');
      if (filteredLunchList.length===0){
        var message = messages.empty;
      } else if (filteredLunchList.length<4) {
        var message = messages.ok;
      } else {
        var message = messages.notOk;
      };
      return message;
    };
  };

})();
