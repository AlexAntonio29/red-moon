import { GolpeadoEnemies } from "../../../enemies/Enemies/EstadosEnemies/GolpeadoEnemies.js";

export class GolpeadoBoss1 extends GolpeadoEnemies{

    enter(){
        console.log(this.objeto.state)

        

        this.objeto.state='golpeado';
        super.enter()
    }

}