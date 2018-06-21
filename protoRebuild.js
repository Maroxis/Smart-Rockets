function rebuild(population){
  reattachMethods(population,Population)
  reattachMethods(population.his,hist)
  reattachMethods(population.longHis,hist)
  for (var i = 0; i < population.rockets.length; i++){
    reattachMethods(population.rockets[i],SmartRocket)
    reattachMethods(population.rockets[i].dna,DNA)
    reattachMethods(population.rockets[i].brain,Brain)
  }
}
function reattachMethods(serialized,originalclass) {
    serialized.__proto__ = originalclass.prototype; 
}
