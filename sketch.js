// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

var state = 0;

//Rockets
var population;
var smartPopulation;

//Fitness
var HFit = 0; //top of curent gen
var AFit = 0; //avarge
var LAFit = 0; // longterm avarge fitness
var TFit = 0; //top of all time
//var finished; //num of rockets that hit target in cur. gen

var maxFitness;

//Stat Logs
var statCanv
var statHist = new history(histLenght)
var LongStatHist = new history(histLenght)

var obstacles = []

//target
var target;

//Dom
var lifeP
var fitnessP
var btStart
var btAddObst
var inp
var obstPropDiv

var obstW
var obstH


//Timer
var count
var sec
var gen


function setup() {
  frameRate(60)
  count = 0;
  sec = 0;
  gen = 1;

  createCanvas(400, 300);
  if (drawStats)
    statCanv = new p5(statCanvas);

  dom() // dom.js

  ///rockets
  //rocket = new Rocket();
  var col = color(0,255,255,128)
  population = new Population(popSize,col);

  //fitness
  maxFitness = width * targetBonus * timeBonus;
  maxFitness = floor(pow(maxFitness, 2))
    //target
  target = createVector(width / 2, 50);
}

function quickSim() {
  noLoop()
  while (!makeSimulation()) // finish curent generation
  {}
  var ammount = parseInt(inp.value()) - 1

  while (ammount > 0) {
    if (makeSimulation()) // do simulation, if full gen completed amount --
      ammount--
  }
  loop()
}

function makeSimulation() {
  
  if (population.run())
    count = lifespan
  else
    count++;

  if (count == lifespan) {

    population.evaluate();
    population.selection();

    LAFit += AFit

    if (gen % longH === 0 || gen == 1) {
      LAFit /= longH
      LongStatHist.log(LAFit, gen) // finished,
      LAFit = 0;
    }

    statHist.log(AFit, finished, gen)

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

  lifeP.html("frames: " + count + " sec: " + sec + " Generation: " + gen);
  fitnessP.html("Highest fitness: " + HFit + " Avarge fitness: " + AFit);

  //rockets
  for (var i = 0; i < population.popsize; i++) {
    population.rockets[i].show();
  }
  fill(255);
  //obstacles
  for (var i = 0; i < obstacles.length; i++)
    obstacles[i].draw();
  fill(255, 0, 0);
  //target
  ellipse(target.x, target.y, 16, 16);
}