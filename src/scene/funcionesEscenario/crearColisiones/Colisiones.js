export class colisiones{

    constructor(scene){

        this.scene=scene;

        
    }

    
//LLAMAR A TODAS LAS COLISIONES
crearColisiones(){
  this.scene.collisionRecogerItemPuntos();
 
  this.scene.collisionMurosObjetos(this.scene.player.getContainer());
 

  this.scene.collisionPlayerEnemigo();
  
}


//FUNCIONES DE LAS COLISIONES

//GLOBAL
  //colision al contacto del player con el enemigo
 collisionPlayerEnemigo(){
        
   this.scene.colisionEnemigoPlayer=this.scene.physics.add.collider(this.scene.player.getContainer(),this.scene.listaEnemigos,
   (player,enemigo)=>{
    this.scene.player.contactoPlayerEnemigo(player, enemigo,this.scene);
   },null,this);

}

//GLOBAL
//colision entre los enemigos para que no transpasen
      collisionEnemigoEnemigo(){
 // this.scene.physics.collider();

    this.scene.physics.add.collider(this.scene.listaEnemigos, this.scene.listaEnemigos);


}
//colision de arboles para que el player no las pase


//GLOBAL
      collisionMurosObjetos(objeto){//el collider llegara por un parametro

      //objetos tierra da entender al abismo de la zona


      //dar collider a los graficos 



   

        
        if(objeto && this.scene.fondo)
  //tierra  zona abismo
{
        if(this.scene.fondo.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.scene.fondo.setCollisionByExclusion([-1]);
  
        this.scene.physics.add.collider(objeto,this.scene.fondo);
      
}

        if(objeto && this.scene.above_collider){




         
  //objetos de la zona
        if(this.scene.above_collider.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.scene.above_collider.setCollisionByExclusion([-1])
        
        const nombreObjeto=objeto.nombre;
        this.scene.contactoAbove_collider=this.scene.physics.add.collider(objeto,this.scene.above_collider,(obj,tile)=>{

          //console.log(obj);
          if(nombreObjeto==='boss1'){
            objeto.tocandoMuro=true;
          }
  
        });
      }

         if(objeto && this.scene._above_collider){
  //objetos de la zona
        if(this.scene._above_collider.layer.properties.find(p=>p.name==="collider"&&p.value===true))
          this.scene._above_collider.setCollisionByExclusion([-1])

       this.scene.contacto_Above_collider= this.scene.physics.add.collider(objeto,this.scene._above_collider,()=>{
  
        });
      }
        



        if(objeto && this.scene.above){
  //above para que este encima del player
          if(this.scene.above.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this.scene.above.setCollisionByExclusion([-1]);
        this.scene.physics.add.collider(objeto,this.scene.above);

        this.scene.above.setDepth(10);
        objeto.setDepth(5);



}


       if(objeto && this.scene._above){
  //above para que este encima del player
          if(this.scene._above.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this.scene._above.setCollisionByExclusion([-1]);
        this.scene.physics.add.collider(objeto,this.scene._above);

        this.scene._above.setDepth(10);
        objeto.setDepth(5);



}


if (objeto && this.scene.blockLayer) {
   
    if (this.scene.blockLayer.layer.properties.find(p => p.name === "collider" && p.value === true)) {
        this.scene.blockLayer.setCollisionByExclusion([-1]);
    }

   
    this.scene.physics.add.collider(
        objeto,               
        this.scene.blockLayer,      
        ()=>{},  
        this.scene.checkCondicionBloque, 
        this                 
    );
}





       if(objeto && this.scene._above2){
  //above para que este encima del player
          if(this.scene._above2.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this.scene._above2.setCollisionByExclusion([-1]);
        this.scene.physics.add.collider(objeto,this.scene._above2);

        this.scene._above2.setDepth(10);
        objeto.setDepth(5);



}


  let ultimoEstado=null;
    
       if(objeto && this.scene._above3_decoration){
  //above para que este encima del player
          if(this.scene._above3_decoration.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this.scene._above3_decoration.setCollisionByExclusion([-1]);

        this.scene.physics.add.collider(objeto,this.scene._above3_decoration);



      objeto.setDepth(5);
      this.scene._above3_decoration.setDepth(10);

}



//generar depth a _suelo4


       if(objeto && this.scene._above4_antorcha){
  //above para que este encima del player
          if(this.scene._above4_antorcha.layer.properties.find(p=>p.name==="collider"&&p.value===false))
            this.scene._above4_antorcha.setCollisionByExclusion([-1]);

        this.scene.physics.add.collider(objeto,this.scene._above4_antorcha);



      objeto.setDepth(5);
      this.scene._above4_antorcha.setDepth(10);

}





    if(objeto.nombre='player' && this.scene._suelo){

      

        this.scene.physics.add.overlap(this.scene.player.getContainer(),this.scene._suelo,(objeto, tile)=>{

          if(tile.index!==-1&&tile.properties.tipo_piso!==undefined){
            //console.log(tile.properties);
            this.scene.player.getSoundPiso(tile.properties.tipo_piso);
          }
          
        })
      


    }




      }

      //

      


      //colisiones Enemigos Tiles

      //GLOBAL
      collisionEnemigosMuros(){
        

      this.scene.physics.add.collider(this.scene.listaEnemigos,this.scene.muros);
                  
      }



      



      //GLOBAL
        contactoPlayerItem(player,item){

          //console.log(item.puntos);

          let numAleatorio=Math.floor(Math.random() * (3 - 1 + 1)) + 1;

          let recogerPuntos = this.scene.sound.add('point'+numAleatorio, {
    loop: false,
    volume: 0.3   // volumen entre 0 y 1
  });

            recogerPuntos.play();

          this.scene.puntos=Number(this.scene.puntaje.text);

          

          
          
          //organizar puntos en items


            


           this.scene.puntos+=Number(item.puntos);
           this.scene.lights.removeLight(item.light);
            this.scene.items_punto.remove(item,true,true);

            
            /*
            let puntosTemporales=0;

            itemsOrganicos.map(item=>{
              puntosTemporales=puntosTemporales+(parseInt(item.cantidad)*parseInt(item.puntos));
            });
            itemsInorganicos.map(item=>{
                 puntosTemporales=puntosTemporales+(parseInt(item.cantidad)*parseInt(item.puntos));
            });*/
            
            

            //this.scene.puntos=parseInt(this.scene.puntos)+parseInt(item.puntos);
            //console.log("puntos: "+this.scene.puntos);
            
            this.scene.puntaje.setText((this.scene.puntos));
            //Al superar cierta cantidad de puntos aparecera un nuevo enemigo
             if(parseInt(this.scene.puntos) >this.scene.puntosCreacionEnemigo){
               
              this.scene.puntosCreacionEnemigo=this.scene.puntosCreacionEnemigo+200;
              
              if(this.scene.topeCreacionEnemigos<1000)
                this.scene.topeCreacionEnemigos+=10;
            }


        
        }

      //GLOBAL  
//colision para cuando el player recoge el itemBasura
      collisionRecogerItemPuntos(){

        this.scene.physics.add.overlap(
        this.scene.player.getContainer(),
        this.scene.items_punto,
        this.contactoPlayerItem,null,this
    );

    

    
}  




}