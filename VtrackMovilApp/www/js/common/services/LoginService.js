angular.module('ServicesModule')
    .service('LoginService',['$q','$http','BASE_URL','$rootScope',LoginService]);

function LoginService($q,$http,BASE_URL,$rootScope) {

   this.login = login;
   this.getToken = getToken;
   this.logout = logout;
    
    
    function logout(auth) {
        console.log('entrando al metodo logut');
        var defered = $q.defer();
        var promise = defered.promise;
        $http
        ({
            method: 'delete',
            url: BASE_URL + '/auth/token',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($rootScope.tokenAuth)
        }).then(function success(response)
        {
            console.log(response);
            defered.resolve(response.data);
        },function error(response)
        {
            console.log('error: '+response);
            var error = response.data;
            defered.reject(error.mensaje);
        });
        return promise;
        console.log('saliendo del metodo logut');
    }
    
    
    /*
     funcion que pide acceso al sistema
     */
    function getToken(CodigoToken) {
        var defered = $q.defer();
        var promise = defered.promise;
        console.log('entrando a : function login de ServicioLogin');
        //var CodigoToken = {"valor": auth,"tipo": "TOKEN"};
        $http
        ({
            method: 'put',
            url: BASE_URL + '/auth/token',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(CodigoToken)
        }).then(function success(response)
        {
            console.log(response);
            defered.resolve(response.data);
        },function error(response)
        {
            console.log('error: '+response);
            var error = response.data;
            defered.reject(error.mensaje);
        });

        return promise;
    }
    
    /*
        funcion que pide acceso al sistema
     */
    function login(login,password) {
        var defered = $q.defer();
        var promise = defered.promise;
        console.log('entrando a : function login de ServicioLogin');
        var usuario = {"username": login,"password": password};
        $http
        ({
            method: 'post',
            url: BASE_URL + '/auth/token',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(usuario)
        }).then(function success(response)
        {
            console.log(response);
            defered.resolve(response.data);
        },function error(response)
        {
            console.log('error: '+response);
            var error = response.data;
            defered.reject(error.mensaje);
        });

        return promise;
    }

}