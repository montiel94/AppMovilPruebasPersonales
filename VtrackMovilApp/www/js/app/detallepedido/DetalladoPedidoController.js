angular.module('DetalladoPedidoModule')
.controller('DetalladoPedidoController',['$scope','pedido','$rootScope',DetalladoPedidoController]);

function DetalladoPedidoController($scope,pedido,$rootScope)
{

    var initView = function (){
        console.log('entrando a la funcion initView');
        modificarEstado();
        $scope.pedido = pedido;
        console.log('saliendo de la funcion')
    };
    
    function modificarEstado(){
        
                if (pedido.estado == 0)
                    pedido.estado = "En espera";
                if (pedido.estado == 1)
                    pedido.estado = "En Turno para Llenado";
                if (pedido.estado == 2)
                    pedido.estado = "Autorizado y Llamado a Llenado";
                if (pedido.estado == 3)
                    pedido.estado = "Pesado Inicial";
                if (pedido.estado == 4)
                    pedido.estado = "Llenando";
                if (pedido.estado == 5)
                    pedido.estado = "Llenado";
                if (pedido.estado == 6)
                    pedido.estado = "Pesado Final";
                if (pedido.estado == 7)
                    pedido.estado = "Cargado";
    }
    
    $scope.$on('$ionicView.loaded',function(){
        console.log('entrando a la funcion on');
         if (angular.isUndefined($rootScope.tokenAuth)) {
            $state.go('login');
        }
        else {
        initView();
        }
        console.log('saliendo de la funcion on')
    });
}