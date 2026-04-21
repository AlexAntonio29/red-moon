export class MaquinaEstados{

    constructor(objeto){

        this.objeto=objeto;

        this.estados={};

        this.estadoActual=null;


    }


    agregarEstado(nombre,estado){
        this.estados[nombre]=estado;
    }

    cambiarEstado(nuevoEstadoNombre){

        if(this.estadoActual) this.estadoActual.exit();

        this.estadoActual=this.estados[nuevoEstadoNombre];

        if(this.estadoActual)this.estadoActual.enter();

    }

    actualizar(){

        if(this.estadoActual)
            this.estadoActual.execute();
    }
}