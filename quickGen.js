self.importScripts('protoRebuild.js','config.js','population.js','dna.js','history.js','obstacle.js','smartRocket.js','brain.js')
function init(oEvent){
  gen = oEvent.data.gen
  count = oEvent.data.c
  ammount = oEvent.data.amm
  population = JSON.parse(oEvent.data.p)
  rebuild(population)
  obstacles = []
  obstacles = JSON.parse(oEvent.data.obst);
   for(var i = 0; i < obstacles.length; i++){
     reattachMethods(obstacles[i],Obstacle)
   }
   segments = []
   segments = JSON.parse(oEvent.data.seg)
   target = JSON.parse(oEvent.data.tar)
}
onmessage = function (oEvent) {
  init(oEvent)
  
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
        population.LAFit /= longH
        population.longHis.log(population.LAFit, gen) // finished,
        population.LAFit = 0;
    }

    gen++;
    count = 0;
  
    return true; //whole generation completed
  }
}