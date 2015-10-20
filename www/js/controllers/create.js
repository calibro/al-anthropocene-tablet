app.controller('CreateCtrl', function($scope,apiService,mediaService,playlistService,$timeout,$window,$ionicHistory,$ionicScrollDelegate,$state,socket) {

    $scope.tab = 'themes';
    socket.emit('changeView',{view:"create"});

    $scope.themes={};
    $scope.speakers={};
    $scope.places={};
    $scope.chunks = [];
    $scope.selectedThemes = [];
    $scope.selectedSpeakers = [];
    $scope.selectedPlaces = [];
    $scope.selectedChunk = "";
    $scope.selEntities = [];


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
        $scope.selectedChunk = "";
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
        $scope.selectedChunk = "";
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
    };

    $scope.selectVideo = function(vid) {
       var left = angular.element(document.getElementById(vid.id)).prop('offsetLeft');
        var w = angular.element(document.getElementById(vid.id)).prop('clientWidth');

       $scope.selectedChunk = vid.id;
        $ionicScrollDelegate.$getByHandle('chunks').scrollTo(left-$window.innerWidth/2+w/2,0,true);
    };


    $scope.deselectChunk = function(id){
        if($scope.selectedChunk!="" && $scope.selectedChunk!=id) {
            $scope.selectedChunk="";
        }
    }

    $scope.swapVideo = function(position, $index, id) {
        if(position==1 || position == -1) {
            var b = $scope.chunks[$index+position];
            $scope.chunks[$index+position] = $scope.chunks[$index];
            $scope.chunks[$index] = b;
        }
        else if(position=="start") {
            var b = $scope.chunks[0];
            $scope.chunks[0] = $scope.chunks[$index];
            $scope.chunks[$index] = b;
        }
        else if(position == "end") {
            var b = $scope.chunks[$scope.chunks.length -1];
            $scope.chunks[$scope.chunks.length -1] = $scope.chunks[$index];
            $scope.chunks[$index] = b;
        }
        $timeout(function(){
            var left = angular.element(document.getElementById(id)).prop('offsetLeft');
            var w = angular.element(document.getElementById(id)).prop('clientWidth');
            console.log(id,left,w);
            $ionicScrollDelegate.$getByHandle('chunks').scrollTo(left-$window.innerWidth/2+w/2,0,true);
        });
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
        findInitials($scope.entities.themes, false, $scope.themes);
        findInitials($scope.entities.speakers, true, $scope.speakers);
        findInitials($scope.entities.places, true, $scope.places);

    };

    function addEntity(ent){

        ent.selected = true;
        apiService.getEntity(ent.id).then(function(data){
            $scope.selEntities.push(data);
            $scope.chunks = _.uniq(_.union($scope.chunks,data.chunks),'id');
        });
    }

    function removeEntity(ent) {
        ent.selected = false;
        var chunksToRemove = _.pluck(_.find($scope.selEntities,'id',ent.id).chunks,'id');
        _.remove($scope.chunks,function(d){return chunksToRemove.indexOf(d.id)>-1;});
        _.remove($scope.selEntities,function(d){return d.id == ent.id });
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

    $scope.$watchCollection('selEntities',function(newValue, oldValue){
        socket.emit('entities',{entities: _.pluck(newValue,'id')});
        $scope.selectedThemes = _.filter(newValue, _.matchesProperty('category', 'theme'));
        $scope.selectedSpeakers = _.filter(newValue, _.matchesProperty('category', 'speaker'));
        $scope.selectedPlaces = _.filter(newValue, _.matchesProperty('category', 'place'));
    });
});
