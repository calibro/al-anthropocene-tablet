app.controller('PlayCtrl', function($scope,$state,socket,$timeout,playlistService,$ionicHistory,$ionicScrollDelegate) {

    socket.emit('changeView',{view:"play"});

    $scope.chunks = playlistService.getPlaylist();
    socket.emit('playlist',$scope.chunks);

    $scope.currTime = 0;
    $scope.currchunk = $scope.chunks[0];
    $scope.selectedChunk = {id:$scope.currchunk.id};
    $scope.play = true;

  $scope.selectChunk = function(id,ind) {
    $ionicScrollDelegate.$getByHandle('play').scrollTop(true);
    $scope.play = true;
    $scope.currTime = 0;
    $scope.selectedChunk = {id:id,index:ind};
    $scope.currchunk = $scope.chunks.find(function(d){return d.id == id});
    socket.emit('playChunk',id);
  };
  socket.on("playChunk",function(data){
    $ionicScrollDelegate.$getByHandle('play').scrollTop(true);
    $scope.currTime = 0;
    $scope.play = true;
    $scope.selectedChunk = {id:data};
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
      socket.emit('changeView',{view:"create",reload:false});
    }

    $scope.reset = function() {
      $ionicHistory.clearCache();
      socket.emit('changeView',{view:"create",reload:true});
      $state.go('create', {}, {reload: true, inherit: true, notify: true});
    }

  $scope.prev = function(){

    var currInd = $scope.chunks.findIndex(function(d){return d.id ==$scope.selectedChunk.id});

    if(currInd>0) {
      console.log($scope.chunks[currInd-1]);
      $scope.selectChunk($scope.chunks[currInd-1].id);
    }
  }

  $scope.next = function(){


    var currInd = $scope.chunks.findIndex(function(d){return d.id ==$scope.selectedChunk.id});

    if(currInd<$scope.chunks.length-1) {
      console.log($scope.chunks[currInd+1]);
      $scope.selectChunk($scope.chunks[currInd+1].id);
    }
  }

  socket.on("playTime",function(msg){
    if(msg.video == $scope.selectedChunk.id) {
      $scope.currTime = msg.time;
    }
    else $scope.currTime = 0;
    //console.log(msg);
  })

})
