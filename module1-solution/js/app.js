(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.message = "";

  $scope.sayMessage = function () {
    $scope.message = makeMessage($scope.items);
  };
}
function makeMessage(string) {

  var message = "Please enter data first";
  var items = string.split(',');
  var validItems = 0;

  for (var i = 0; i < items.length; i++){
    if (items[i].trim().length > 0){
      validItems++;
    }
  }
  if (validItems > 0 && validItems <= 3){
    message = "Enjoy!";
  }
  if (validItems > 3){
    message = "Too much!";
  }
  return message;
  }
})();
