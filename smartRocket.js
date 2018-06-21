SmartRocket = function(dna,col) {
  this.pos = {x:canvasSize[0] / 2,y:canvasSize[1]};
  this.vel = {x:0,y:0}
  this.acc = {x:0,y:0}
  this.lifespan = 0;
  this.completed = false;
  this.crashed = false;
  this.fitness = 0;
  this.col = col
  this.sensors = []
  this.angle = 0;
  this.brain = new Brain(dna);
  
  if(dna)
	  this.dna = dna
  else 
	  this.dna = new DNA()
}
  
  
  SmartRocket.prototype.applyForce = function(force) {
    this.acc.x += force.x;
    this.acc.y += force.y;
  }

  SmartRocket.prototype.calcFitness = function() {
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

  SmartRocket.prototype.update = function() {
    if(this.crashed || this.completed)
      return true
    
	this.angle = Math.atan2(this.vel.y, this.vel.x)+Math.PI
	
	// sensors input
	this.sensors = []
	
	for (var i = -2; i < 3; i++){
		var angle = this.angle+Math.PI*(i/12)
		
		var X = this.pos.x-2 - Math.cos(angle) * 30
		var Y = this.pos.y-2 - Math.sin(angle) * 30
		//line(this.pos.x-2,this.pos.y,X,Y)
		
		var ray = {a:{x:this.pos.x-2,y:this.pos.y},b:{x:X,y:Y}}
		var closestIntersect = null;
		for(var j=0;j<segments.length;j++){
			var intersect = getIntersection(ray,segments[j]);
			if(!intersect) continue;
			//console.log(j,segments.length,segments[j],intersect)
			if(!closestIntersect || intersect.param<closestIntersect.param){
				closestIntersect=intersect;
			}
		}
		if(closestIntersect!= null){
			var distance = closestIntersect.param
			if (distance > 15)
				distance = 1
			else
				distance = distance/15
			
			this.sensors.push(distance+0.0001)
		}
		else this.sensors.push(0.0001)
	}
	
	var move = this.brain.calculate(this.sensors)
	this.acc.x = move[0]*maxforce
	this.acc.y = move[1]*maxforce
	
	//this.applyForce(this.dna.genes[count]);
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

  SmartRocket.prototype.show = function() {
    push();
    noStroke();
    fill((this.col.slice(0, 3) + "a" + this.col.slice(3, -1)+",0.8)"));
    translate(this.pos.x, this.pos.y);
    rotate((Math.atan2(this.vel.y, this.vel.x)));
    rectMode(CENTER);
    rect(0, 0, 20, 4);
	
	
	rotate(-(Math.atan2(this.vel.y, this.vel.x)))
	translate(-this.pos.x, -this.pos.y);
	
	for (var i = -2; i < 3; i++){
		var angle = this.angle+Math.PI*(i/12)
		
		stroke(255)
		var X = this.pos.x-2 - Math.cos(angle) * 100
		var Y = this.pos.y-2 - Math.sin(angle) * 100
		//line(this.pos.x-2,this.pos.y,X,Y)
		
		var ray = {a:{x:this.pos.x-2,y:this.pos.y},b:{x:X,y:Y}}
		var closestIntersect = null;
		for(var j=0;j<segments.length;j++){
			var intersect = getIntersection(ray,segments[j]);
			if(!intersect) continue;
			//console.log(j,segments.length,segments[j],intersect)
			if(!closestIntersect || intersect.param<closestIntersect.param){
				closestIntersect=intersect;
			}
		}
		if(closestIntersect!= null){
			line(this.pos.x,this.pos.y,closestIntersect.x,closestIntersect.y)
			//console.log(closestIntersect.param/15) // max 15
		}
	}
    pop();
  }
  
  function getIntersection(ray,segment){

	// RAY in parametric: Point + Direction*T1
	var r_px = ray.a.x;
	var r_py = ray.a.y;
	var r_dx = ray.b.x-ray.a.x;
	var r_dy = ray.b.y-ray.a.y;

	// SEGMENT in parametric: Point + Direction*T2
	var s_px = segment.a.x;
	var s_py = segment.a.y;
	var s_dx = segment.b.x-segment.a.x;
	var s_dy = segment.b.y-segment.a.y;

	// Are they parallel? If so, no intersect
	if (r_dx * s_dy == r_dy * s_dx) {
		//console.log('here 1')
		return null; // they do not intersect
	}

	// SOLVE FOR T1 & T2
	// r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
	// ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
	// ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
	// ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
	var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
	var T1 = (s_px+s_dx*T2-r_px)/r_dx
	//console.log(T1,T2)

	// Must be within parametic whatevers for RAY/SEGMENT
	if(T1<0) return null;
	if(T2<0 || T2>1) return null;

	// Return the POINT OF INTERSECTION
	return {
		x: r_px+r_dx*T1,
		y: r_py+r_dy*T1,
		param: T1
	};

}