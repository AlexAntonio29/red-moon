
export const eventosTemporales=(scene)=>{

    for(let i=scene.listaEventosTemporales.length-1;i>=0;i--){

        const evento= scene.listaEventosTemporales[i];

            if(evento.update()){

                 console.log(evento.finalizarEvento);

                if(!evento.finalizarEvento){
                  
                   
                evento.update();

}
               
            }
    }
}

export const eliminarEventoTemporal =(scene)=>{
     for(let i=scene.listaEventosTemporales.length-1;i>=0;i--){ 

        //debe de existir la variable finalizar evento en los eventos que se ocupan

         const evento= scene.listaEventosTemporales[i];

                    if(evento.finalizarEvento){
                    scene.listaEventosTemporales.splice(i,1);}
                }
}


