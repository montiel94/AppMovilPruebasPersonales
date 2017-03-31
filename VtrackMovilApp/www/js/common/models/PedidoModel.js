angular.module('PedidoModel',[])
.factory('Pedido',Pedido)

function Pedido(){
    
    function Pedido(Codigo,Estado,FechaCreacion,Cola,Cabezote,Chofer,Inicio,Fin){
        this.Codigo = Codigo;
        this.Estado = Estado;
        this.FechaCreacion = FechaCreacion;
        this.Cola = Cola;
        this.Cabezote = Cabezote;
        this.Chofer = Chofer;
        this.Inicio = Inicio;
        this.Fin = Fin;
    }
    
    Pedido.build = function(data){
        if(!data)
            return null;
        return new Pedido(data.Codigo,data.Estado,data.FechaCreacion,data.Cola,data.Cabezote,data.Chofer,data.Inicio,data.Fin);
    }
    
    return Pedido;
}