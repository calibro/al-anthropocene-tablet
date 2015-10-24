app.controller('chunkCtrl', function($scope,$state,chunk,$sce,$timeout,$interval, mediaService,$ionicHistory) {
    //socket.emit('changeView',{view:"home"});
    $scope.chunk = chunk;

    $scope.controller = this;
    $scope.controller.state = null;
    $scope.controller.API = null;
    $scope.controller.currentVideo = 0;


    $scope.$on('IdleStart', function() {
        $ionicHistory.clearCache()
        $state.go('create', {}, {reload: true, inherit: true, notify: true});
    });

  var timeIntvl = null;

    $scope.controller.onPlayerReady = function(API) {
        $scope.controller.API = API;
        $scope.controller.API.setVolume(1);
        $scope.controller.API.seekTime(parseInt($scope.chunk.start));

      timeIntvl = $interval(function(){

            console.log($scope.controller.API.currentTime/1000);
            if($scope.controller.API.currentTime/1000 > $scope.chunk.end) {
                $scope.controller.API.stop();
                $timeout(function(){
                    $scope.controller.API.seekTime(parseInt($scope.chunk.start));
                    $scope.controller.API.play();
                },1000);
            }
        },1000);
    };

    $scope.goBack = function() {
        $interval.cancel(timeIntvl);
        $ionicHistory.goBack();
    };

    $scope.getThumb = function(vid) {
        return mediaService.getThumbUrl(vid.videoId, vid.id);
    };
    
    $scope.controller.onCompleteVideo = function() {
        $scope.controller.isCompleted = true;
    };


    $scope.controller.config = {
        sources: [
            {src: $sce.trustAsResourceUrl(mediaService.getVideoUrl($scope.chunk.videoId)), type: "video/mp4"}
        ],
        theme: {
            url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
        },
        preload: "none",
        width:640,
        height:480,
        autoPlay: "autoplay"
    };

    // example : hkw-video-1-0
    $scope.go = function(where) {
        $state.go(where);
    }
})
