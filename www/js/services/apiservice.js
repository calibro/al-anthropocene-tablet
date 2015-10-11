
app.factory('apiService', function ($q, $http) {

        return {
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
