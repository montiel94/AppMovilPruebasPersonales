angular.module('PerfilModule')
.controller('PerfilController',['$scope','usuario',PerfilController]);

function PerfilController($scope,usuario)
{

    var initView = function (){
        console.log('entrando a la funcion initView');
        $scope.usuario = usuario;
        console.log('saliendo de la funcion')
    };
    
    
    $scope.$on('$ionicView.loaded',function(){
        console.log('entrando a la funcion on');
        initView();
        console.log('saliendo de la funcion on')
    });
}