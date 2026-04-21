export const lightplayer =(scene)=>{

     let xPlayer=scene.player.getContainer().displayWidth/2;
   let yPlayer=scene.player.getContainer().displayHeight/2;

  scene.lightToPlayer.setPosition((scene.player.getContainer().x)+xPlayer,(scene.player.getContainer().y)+yPlayer);

 // console.log("player x: "+)

}