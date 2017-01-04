// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

function Population(size,col) {
  this.rockets = [];
  this.popsize = size;
  this.matingpool = [];
  this.HFit = 0; //top of curent gen
  this.AFit = 0; //avarge
  this.LAFit = 0; // longterm avarge fitness
  this.TFit = 0; //top of all time
  if(!col)
  {
    var c1 = floor(random(63,255))
    var c2 = floor(random(63,255))
    var c3 = floor(random(63,255))
    this.col = color(c1,c2,c3,128)
  }
  else
    this.col = col
    
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket(null,this.col);
  }

  this.evaluate = function() {
      finished = 0;
      this.HFit = 0;
      for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      this.AFit += this.rockets[i].fitness;
      if (this.rockets[i].fitness > this.HFit)
        this.HFit = this.rockets[i].fitness
    }
    if(this.HFit > this.TFit)
      this.TFit = this.HFit
    this.AFit = floor(this.AFit/this.popsize)

  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
 
      var parentA = this.acceptReject()
      var parentB = this.acceptReject();
      
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child,this.col);
    }
    this.rockets = newRockets;
  }

  this.run = function() {
    var GenFin = true // all rockets crashed or finished
    for (var i = 0; i < this.popsize; i++) {
      if(!this.rockets[i].update())
         GenFin = false
    }
    return GenFin
  }
  this.acceptReject = function(){
      while(true){
      var rocket = random(this.rockets)
      var r = random(0,this.HFit)
      if(rocket.fitness > r)
        return rocket.dna;
      }
  }
}