// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

Rocket = function(dna,col) {
  this.pos = {x:canvasSize[0] / 2,y:canvasSize[1]};
  this.vel = {x:0,y:0}
  this.acc = {x:0,y:0}
  this.lifespan = 0;
  this.completed = false;
  this.crashed = false;
  this.fitness = 0;
  this.col = col

  if(dna) 
    this.dna = dna;
  else 
    this.dna = new DNA();
}
  
  
  Rocket.prototype.applyForce = function(force) {
    this.acc.x += force.x;
    this.acc.y += force.y;
  }

  Rocket.prototype.calcFitness = function() {
    if (this.completed) {
      //finished += 1
      this.fitness = canvasSize[0]*1
      this.fitness *= targetBonus;
      this.fitness *= ((this.lifespan-20)/(lifespan-20))*(1-timeBonus)+timeBonus
    }
    else{
      var d = Math.sqrt( (this.pos.x-target.x)*(this.pos.x-target.x) + (this.pos.y-target.y)*(this.pos.y-target.y) )
      this.fitness = Math.floor((d/canvasSize[0])*(1-canvasSize[0])+canvasSize[0]);
      if (this.crashed) 
        this.fitness /= crashPenalty;
    }
    this.fitness = Math.floor(this.fitness)
    this.fitness = Math.pow(this.fitness,2)
  }

  Rocket.prototype.update = function() {
    if(this.crashed || this.completed)
      return true
    this.applyForce(this.dna.genes[count]);
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = this.acc.y = 0
    //this.vel.limit(4);
    this.lifespan++
    
    var d = Math.sqrt( (this.pos.x-target.x)*(this.pos.x-target.x) + (this.pos.y-target.y)*(this.pos.y-target.y) )
    if (d < 10) {
      this.pos.x = target.x;
      this.pos.y = target.y;
      return this.completed = true;
    }
    for (var i = 0; i < obstacles.length; i++)
      if (obstacles[i].collide(this.pos.x,this.pos.y)) {
        return this.crashed = true;
      }

    if (this.pos.x > canvasSize[0] || this.pos.x < 0 || this.pos.y > canvasSize[1] || this.pos.y < 0)
      return this.crashed = true;
  }

  Rocket.prototype.show = function() {
    push();
    noStroke();
    fill((this.col.slice(0, 3) + "a" + this.col.slice(3, -1)+",0.5)"));
    translate(this.pos.x, this.pos.y);
    rotate((Math.atan2(this.vel.y, this.vel.x)));
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }