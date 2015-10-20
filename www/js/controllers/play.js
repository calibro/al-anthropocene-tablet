app.controller('PlayCtrl', function($scope,$state,socket, playlistService) {

    socket.emit('changeView',{view:"play"});

    $scope.chunks = playlistService.getPlaylist();
    socket.emit('playlist',$scope.chunks);

    $scope.currchunk = $scope.chunks[0];
    $scope.selectedChunk = $scope.currchunk.id;
    $scope.play = true;

  $scope.selectVideo = function(vid) {
    $scope.selectedChunk = vid.id;
    $scope.currchunk = vid;

  };


  $scope.playOrPause = function() {
    $scope.play = !$scope.play;

    if($scope.play){
      socket.emit('playStatus',"play");
    }
    else {
      socket.emit('playStatus',"pause");
    }

  }

    $scope.go = function(where) {
        $state.go(where);
    }

  $scope.$watch('selectedChunk',function(newValue,oldValue){
    console.log(newValue,oldValue)
    socket.emit('playChunk',newValue);

  })

})


