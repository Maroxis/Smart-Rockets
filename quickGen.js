self.importScripts('sketch.js','config.js','population.js','rocket.js','dna.js','history.js')

onmessage = function (oEvent) {
  count = 0
  var ammount = oEvent.data.amm
  var population = JSON.parse(oEvent.data.p)
  rebuild(population)
  var d = new Date()
  var time = d.getTime()
  
  while (!makeSim(population)) // finish curent generation
  {}
  while (ammount > 1) { //ammount - current gen => 1
    if (makeSim(population)) // do simulation, if full gen completed amount --
      ammount--
  }
  
  d = new Date()
  time = d.getTime() - time
  var dec = (time+"").split(".")
  time = (Math.floor(time/1000)+"."+(time+"").split("."))
  JSON.stringify(population)
  var msg ={p: population, id: oEvent.data.id, amm: oEvent.data.amm, time: time}
  postMessage(msg);//oEvent.data //+ time  + oEvent
};

function makeSim(population) {
  if(population.run())
    count = lifespan;
  else
    count++;
    
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    population.LAFit += population.AFit
    population.his.log(population.AFit, population.HFit, gen)
    if (gen % longH === 0 || gen == 1) {
      for(var i = 0; i < populations.length; i++){
        population.LAFit /= longH
        population.longHis.log(population.LAFit, gen) // finished,
        population.LAFit = 0;
      }
    }

    gen++;
    count = 0;
  
    return true; //whole generation completed
  }
}
function rebuild(population){
  reattachMethods(population,Population)
  reattachMethods(population.his,hist)
  reattachMethods(population.longHis,hist)
  for (var i = 0; i < 20; i++){
    reattachMethods(population.rockets[i],Rocket)
    reattachMethods(population.rockets[i].dna,DNA)
  }
}
function reattachMethods(serialized,originalclass) {
    serialized.__proto__ = originalclass.prototype; 
}