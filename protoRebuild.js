function rebuild(population){
  reattachMethods(population,Population)
  reattachMethods(population.his,hist)
  reattachMethods(population.longHis,hist)
  for (var i = 0; i < population.posize; i++){
    reattachMethods(population.rockets[i],Rocket)
    reattachMethods(population.rockets[i].dna,DNA)
  }
}
function reattachMethods(serialized,originalclass) {
    serialized.__proto__ = originalclass.prototype; 
}
