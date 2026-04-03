
import { Bosses } from "./Bosses.js";

export class boss1 extends Bosses {

        constructor(scene, dataEnemie, x=0,y=0){


            

        super(scene,dataEnemie,x,y);

        //this.distanciaAtaque=scene.physics.add.sprite(0,0,null);

        //this.distanciaAtaque.body.setSize(300,300);
        this.setDisplaySize(374,374);

        this.setOrigin(0,0);
        this.body.setSize(50,50);
        this.body.setOffset(150,150);

        this.hitbox.body.setSize(this.displayWidth+100,this.displayHeight+100);
        this.hitbox.setOrigin(0,0);
        this.hitbox.body.setOffset(-50,-50);



        this.getFuncionTransicion();

    }


    getFuncionTransicion(){

        let lenguaje=['detecta','cerca','lejos','ultraLejos','choca','pierdePlayer'];


        let estados=['idle','seguir','atacar','correr','aturdido'];

        //aqui se creara la funcion de transicion del enemigo

           
            let delta={
                idle:{
                    detecta:'seguir'
                },

                seguir:{
                    cerca:'atacar',
                    ultralejos:'correr'
                },

                atacar:{
                    lejos:'seguir'
                },

                correr:{
                    choca:'aturdido',
                    pierdaPlayer:'idle'
                },

                aturdido:{
                    cerca:'atacar',
                    lejos:'seguir',
                }

            };

            console.log(delta);

        
            



    }

    

    setMovimientoEnemigo(player,contacto,contactoAtaque,contactoEnemigo){
        super.setMovimientoEnemigo(player,contacto,contactoAtaque,contactoEnemigo);

        //this.distanciaAtaque.setPosition(this.x,this.y);

    }
}