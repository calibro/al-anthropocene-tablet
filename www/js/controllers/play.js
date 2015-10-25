app.controller('PlayCtrl', function($scope,$state,socket,$timeout,playlistService,$ionicHistory) {

    socket.emit('changeView',{view:"play"});

    $scope.chunks = playlistService.getPlaylist();
    socket.emit('playlist',$scope.chunks);

    $scope.currchunk = $scope.chunks[0];
    $scope.selectedChunk = $scope.currchunk.id;
    $scope.play = true;

  $scope.selectVideo = function(vid) {
    $scope.selectedChunk = vid.id;
    $scope.currchunk = vid;
    socket.emit('playChunk',vid.id);
  };
  socket.on("playChunk",function(data){
    $scope.selectedChunk = data;
    $scope.currchunk = $scope.chunks.find(function(d){return d.id == data});
  })


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
        //Idle.watch();
      socket.emit('changeView',{view:"create"});
    }

    $scope.reset = function() {
      $ionicHistory.clearCache();
      socket.emit('changeView',{view:"create"});
      $state.go('create', {}, {reload: true, inherit: true, notify: true});
    }

  $scope.prev = function(){
    console.log("prev");
    var currInd = $scope.chunks.findIndex(function(d){return d.id ==$scope.selectedChunk});
    console.log(currInd);
    if(currInd>0) {
      console.log($scope.chunks[currInd-1]);
      $scope.selectVideo($scope.chunks[currInd-1]);
    }
  }

  $scope.next = function(){
    console.log("next");
    var currInd = $scope.chunks.findIndex(function(d){return d.id ==$scope.selectedChunk});
    console.log(currInd);
    if(currInd<$scope.chunks.length-1) {
      console.log($scope.chunks[currInd+1]);
      $scope.selectVideo($scope.chunks[currInd+1]);
    }
  }

    socket.on("playTime",function(d){
        $scope.currPos = d;
    })

})
