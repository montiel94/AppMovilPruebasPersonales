angular.module('ModificarPasswordModule')
.controller('ModificarPasswordController',['$scope','$cordovaToast','PerfilService',ModificarPasswordController]);

function ModificarPasswordController($scope,$cordovaToast,PerfilService)
{

    var view = $scope;
    $scope.formData = {};
    var initView = function (){
        console.log('entrando a la funcion initView');
        console.log('saliendo de la funcion')
    };
    
    
    $scope.$on('$ionicView.loaded',function(){
        console.log('entrando a la funcion on');
        initView();
        console.log('saliendo de la funcion on')
    });
    
    $scope.aceptarModificarPassword = function(){
        console.log('entrando a la funcion aceptarModificarPassword');
        if (validarPassword()){
            console.log('password aceptada');
            PerfilService.confirmarPassword('dmscanniello@gmail.com',$scope.formData.passwordactual)
                .then(function(data){
                    console.log('se realizo consulto exitosamente');
                    if(data==true)
                        asentarModificacionPassword();
                    if (data==false)
                        mostrarError('Contraseña actual invalida','long','bottom');
                    
                })
                .catch(function (error) {
                    console.log('se produjo un error en el login');
                    //mostrarError(error);

                });
        }
        console.log('saliendo de la funcion aceptarModificarPassword');
    }
    
    
        /*
         funcion que valida todos los campos de cambio de contrasena
         */
        function validarPassword() {
            console.log('entrando al metodo validar');
            if (!$scope.formData.passwordactual) {
                mostrarError('El campo de contraseña actual es obligatorio','long','bottom');
                console.log('error 6');
                return false;
            }
            if (!$scope.formData.password) {
                mostrarError('El campo contraseña nueva es obligatorio','long','bottom');
                console.log('error 1');
                return false;
            }
            if (!$scope.formData.passwordConfirmacion) {
                mostrarError('El campo confirmación de contraseña nueva es obligatorio','long','bottom')
                console.log('error 2');
                return false;
            }
            if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test($scope.formData.passwordactual)
                || ($scope.formData.passwordactual < 6)) {
                mostrarError('El campo contraseña actual no cumple con requisitos','long','bottom')
                console.log('error 7');
                return false;
            }
            if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test($scope.formData.password)
                || ($scope.formData.password < 6)) {
                mostrarError('El campo contraseña nueva no cumple con requisitos','long','bottom')
                console.log('error 3');
                return false;
            }
            if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test($scope.formData.passwordConfirmacion)
                || ($scope.formData.passwordConfirmacion < 6)) {
                mostrarError('El campo confirmación de contraseña nueva no cumple con requisitos','long','bottom')
                console.log('error 4');
                return false;
            }
            if ($scope.formData.password != $scope.formData.passwordConfirmacion) {
                mostrarError('La contraseña y su confirmación son distintos','long','bottom');
                console.log('error 5');
                return false;
            }
            return true;
            console.log('saliendo del validar validar');
        }
        
        function mostrarError(message,duration,location){
            console.log('entrando a la funcion mostrarError');
            $cordovaToast.show(message,duration,location)
            console.log('saliendo de la funcion mostrarError');
        }
    
        function asentarModificacionPassword(){
            console.log('entrando a la funcion asentarModificacionPassword');
            PerfilService.asentarModificacionPassword('dmscanniello@gmail.com',$scope.formData.passwordConfirmacion)
                .then(function(data){
                    console.log('se realizo modifico exitosamente');
                    mostrarError('Su contraseña se modificó correctamente','long','bottom');
                })
                .catch(function (error) {
                    console.log('se produjo un error en el login');
                    //mostrarError(error);

                });
            console.log('saliendo de la funcion asentarModificacionPassword');
        }
}