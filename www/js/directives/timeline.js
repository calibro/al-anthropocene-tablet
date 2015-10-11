app.directive('timeline', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/timeline.html',
        link: function(scope, iElement, iAttrs) {

            scope.$watchCollection('chunks',function(oldValue,newValue){
                console.log("chunks!",oldValue);
               scope.totalTime = _.sum(oldValue,'duration');
                console.log(scope.totalTime);

            })

        }
    }
});