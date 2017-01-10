// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

Rocket = function(dna,col) {
  this.pos = new p5.Vector(width / 2, height);
  this.vel = new p5.Vector()
  this.acc = new p5.Vector()
  this.lifespan = 0;
  this.completed = false;
  this.crashed = false;
  this.fitness = 0;
  if(col)
    this.col = col
  else
    this.col = color(0,255,255,128)

  if(dna) 
    this.dna = dna;
  else 
    this.dna = new DNA();
}
  
  
  Rocket.prototype.applyForce = function(force) {
    this.acc.add(force);
  }

  Rocket.prototype.calcFitness = function() {
    if (this.completed) {
      //finished += 1
      this.fitness = width/10
      this.fitness *= targetBonus;
      this.fitness *= (map(this.lifespan,20,lifespan,timeBonus,1))
    }
    else{
      var d = dist(this.pos.x, this.pos.y, target.x, target.y);
      this.fitness = floor(map(d, 0, width, width/10, 1));
      this.fitness = floor(this.fitness)
      if (this.crashed) 
        this.fitness /= crashPenalty;
    }
    this.fitness = floor(this.fitness)
    this.fitness = pow(this.fitness,2)
  }

  Rocket.prototype.update = function() {
    if(this.crashed || this.completed)
      return true
    
    this.applyForce(this.dna.genes[count]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //this.vel.limit(4);
    this.lifespan++
    
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.pos = target.copy();
      return this.completed = true;
    }
      
    for (var i = 0; i < obstacles.length; i++)
      if (obstacles[i].collide(this.pos.x,this.pos.y)) {
        return this.crashed = true;
      }

    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0)
      return this.crashed = true;
  }

  Rocket.prototype.show = function() {
    push();
    noStroke();
    fill(this.col);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }