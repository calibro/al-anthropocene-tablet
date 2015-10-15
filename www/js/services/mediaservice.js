
app.factory('mediaService', function ($q, $http) {
    var baseurl = 'http://131.175.56.235/'
    return {
        getVideoUrl : function(id) {
            return baseurl + "antropovids/" + id + ".mp4";
        }

    }
});
