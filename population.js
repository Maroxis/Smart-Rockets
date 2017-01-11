// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

Population = function(size,col) {
  this.rockets = [];
  this.popsize = size;
  this.his = new hist(histLenght)
  this.longHis = new hist(LHstLenght)
  
  if(!col)
  {
    var c1 = floor(random(20,200))
    var c2 = floor(random(20,200))
    var c3 = floor(random(20,200))
    this.col = 'rgba('+c1+','+c2+','+c3+')'
  }
  else
    this.col = col
    
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket(null,this.col);
  }
}
  Population.prototype.HFit = 0; //top of curent gen
  Population.prototype.AFit = 0; //avarge
  Population.prototype.LAFit = 0; // longterm avarge fitness
  Population.prototype.TFit = 0; //top of all time
  
  Population.prototype.evaluate = function() {
      this.HFit = 0;
      var siz = this.popsize;
      for (var i = 0; i < siz; i++) {
      this.rockets[i].calcFitness();
      this.AFit += this.rockets[i].fitness;
      if (this.rockets[i].fitness > this.HFit)
        this.HFit = this.rockets[i].fitness
    }
    if(this.HFit > this.TFit)
      this.TFit = this.HFit
    this.AFit = Math.floor(this.AFit/this.popsize)*1
  }

  Population.prototype.selection = function() {
    var newRockets = [];
    var length = this.rockets.length
    for (var i = 0; i < length; i++) {
 
      var parentA = this.acceptReject()
      var parentB = this.acceptReject();
      
      
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child,this.col);
    }
    this.rockets = newRockets;
  }

  Population.prototype.run = function() {
    var GenFin = true // all rockets crashed or finished
    var size = this.popsize
    for (var i = 0; i < size; i++) {
      if(!this.rockets[i].update() && GenFin)
         GenFin = false
    }
    return GenFin
  }
  Population.prototype.acceptReject = function(){
      do{
        var ind = Math.floor(Math.random() * this.rockets.length)
        var rocket = this.rockets[ind]
        var r = Math.random()*this.HFit
        var fit = rocket.fitness
      }
      while(fit < r)
      return rocket.dna;
  }
