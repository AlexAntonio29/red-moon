export const movimientosNpc=(scene)=>{
  scene.listaNpc.children.iterate(npc=>{

    npc.setMovimientoNpc(scene, scene.player)
  })
}