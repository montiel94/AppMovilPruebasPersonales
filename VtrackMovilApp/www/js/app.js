// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','starter.controllers','PedidosModule','ServicesModule','DetalladoPedidoModule','ModificarPasswordModule','PerfilModule','LoginModule'])
.constant("BASE_URL", "http://192.168.0.104:8080/webservice.servicio/api")

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      
      
      //FCMPlugin.subscribeToTopic('montiel94');
      
    FCMPlugin.getToken(
  function(token){
    console.log(token);
  },
  function(err){
    console.log('error retrieving token: ' + err);
  });
      
      FCMPlugin.onNotification(
  function(data){
    if(data.wasTapped){
      //Notification was received on device tray and tapped by the user.
      console.log( JSON.stringify(data) );
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.
      console.log( JSON.stringify(data) );
    }
  },
  function(msg){
    console.log('onNotification callback successfully registered: ' + msg);
  },
  function(err){
    console.log('Error registering onNotification callback: ' + err);
  }
);
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'js/app/menu/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.perfil',{
      url: '/perfil',
      views:{
          'content':{
              templateUrl:'js/app/main/perfil.html',
              controller: 'PerfilController',
              resolve : {
                  usuario : function(PerfilService){
                      return PerfilService.getUsuario();
                  }
          }
      }
      }
  })
    .state('app.pedidos',{
      url: '/pedidos',
      views:{
          'content':{
              templateUrl:'js/app/pedidos/pedidos.html',
              controller:'PedidosController',
              resolve : {
                  pedidos : function (PedidosService){
                      return  PedidosService.getAllPedidos();
                  }
              }
          }
      }
  })
    .state('app.detalladopedido',{
      url: '/pedidodetallado/:codigoPedido',
      views:{
          'content':{
              templateUrl:'js/app/detallepedido/detalladopedido.html',
              controller : 'DetalladoPedidoController',
              resolve : {
                  pedido : function(PedidoDetalladoService,$stateParams){
                      return PedidoDetalladoService.getPedido($stateParams.codigoPedido);
                  }
              }
          }
      }
  })
    .state('app.modificarpassword',{
      url: '/modificarpassword',
      views:{
          'content':{
              templateUrl:'js/app/modificarpassword/modificarpassword.html',
              controller : 'ModificarPasswordController'
              }
          }
      }
      
  )
    .state('login',{
      url: '/login',
      templateUrl:'js/app/login/Login.html',
      controller : 'LoginController'
      }
      
  )
  /*.state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });*/
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');
});
