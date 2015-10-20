app.controller('PlayCtrl', function($scope,$state,socket, playlistService) {
    socket.emit('changeView',{view:"play"});

    $scope.chunks = playlistService.getPlaylist();
    $scope.currchunk = $scope.chunks[0];
    $scope.selectedChunk = $scope.currchunk.id;




    $scope.go = function(where) {
        $state.go(where);
    }
})