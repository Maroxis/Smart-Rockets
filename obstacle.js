Obstacle = function(x,y,width,height){
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

function checkObstacles(){
  for(var i = 0; i < obstacles.length; i++){
      if(obstacles[i].width < 5)
         obstacles[i].width = 5
      if(obstacles[i].height < 5)
         obstacles[i].height = 5
      if(obstacles[i].width > width)
         obstacles[i].width = width
      if(obstacles[i].height > height)
         obstacles[i].height = height
      if(obstacles[i].x < 0)
         obstacles[i].x = 0
      if(obstacles[i].x + obstacles[i].width > width)
         obstacles[i].x = width - obstacles[i].width
      if(obstacles[i].y < 0)
         obstacles[i].y = 0
      if(obstacles[i].y + obstacles[i].height > height)
         obstacles[i].y = height - obstacles[i].height
  }
}