function obstacle(x,y,width,height){
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.collide = function(obj){
    if(obj.pos.x > this.x && obj.pos.x < this.x + this.width &&
    obj.pos.y > this.y && obj.pos.y < this.y + this.height)
      return true
    else
      return false
  }
  this.draw = function(){
      noStroke()
      rect(this.x, this.y, this.width, this.height);
  }
}