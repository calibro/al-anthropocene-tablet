app.directive('timeline', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/timeline.html',
        link: function(scope, iElement, iAttrs) {
       //   scope.totalTime = _.sum(scope.chunks,'duration');
            scope.$watchCollection('chunks',function(newValue,oldValue){
               scope.totalTime = _.sum(newValue,'duration');
            });

          scope.computeWidth = function(duration){
            return (duration/scope.totalTime*100)+'%';
          }
        }
    }
});
