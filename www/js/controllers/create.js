app.controller('CreateCtrl', function($scope,apiService,$window,$ionicScrollDelegate, $location) {
    $scope.tab = 'themes';
    //socket.emit('changeView',{view:"create"});

    $scope.themes={};
    $scope.speakers={};
    $scope.chunks = [];
    $scope.selectedThemes = [];
    $scope.selectedSpekers = [];

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

    var rawthemes=[
        "in",
        "velit",
        "id",
        "dolore",
        "laborum",
        "aute",
        "esse",
        "esse",
        "sint",
        "consectetur",
        "labore",
        "excepteur",
        "ea",
        "in",
        "do",
        "ea",
        "ullamco",
        "magna",
        "ipsum",
        "pariatur",
        "aute",
        "reprehenderit",
        "mollit",
        "nostrud",
        "deserunt",
        "et",
        "do",
        "officia",
        "eiusmod",
        "amet",
        "minim",
        "mollit",
        "eu",
        "aliquip",
        "dolor",
        "cillum",
        "ad",
        "enim",
        "deserunt",
        "eiusmod",
        "adipisicing",
        "eu",
        "quis",
        "velit",
        "occaecat",
        "anim",
        "enim",
        "laboris",
        "veniam",
        "labore"
    ];

   var rawspeakers =  [
        "Merritt Whitfield",
        "Kelli Franco",
        "Trevino Green",
        "Rivers Wiggins",
        "Hatfield Everett",
        "Puckett Francis",
        "Acosta Pickett",
        "Sandoval Reyes",
        "Tamika Mccarty",
        "Julie Keith",
        "Fulton Woodard",
        "Odonnell Franks",
        "Pace Glass",
        "Baxter Schneider",
        "Houston Hanson",
        "Abigail Herman",
        "Wynn Durham",
        "Tate Moon",
        "Long Houston",
        "Cherry Taylor",
        "Autumn Bauer",
        "Alexander Mullins",
        "Conrad Keller",
        "Mclean Oliver",
        "Winters Marquez",
        "Stephenson Morin",
        "Willie Gregory",
        "Glenn Martin",
        "Mason Slater",
        "Natasha Henderson",
        "Gretchen Harrison",
        "Gallegos Becker",
        "Castaneda Noel",
        "Vicki Hampton",
        "Luisa Pacheco",
        "Marianne Cardenas",
        "Tracey Barton",
        "Kline Baird",
        "Ingrid Marshall",
        "Lynnette Hunt",
        "Myers Roy",
        "Weiss Norman",
        "Hester Duke",
        "Addie Hutchinson",
        "Bass Solis"
    ];


    $scope.keys = function(obj){
        var res =  obj? Object.keys(obj) : [];
        res.sort();
        return res;
    }

    function findInitials(arr,name,container) {
        arr.forEach(function(d,i){

            var init = ""
            if(name) {
                init = d.split(" ")[1].charAt(0);
            }
            else {
                init = d.charAt(0);
            }
            if(init in container) {
                container[init].push({name:d,selected:false});
            }
            else {
                container[init] = [{name:d,selected:false}];
            }
        })
    }

    findInitials(rawthemes, false, $scope.themes);
    findInitials(rawspeakers, true, $scope.speakers);


    $scope.selectVideo = function(vid) {
       var left = angular.element(document.getElementById(vid.chunkId)).prop('offsetLeft');
        var w = angular.element(document.getElementById(vid.chunkId)).prop('clientWidth');

        console.log(left,w);

       $scope.chunks.forEach(function(d,i){
           d.selected = false;
       });
        vid.selected = true;
        $location.hash(vid.chunkId);
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

        var left = angular.element(document.getElementById(id)).prop('offsetLeft');
        var w = angular.element(document.getElementById(id)).prop('clientWidth');
        $ionicScrollDelegate.$getByHandle('chunks').scrollTo(left-$window.innerWidth/2+w/2,0,true);
    }




})