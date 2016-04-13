/**
 * Created by Galyna on 13.04.2016.
 */
/**
 * Created by Galyna on 09.04.2016.
 */
/**
 * Created by Galyna on 08.04.2016.
 */
(function(){
    'use strict';

    angular.module('admin').service('adminService', AdminService);

    AdminService.$inject = ['$http', 'constants'];

    function AdminService($http, constants){
        var url = constants.apiUrl + '/course';
        //TODO: implement filtering
        this.get = function(id){
            var getUrl = id ? url + '/' + id : url;
            return $http.get(getUrl).then(function(res){
                return res.data;
            });
        };

        this.post = function(course){
            return $http.post(url, course).then(function(res){
                return res.data;
            });
        };

        this.put = function(id, course){
            return $http.put(url + '/' + id, course).then(function(res){
                return res.data;
            });
        };

        this.delete = function(id){
            return $http.delete(url + '/' + id).then(function(res){
                return res.data;
            });
        }
    }
})();
