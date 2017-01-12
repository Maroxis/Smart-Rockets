// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

var state = 0;
var populations = [];
var maxFitness;
var statCanv

var obstacles = [];
var workers =[];

//Timer
var count
var sec
var gen

function preload(){
}
function setup() {
   if (typeof(Worker) !== "undefined") {
     console.log(" Worker ok")
  }

  frameRate(60)
  count = 0;
  sec = 0;
  gen = 1;

  createCanvas(canvasSize[0], canvasSize[1]);
  uiCanv = new p5(uiCanvas);
  if (drawStats)
    statCanv = new p5(statCanvas);
  infoCanv = new p5(infoCanvas);
  ///rockets
  //rocket = new Rocket();
  //var col = color(0,255,255,128)
  for(var i = 0; i < popNum; i++){
    if(popColors[i])
      populations.push(new Population(popSize,popColors[i]))
    else
      populations.push(new Population(popSize))
  }
  //fitness
  maxFitness = width * targetBonus * timeBonus;
  maxFitness = floor(pow(maxFitness, 2))
  
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

function terminateWorkers(){
  for(var i = 0; i < popNum; i++){
  workers[i].terminate()
  }
}
function quickSim(ammount) {
  
  for(var i = 0; i < popNum; i++){
  workers[i] = new Worker("./quickGen.js")
    workers[i].onmessage = function (oEvent) {
      var id = oEvent.data.id *1
      var p = oEvent.data.p
      rebuild(p)
      populations[id] = p
      workersDone++
      if(workersDone == popNum){
        count = 0;
        gen += oEvent.data.amm
        console.log(oEvent.data.amm+" gen. done in " +oEvent.data.time+ " sec" )
        loop()
        terminateWorkers()
      }
   };
  }
  
  noLoop()
  workersDone = 0
  for(var i = 0; i < popNum; i++){
  var obst =  JSON.stringify(obstacles)
  var population = JSON.stringify(populations[i])
  var tar = JSON.stringify(target)
  var message = {p: population, amm: ammount, c: count, id: i, obst: obst, tar: tar, gen: gen}
  workers[i].postMessage(message)
  }
}

function makeSimulation() {
        
  var genDone = true;
   for(var i = 0; i < populations.length; i++){
     if(!populations[i].run() && genDone)
       genDone = false;
   }
  if(genDone)
    count = lifespan;
  else
    count++;
    
   if (count == lifespan) {

   for(var i = 0; i < populations.length; i++){
     populations[i].evaluate();
     populations[i].selection();
     populations[i].LAFit += populations[i].AFit
     populations[i].his.log(populations[i].AFit, populations[i].HFit, gen)
   }
  //   if (gen % longH === 0 || gen == 1) {
  //     for(var i = 0; i < populations.length; i++){
  //       populations[i].LAFit /= longH
  //       populations[i].longHis.log(populations[i].LAFit, gen) // finished,
  //       populations[i].LAFit = 0;
  //     }
  //   }

    gen++;
    count = 0;

    return true; //whole generation completed
  }

}

function draw() {
  background(0);

  if (state !== 0)
    makeSimulation()
    
  if (drawStats)
    statCanv.drawScore()
  infoCanv.update()

  //rockets
  for(var i = 0; i < populations.length; i++){
    for (var j = 0; j < populations[i].popsize; j++) {
      populations[i].rockets[j].show();
    }
  }
  fill(255);
  //obstacles
  for (var i = 0; i < obstacles.length; i++)
    obstacles[i].draw();
  fill(255, 0, 0);
  //target
  ellipse(target.x, target.y, 16, 16);
}