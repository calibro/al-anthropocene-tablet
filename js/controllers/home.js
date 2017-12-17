app.controller('HomeCtrl', function($scope,$state,socket,$rootScope) {

    $scope.room = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    socket.emit('room',$scope.room);
    $rootScope.room = $scope.room;

    socket.emit('changeView',{view:"home",room:$scope.room});

    $scope.go = function(where) {
        $state.go(where);
    }
})
