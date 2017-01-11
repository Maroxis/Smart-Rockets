// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g
//var maxForceDiff = 0.5

DNA = function(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      v1 = random(-1,1)
      v2 = random(-1,1)
      this.genes[i] = {x: v1, y: v2};
      
      // if (i !== 0) {
      //   while (p5.Vector.angleBetween(this.genes[i], this.genes[i - 1]) > PI/2) {
      //     this.genes[i] = p5.Vector.random2D();
      //   }
      //}
    
      this.genes[i].x *= maxforce
      this.genes[i].y *= maxforce
      }
    }
}
  

  DNA.prototype.crossover = function(partner) {
    var newgenes = [];
    var mid = Math.floor(Math.random()*this.genes.length);
    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  DNA.prototype.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        v1 = Math.random()*2 -1
        v2 = Math.random()*2 -1
        this.genes[i] = {x: v1, y: v2};
        this.genes[i].x *= maxforce
        this.genes[i].y *= maxforce
      }
    }
  }
