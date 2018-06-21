Obstacle = function(x,y,width,height){
  this.id = obstacles.length
  this.x = x
  this.y = y
  this.width = width
  this.height = height
}
  Obstacle.prototype.collide = function(ox,oy){
    if(ox > this.x && ox < this.x + this.width &&
    oy > this.y && oy < this.y + this.height)
      return true
    else
      return false
  }
  Obstacle.prototype.draw = function(){
      noStroke()
      rect(this.x, this.y, this.width, this.height);
  }
  
  Obstacle.prototype.getSegments = function(i) {
	  
	var seg = [{a:{x:this.x,y:this.y},b:{x:this.x+this.width,y:this.y}},
		{a:{x:this.x+this.width,y:this.y},b:{x:this.x+this.width,y:this.y+this.height}},
		{a:{x:this.x+this.width,y:this.y+this.height},b:{x:this.x,y:this.y+this.height}},
		{a:{x:this.x,y:this.y+this.height},b:{x:this.x,y:this.y}}]
		
	return seg[i]
}

function checkObstCollision(obstacle,move){
    if(move){ //move
      if(obstacle.x < 0)
         obstacle.x = 0
      if(obstacle.x + obstacle.width > width)
         obstacle.x = width - obstacle.width
      if(obstacle.y < 0)
         obstacle.y = 0
      if(obstacle.y + obstacle.height > height)
         obstacle.y = height - obstacle.height

    } else { // resize
      if(obstacle.width < 5)
         obstacle.width = 5
      if(obstacle.height < 5)
         obstacle.height = 5
      if(obstacle.width > width)
         obstacle.width = width
      if(obstacle.height > height)
         obstacle.height = height
    }
    
    for(var i = 0; i < obstacles.length; i++){  
        if(obstacle.id != i){
          var c = collide(obstacle,obstacles[i])
          switch(c){
            case 'bottom':
              obstacle.y = obstacles[i].y + obstacles[i].height
              break;
            case 'top':
              obstacle.y = obstacles[i].y - obstacle.height
              break;
            case 'left':
              obstacle.x = obstacles[i].x - obstacle.width
              break;
            case 'right':
              obstacle.x = obstacles[i].x + obstacles[i].width
              break;
          }
        }
      }
}
function collide(r1,r2){
  var dx=(r1.x+r1.width/2)-(r2.x+r2.width/2);
  var dy=(r1.y+r1.height/2)-(r2.y+r2.height/2);
  var width=(r1.width+r2.width)/2;
  var height=(r1.height+r2.height)/2;
  var crossWidth=width*dy;
  var crossHeight=height*dx;
  var collision='none';
  //
  if(Math.abs(dx)<=width && Math.abs(dy)<=height){
    if(crossWidth>crossHeight){
      collision=(crossWidth>(-crossHeight))?'bottom':'left';
    }else{
      collision=(crossWidth>-(crossHeight))?'right':'top';
    }
  }
  return(collision);
}
function saveObstacles(){
	var obst = JSON.stringify(obstacles)
	localStorage.setItem("obstacles", obst);
}