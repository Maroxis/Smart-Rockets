// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

function Population(size,col) {
  this.rockets = [];
  this.popsize = size;
  this.matingpool = [];
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket(null,col);
  }

  this.evaluate = function() {
      finished = 0;
      HFit = 0;
      for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      AFit += this.rockets[i].fitness;
      if (this.rockets[i].fitness > HFit)
        HFit = this.rockets[i].fitness
    }
    if(HFit > TFit)
      TFit = HFit
    AFit = floor(AFit/this.popsize)

  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
 
      var parentA = this.acceptReject()
      var parentB = this.acceptReject();
      
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child,col);
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
      var r = random(0,HFit)
      if(rocket.fitness > r)
        return rocket.dna;
      }
  }
}