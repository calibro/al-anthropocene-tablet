app.controller('CreateCtrl', function($scope) {
    $scope.tab = 'themes';
    //socket.emit('changeView',{view:"create"});


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

    $scope.themes={};
    $scope.speakers={};

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
                container[init].push(d);
            }
            else {
                container[init] = [d];
            }
        })
        console.log(container);
    }

    findInitials(rawthemes, false, $scope.themes);
    findInitials(rawspeakers, true, $scope.speakers);

})