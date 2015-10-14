app.controller('CreateCtrl', function($scope,apiService,$timeout,$window,$ionicHistory,$ionicScrollDelegate, $location) {
    $scope.tab = 'themes';
    //socket.emit('changeView',{view:"create"});

    $scope.themes={};
    $scope.speakers={};
    $scope.places={};
    $scope.chunks = [];
    $scope.selectedThemes = [];
    $scope.selectedSpekers = [];
    $scope.selectedChunk = "";

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

    apiService.getEntities().then(function(data){
        $scope.entities = data;
        findInitials($scope.entities.themes, false, $scope.themes);
        findInitials($scope.entities.speakers, true, $scope.speakers);
        findInitials($scope.entities.places, true, $scope.places);


    })

    $scope.addEntity = function(ent,type) {
        ent.selected = true;
        if(type=="theme") {
            $scope.selectedThemes.push(ent);
        }
        else if(type == "speaker") {
            $scope.selectedSpekers.push(ent);
        }
        apiService.getFile("data/tag-"+Math.ceil(Math.random()*4)+".json").then(function(data){
            $scope.chunks = _.uniq(_.union($scope.chunks,data.chunks),'chunkId');
        })
    }

    $scope.keys = function(obj){
        var res =  obj? Object.keys(obj) : [];
        res.sort();
        return res;
    }

    function findInitials(arr,name,container) {
        arr.forEach(function(d,i){

            var init = "";
            if(name) {
                init = d.name.split(" ").pop().charAt(0);
            }
            else {
                init = d.name.charAt(0);
            }
            if(init in container) {
                container[init].push({id: d.id,name: d.name,selected:false});
            }
            else {
                container[init] = [{id: d.id,name: d.name,selected:false}];
            }
        })
    }



    $scope.selectVideo = function(vid) {
       var left = angular.element(document.getElementById(vid.chunkId)).prop('offsetLeft');
        var w = angular.element(document.getElementById(vid.chunkId)).prop('clientWidth');

       $scope.selectedChunk = vid.chunkId;
        $ionicScrollDelegate.$getByHandle('chunks').scrollTo(left-$window.innerWidth/2+w/2,0,true);
    }

    $scope.isSelected = function(vid) {
        return vid.selected;
    }

    $scope.swapVideo = function(position, $index,id) {


        if(position==1 || position == -1) {
            var b = $scope.chunks[$index+position];
            $scope.chunks[$index+position] = $scope.chunks[$index];
            $scope.chunks[$index] = b;
        }
        $timeout(function(){
            var left = angular.element(document.getElementById(id)).prop('offsetLeft');
            var w = angular.element(document.getElementById(id)).prop('clientWidth');
            console.log(id,left,w);
            $ionicScrollDelegate.$getByHandle('chunks').scrollTo(left-$window.innerWidth/2+w/2,0,true);
        });

    }




})