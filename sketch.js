// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

var state = 0;
var populations = [];
var maxFitness;
var statCanv
var obstacles = [];
var target;

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
  for(var i = 0; i < popColors.length; i++)
    popColors[i] = color(popColors[i][0],popColors[i][1],popColors[i][2],128)

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
    //target
  target = createVector(width / 2, 50);
}

function quickSim(ammount) {
  noLoop()
  qsWorker = new Worker("quickGen.js")
  qsWorker.onmessage = function (oEvent) {
    console.log("Worker said : " + oEvent.data);
    loop()
  };
  qsWorker.postMessage(ammount)
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
    if (gen % longH === 0 || gen == 1) {
      for(var i = 0; i < populations.length; i++){
        populations[i].LAFit /= longH
        populations[i].longHis.log(populations[i].LAFit, gen) // finished,
        populations[i].LAFit = 0;
      }
    }

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