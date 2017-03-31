angular.module('ServicesModule')
    .service('PedidosService',['$q','$http','BASE_URL','$rootScope',PedidosService]);

function PedidosService($q,$http,BASE_URL,$rootScope) {

    this.getAllPedidos = getAllPedidos;
    
    function getAllPedidos() {
        console.log('entrando al metodo getAllPedidos');
        var defered = $q.defer();
        //var token = 30f3c74a3813899bd14fc58b82e8d50b;
        var promise = defered.promise;
        $http
        ({
            method: 'GET',
            url: BASE_URL + '/pedido/all/'+$rootScope.correouser,
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
        console.log('saliendo del metodo getAllPedidos');
    }

}
