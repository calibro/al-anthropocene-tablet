app.controller('HomeCtrl', function($scope,$state) {
    //socket.emit('changeView',{view:"home"});

    $scope.go = function(where) {
        $state.go(where);
    }
})