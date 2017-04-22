angular.module('LoginModule')
.controller('LoginController',['$scope','$cordovaToast','$rootScope','LoginService','$state',LoginController]);

function LoginController($scope,$cordovaToast,$rootScope,LoginService,$state)
{
    var view = $scope;
    
    $scope.botonAceptar = function (){
        console.log('entrando a la funcion botonAceptar');
        if (validaCampos())
        {
            var authsucess = "";
        	LoginService.login(view.correo,view.password)
                .then(function(data){
                    console.log('se realizo login exitosamente');
                    var error = data;
                    var authsucess =  data.valor;
                    authRecibidoSolicitarToken(data);
                })
                .catch(function (error) {
                    console.log('se produjo un error en el login');
                    mostrarError(error,'long','bottom');
                

                });
        }
        console.log('saliendo de la funcion botonAceptar');
    }
    
    /*
          funcion que valida los campos de correo electronico y
          contresena, devuelve false en caso que uno de los input
          no cumpla con condicion
          true en caso de que todos los inputs cumplan
      */
     function validaCampos() {
         console.log('entrando a la funcion validaCampos');
         var regEx = /^[a-z0-9]+$/i;
         if (!view.correo) {
             mostrarError('El campo correo electronico es obligatorio','long','bottom');
             return false;
         }
         if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(view.correo))
         {
             mostrarError('Correo electronico no cumple con formato','long','bottom');
             return false;
         }
         if (!view.password)
         {
             mostrarError('El campo contraseña es obligatorio','long','bottom');
             return false;
         }
         if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(view.password))
         {
             mostrarError('El campo contraseña no cumple con formato','long','bottom');
             return false;
         }
         return true;
         console.log('saliendo de la funcion validaCampos','long','bottom');
     }
    
    function mostrarError(message,duration,location){
            console.log('entrando a la funcion mostrarError');
            $cordovaToast.show(message,duration,location)
            console.log('saliendo de la funcion mostrarError');
        }
     
    
    
    function authRecibidoSolicitarToken(auth) {
        console.log('entrando al metodo authRecibidoSolicitarToken');
        LoginService.getToken(auth)
            .then(function(data){
                console.log('se realizo login exitosamente');
                var error = data;
                $rootScope.tokenAuth = data.valor;
                $rootScope.correouser = view.correo;
                //FCMPlugin.subscribeToTopic('montiel94');
                registrarFCM();
                $state.go( 'app.pedidos' );
            })
            .catch(function (error) {
                console.log('se produjo un error en el login');
                mostrarError(error,'long','bottom');
            });
        console.log('saliendo del metodo authRecibidoSolicitarToken');
    }
    
    function registrarFCM(){
        var correo = view.correo;
        var fcm = correo.replace("@","~");
        FCMPlugin.subscribeToTopic(fcm);
    }
}