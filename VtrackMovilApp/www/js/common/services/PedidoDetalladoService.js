angular.module('ServicesModule')
    .service('PedidoDetalladoService',['$q','$http','BASE_URL','$rootScope',PedidoDetalladoService]);

function PedidoDetalladoService($q,$http,BASE_URL,$rootScope) {

    this.getPedido = getPedido;
    
    function getPedido(idPedido) {
        console.log('entrando al metodo getPedido');
        var defered = $q.defer();
        var promise = defered.promise;
        $http
        ({
            method: 'GET',
            url: BASE_URL + '/pedido/'+idPedido,
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
        
        console.log('saliendo del metodo getPedido');
    }

}
