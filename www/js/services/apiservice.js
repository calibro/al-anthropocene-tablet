
app.factory('apiService', function ($q, $http) {
    var baseurl = 'http://dicto-ao.herokuapp.com/api/'
        return {
            getEntities : function() {
                var deferred = $q.defer();
                $http.get(baseurl+'entities').success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("An error occured while fetching file");
                });
                return deferred.promise;
            },
            getEntity : function(id) {
                var deferred = $q.defer();
                $http.get(baseurl+'entities/'+id).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("An error occured while fetching file");
                });
                return deferred.promise;
            },
            getChunk : function(id) {
                var deferred = $q.defer();
                $http.get(baseurl+'chunks/'+id).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("An error occured while fetching file");
                });
                return deferred.promise;
            },
            getPlaylists : function() {
                var deferred = $q.defer();
                $http.get(baseurl+'playlists').success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("An error occured while fetching file");
                });
                return deferred.promise;
            },
            getPlaylist : function(id) {
                var deferred = $q.defer();
                $http.get(baseurl+'playlists/'+id).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("An error occured while fetching file");
                });
                return deferred.promise;
            },
            getFile : function(url){
                var deferred = $q.defer();
                $http.get(url).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("An error occured while fetching file");
                });

                return deferred.promise;
            }
        }
    });
