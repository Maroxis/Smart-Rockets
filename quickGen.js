self.importScripts('sketch.js','config.js')//,'population.js'

onmessage = function (oEvent) {
  var ammount = oEvent.data*1
  
  var d = new Date()
  var time = d.getTime()
  
  while (!makeSimulation()) // finish curent generation
  {}
  while (ammount > 1) { //ammount - current gen => 1
    if (makeSimulation()) // do simulation, if full gen completed amount --
      ammount--
  }
  
  d = new Date()
  time = d.getTime() - time
  var dec = (time+"").split(".")
  time = (Math.floor(time/1000)+"."+(time+"").split("."))
  
  postMessage("done " + time);//oEvent.data
};