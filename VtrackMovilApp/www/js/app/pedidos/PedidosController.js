angular.module('PedidosModule')
.controller('PedidosController',['$scope','Pedido','pedidos','$rootScope',PedidosController]);

function PedidosController($scope,Pedido,pedidos,$rootScope)
{

    var initView = function (){
        console.log('entrando a la funcion initView');
        modificarEstados();
        $scope.pedidos = pedidos;
        console.log('saliendo de la funcion')
    }
    
    function modificarEstados(){
        
        for(pedido in pedidos) {
                if (pedidos[pedido].estado == 0)
                    pedidos[pedido].estado = "En espera";
                if (pedidos[pedido].estado == 1)
                    pedidos[pedido].estado = "En Turno para Llenado";
                if (pedidos[pedido].estado == 2)
                    pedidos[pedido].estado = "Autorizado y Llamado a Llenado";
                if (pedidos[pedido].estado == 3)
                    pedidos[pedido].estado = "Pesado Inicial";
                if (pedidos[pedido].estado == 4)
                    pedidos[pedido].estado = "Llenando";
                if (pedidos[pedido].estado == 5)
                    pedidos[pedido].estado = "Llenado";
                if (pedidos[pedido].estado == 6)
                    pedidos[pedido].estado = "Pesado Final";
                if (pedidos[pedido].estado == 7)
                    pedidos[pedido].estado = "Cargado";
            }
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