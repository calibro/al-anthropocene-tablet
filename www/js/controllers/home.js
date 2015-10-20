app.controller('HomeCtrl', function($scope,$state,socket) {
    socket.emit('changeView',{view:"home"});

    $scope.go = function(where) {
        $state.go(where);
    }
})