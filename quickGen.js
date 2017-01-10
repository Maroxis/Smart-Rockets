//self.importScripts('sketch.js','config.js')//,'population.js'

onmessage = function (oEvent) {
  var ammount = oEvent.data.amm
  var population = JSON.parse(oEvent.data.p)
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
  postMessage("worker "+oEvent.data.id+" done in"+time+" sec");//oEvent.data //+ time  + oEvent
};

function makeSim(population) {
  console.log(population)
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
