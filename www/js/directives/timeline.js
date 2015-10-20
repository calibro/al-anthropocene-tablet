app.directive('timeline', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/timeline.html',
        link: function(scope, iElement, iAttrs) {

       //   scope.totalTime = _.sum(scope.chunks,'duration');

            scope.$watchCollection('chunks',function(oldValue,newValue){
               scope.totalTime = _.sum(oldValue,'duration');

            })

          scope.computeWidth = function(duration){
            return Math.floor((duration/scope.totalTime)*100)+'%';
          }

        }
    }
});
