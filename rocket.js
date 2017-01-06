// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g


function Rocket(dna,col) {
  
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.lifespan = 0;
  this.completed = false;
  this.crashed = false;
  if(!col)
  {
    this.col = color(0,255,255,128)
  }
  else
    this.col = col

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    //var maxd = dist(this.pos.x, this.pos.y, width, height);

    this.fitness = floor(map(d, 0, width, width/10, 1));
    
    if (this.completed) {
      //finished += 1
      this.fitness *= targetBonus;
      this.fitness *= (map(this.lifespan,20,lifespan,timeBonus,1))
    }
    if (this.crashed) {
      this.fitness /= crashPenalty;
    }
    this.fitness = pow(this.fitness,2)
    this.fitness = floor(this.fitness)

  }

  this.update = function() {
    
    if(this.crashed || this.completed)
      return true
    
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }
      
    for (var i = 0; i < obstacles.length; i++)
      if (obstacles[i].collide(this)) {
        this.crashed = true;
      }

    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(4);
    this.lifespan++
    
  }

  this.show = function() {
    push();
    noStroke();
    fill(this.col);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }

}