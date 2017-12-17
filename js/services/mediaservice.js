
app.factory('mediaService', function ($q, $http) {
    var baseurl = 'data/';
    return {
        getVideoUrl : function(id) {
            return baseurl + "antropovids/" + id + ".mp4";
        },
        getThumbUrl : function(videoId, chunkId) {
            var thumburl = "thumbs/";
            chunkId = chunkId.replace(videoId+"-","");
            var ch = chunkId.split("-")[0];
            return baseurl + thumburl + videoId + "/chunk-" + (parseInt(ch)+1) + "-sh-2.png";
        }

    }
});
