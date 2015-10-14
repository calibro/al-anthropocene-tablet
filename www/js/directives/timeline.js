app.directive('timeline', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/timeline.html',
        link: function(scope, iElement, iAttrs) {

            scope.$watchCollection('chunks',function(oldValue,newValue){
               scope.totalTime = _.sum(oldValue,'duration');

            })

        }
    }
});