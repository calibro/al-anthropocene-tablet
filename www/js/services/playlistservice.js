app.factory('playlistService', function ($q, $http) {
    var playlst = [];
    return {
        setPlaylist : function(pllst) {
            playlst = pllst;
        },
        getPlaylist : function() {
            return playlst;
        }
    }
});
