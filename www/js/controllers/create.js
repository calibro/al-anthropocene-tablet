app.controller('CreateCtrl', function($scope,$stateParams,apiService,mediaService,playlistService,$timeout,$window,$ionicHistory,$ionicScrollDelegate,$state,socket,Idle) {

    $scope.tab = 'themes';
    socket.emit('changeView',{view:"create"});




    Idle.watch();

    $scope.$on('IdleStart', function() {
       $scope.reset();
    });


    $scope.themes={};
    $scope.speakers={};
    $scope.places={};
    $scope.chunks = [];
    $scope.selectedThemes = [];
    $scope.selectedSpeakers = [];
    $scope.selectedPlaces = [];
    $scope.selectedChunk = {id:null,index:null};
    $scope.selEntities = [];

    $scope.changeTab = function(tag) {
        $scope.tab = tag;
        $ionicScrollDelegate.$getByHandle('tabs').scrollTo(0,0,true);
    };


  $scope.$watch('tab',function(newVal,oldVal){
    console.log("tags");
    console.log(newVal,oldVal);
    if(newVal!=oldVal) {
      console.log("newVal!",newVal);
      $ionicScrollDelegate.$getByHandle('tags').scrollTo(0,0,true);
    }
  })

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

    apiService.getEntities().then(function(data){
        $scope.entities = data;
        findInitials($scope.entities.themes, false, $scope.themes);
        findInitials($scope.entities.speakers, true, $scope.speakers);
        findInitials($scope.entities.places, true, $scope.places);
    });

    $scope.keys = function(obj){
        var res =  obj? Object.keys(obj) : [];
        res.sort();
        return res;
    };


    $scope.toggleEntity = function(entity) {
        $scope.selectedChunk = {id:null,index:null};;
        if(entity.selected) {
            removeEntity(entity);
        }
        else{
            addEntity(entity);
        }
    };


     $scope.gotoPreview = function(id) {
        $state.go('chunk', {"chunkId": id});
      };

    $scope.getThumb = function(vid) {
        return mediaService.getThumbUrl(vid.videoId, vid.id);
    };

    $scope.removeChunk = function(ind) {
        $scope.selectedChunk = {id:null,index:null};
        var removed = $scope.chunks.splice(ind,1)[0];
        var entToRemove = [];
        $scope.selEntities.forEach(function(d,i){
            _.remove(d.chunks,function(e){return e.id == removed.id});
            if(!d.chunks.length) entToRemove.push(d.id);
        });

        entToRemove.forEach(function(d,j){
            var removeTagsToo =_.remove($scope.selEntities,function(e){return e.id == d})[0];
            var fl = getFirstLetter(removeTagsToo);
            if(removeTagsToo.category == "theme") {
                _.find($scope.themes[fl],function(f){return f.id == removeTagsToo.id}).selected = false;
            }
            else if(removeTagsToo.category == "speaker") {
                _.find($scope.speakers[fl],function(f){return f.id == removeTagsToo.id}).selected = false;
            }
            if(removeTagsToo.category == "place") {
                _.find($scope.places[fl],function(f){return f.id == removeTagsToo.id}).selected = false;
            }
        })

        computeScrollPosition();
    };

    $scope.selectVideo = function(vid,ind) {


      var w = angular.element(document.getElementsByClassName('chunk')[0]).prop('clientWidth')+87;
      var left = ind * 295;
       //$scope.selectedChunk = vid.id;
        $ionicScrollDelegate.$getByHandle('chunks').scrollTo(left-$window.innerWidth/2+w/2,0,true);
    };


    $scope.selectChunk = function(id, index){
        if($scope.selectedChunk.id==id && index==$scope.selectedChunk.index) {
            $scope.selectedChunk.id=null;
            $scope.selectedChunk.index = null;
        }else{
          $scope.selectedChunk = {id:id, index:index}
          var w = angular.element(document.getElementById(id)).prop('clientWidth')+87;
          var left = (index*295)
          $ionicScrollDelegate.$getByHandle('chunks').scrollTo(left-$window.innerWidth/2+w/2,0,true);
        }
    }

    $scope.computeColumns = function(num){
      var div = Math.ceil(num/9);
      return div;
    }

    $scope.swapVideo = function(position, $index, id) {
       var newPos = 0;
        if(position==1 || position == -1) {
            var b = $scope.chunks[$index+position];
          newPos = $index+position;
            $scope.chunks[$index+position] = $scope.chunks[$index];
            $scope.chunks[$index] = b;
            $timeout(function(){
                $scope.selectChunk(id, $index+position)
              });
        }
        else if(position=="start") {
            var b = $scope.chunks[$index];
            $scope.chunks.splice($index,1);
            $scope.chunks.unshift(b);
            $timeout(function(){
                $scope.selectChunk(id, 0)
              });

        }
        else if(position == "end") {
            var b = $scope.chunks[$index];
            $scope.chunks.splice($index,1);
            $scope.chunks.push(b);
            $timeout(function(){
                $scope.selectChunk(id, $scope.chunks.length -1)
              });
        }

    };


    $scope.play = function() {
        socket.emit("play",$scope.chunks);
        playlistService.setPlaylist($scope.chunks);
        $state.go('play');
    };

    $scope.reset = function() {
        $scope.chunks = [];
        $scope.selEntities = [];
        $scope.themes = [];
        $scope.speakers = [];
        $scope.places = [];
        $scope.limitReached = false;
        findInitials($scope.entities.themes, false, $scope.themes);
        findInitials($scope.entities.speakers, true, $scope.speakers);
        findInitials($scope.entities.places, true, $scope.places);
        computeScrollPosition();
    };
  $scope.checkSelected = function(id) {
    if(id == $scope.selectedChunk.id) return true;
    else return false;
  }

    function addEntity(ent){


        if($scope.selEntities.length<3) {

          ent.selected = true;
          apiService.getEntity(ent.id).then(function (data) {
            $scope.selEntities.push(data);
            $scope.chunks = _.uniq(_.union($scope.chunks, data.chunks), 'id');
            console.log($scope.chunks);
          });
        }
      else $scope.limitReached = true;
    }

    function removeEntity(ent) {
      $scope.limitReached = false;
        ent.selected = false;
        var chunksToRemove = _.pluck(_.find($scope.selEntities,'id',ent.id).chunks,'id');
        _.remove($scope.chunks,function(d){return chunksToRemove.indexOf(d.id)>-1;});
        _.remove($scope.selEntities,function(d){return d.id == ent.id });
        computeScrollPosition();
    }


    function findInitials(arr,name,container) {
        arr.forEach(function(d,i){
            var init = "";
            if(name) {
                init = d.name.split(",")[0].split(" ").pop().charAt(0);
            }
            else {
                init = d.name.charAt(0);
            }
            if(init in container) {
                container[init].push({id: d.id, name: d.name,selected:false});
            }
            else {
                container[init] = [{id: d.id, name: d.name,selected:false}];
            }
        })
    }


    function getFirstLetter(ent) {
        var res = ""
        if(ent.category=="speaker") {
            res = ent.name.split(",")[0].split(" ").pop().charAt(0);
        }
        else {
            res = ent.name.charAt(0);
        }
        return res;
    }

    function computeScrollPosition() {
        var p = $ionicScrollDelegate.$getByHandle('chunks').getScrollPosition().left;
        var w = angular.element(document.getElementsByClassName("chunk")[0]).prop('clientWidth');
        var l = ($scope.chunks.length * w)-w-$window.innerWidth/2+w/2;
        console.log(p,l)
        if(p>l) {

            $ionicScrollDelegate.$getByHandle('chunks').scrollTo(l,0,true);
        }
    }


    $scope.$watchCollection('selEntities',function(newValue, oldValue){
        socket.emit('entities',{entities: _.pluck(newValue,'id')});
        $scope.selectedThemes = _.filter(newValue, _.matchesProperty('category', 'theme'));
        $scope.selectedSpeakers = _.filter(newValue, _.matchesProperty('category', 'speaker'));
        $scope.selectedPlaces = _.filter(newValue, _.matchesProperty('category', 'place'));
    });

  socket.on("resetCreate",function(data){
    $ionicHistory.clearCache()
    $state.go('create', {}, {reload: true, inherit: true, notify: true});
  })


});
