angular.module('ServicesModule')
    .service('PerfilService',['$q','$http','BASE_URL','$rootScope',PerfilService]);

function PerfilService($q,$http,BASE_URL,$rootScope) {

    this.getUsuario = getUsuario;
    this.confirmarPassword = confirmarPassword;
    this.asentarModificacionPassword = asentarModificacionPassword;

    function getUsuario() {
        console.log('entrando a la funcion getUsuario');
        var defered = $q.defer();
        var promise = defered.promise;
        $http
        ({
            method: 'GET',
            url: BASE_URL + '/usuario/'+$rootScope.correouser,
            headers: {
                'Authorization': $rootScope.tokenAuth,
                'Content-Type': 'application/json'
            }/*,
             data: JSON.stringify($rootScope.correouser)*/
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
        console.log('saliendo de la funcion getUsuario');
    }
    
    function confirmarPassword(correoEmpresa,password) {
        console.log('entrando a la funcion getUsuario');
        var defered = $q.defer();
        var promise = defered.promise;
        $http
        ({
            method: 'GET',
            url: BASE_URL + '/usuario/ConfirmarPassword/'+correoEmpresa+'/'+password,
            headers: {
                'Authorization': $rootScope.tokenAuth,
                'Content-Type': 'application/json'
            }/*,
             data: JSON.stringify($rootScope.correouser)*/
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
        console.log('saliendo de la funcion getUsuario');
    }
    
    /*
        funcion que llama al servicio REST para modificar la contrasena
        de un usuario
     */
    function asentarModificacionPassword(login,password) {
        console.log('entrando al metodo modificarContrasenaUsuario');
        var defered = $q.defer();
        var promise = defered.promise;
        var usuario = {"username": $rootScope.correouser,"password": password};
        console.log('saliendo del metodo validarUsuarioBloqueado');
        $http
        ({
            method: 'put',
            url: BASE_URL + '/usuario/password',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.tokenAuth,
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
        console.log('entrando al metodo modificarContrasenaUsuario');
    }

}