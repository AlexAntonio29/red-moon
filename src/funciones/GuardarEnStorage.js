/*Los helpers ayudan a guardar una logica repetitiva que no va mucho con el apartado
de un componente
*/


export const GuardarEnStorage =(clave, item )=>{

    //conseguir los elementos en el local storage
    let elementos = JSON.parse(localStorage.getItem(clave));

    

    console.log(elementos);

    //comprobar si es un array

    //if(Array.isArray(elementos)){
        //guardar dentro del array un elemento nuevo
      //  elementos.push(item)

   // }else{
        //crear un array con el elemento nuevo
        if(item!==null){
        elementos= [item];     
    //guardar en el localStorage
    localStorage.setItem(clave,JSON.stringify(elementos));
    
    }

    return elementos;
        

   // }


    //Devolver un objeto

    //return item;   
     


}