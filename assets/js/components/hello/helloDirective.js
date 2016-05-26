angular.module('mauris')
  .directive('hello', ['$interval', '$timeout', '$sce', function($interval, $timeout, $sce){
    return {
      restrict: 'E',
      template: '<h1 ng-bind-html="text"></h1>',
      link: function(scope, el, attr) {
        var textArr = [
          'Hello!',
          'Ol&#xE1;!',
          '&#x4F60;&#x597D;!',
          'Salut!',
          '&#xC548;&#xB155;!',
          'Ciao!',
          'Aloha!',
          'Hallo!',
          'Haai!',
          '&#x5E9;&#x5DC;&#x5D5;&#x5DD;',
          '&#x3053;&#x3093;&#x306B;&#x3061;&#x306F;!',
          '48454C4C4F21'
        ];

        var currentIndex = Math.floor(Math.random() * textArr.length);
        var changeTimeInterval = 5000;

        var loadText = function(){
          scope.text =  $sce.trustAsHtml(textArr[currentIndex]);
          scope.$apply(function(){
            jQuery(el).fadeTo('fast', 1);
          });
        };

        $interval(function(){
          ++currentIndex;
          if (currentIndex == textArr.length) {
            currentIndex = 0;
          }
          jQuery(el).fadeTo('fast', 0, loadText);
        }, changeTimeInterval);

        console.log(currentIndex);
        scope.text =  $sce.trustAsHtml(textArr[currentIndex]);
      }
    };
  }]);
