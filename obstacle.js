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
       
      for(var i = 0; i < obstacles.length; i++){  
        if(obstacle.id != i &&
        obstacle.x < obstacles[i].x + obstacles[i].width  &&
        obstacle.x + obstacle.width > obstacles[i].x &&
        obstacle.y < obstacles[i].y + obstacles[i].height &&
        obstacle.y + obstacle.height > obstacles[i].y)
          {console.log(obstacle.id+" collide with "+i)}
      }
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
}

function saveObstacles(){
	var obst = JSON.stringify(obstacles)
	localStorage.setItem("obstacles", obst);
}