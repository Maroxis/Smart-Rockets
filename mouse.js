var mX = 0
var mY = 0
var draggedObst = null
var selectedObst = null
var selectedTarget = false;
var obj = {};

document.addEventListener('contextmenu', event => event.preventDefault());

function mousePressed() {
  mX = mouseX
  mY = mouseY
  if (mouseButton == LEFT && mX > target.x - 8 && mX < target.x + 8 && mY < target.y +8  && mY > target.y -8 )
    {
    selectedTarget = true;
    mX = mX - target.x
    mY = mY - target.y
    }
  else
  {
    for (var i = 0; i < obstacles.length; i++){
      if (obstacles[i].collide(mX,mY)) {
        if (mouseButton == LEFT) {
          draggedObst = obstacles[i]
          mX = mX - obstacles[i].x
          mY = mY - obstacles[i].y
        }
        else if (mouseButton == RIGHT) {
          selectedObst = obstacles[i]
          mX = mX - obstacles[i].width
          mY = mY - obstacles[i].height
        }
      }
    }
  }
}


function mouseDragged() {
  if (selectedTarget){
    target.x = parseInt(mouseX - mX)
    target.y = parseInt(mouseY - mY)
    return
  }
  if (draggedObst && selectedObst)
    return
    
  if (draggedObst) {
    draggedObst.x = parseInt(mouseX - mX)
    draggedObst.y = parseInt(mouseY - mY)
    checkObstCollision(draggedObst,true)
  }
  else if(selectedObst){
    selectedObst.width = parseInt(mouseX - mX)
    selectedObst.height = parseInt(mouseY - mY)
    checkObstCollision(selectedObst,false)
  }
  
  
  
}

function mouseReleased() {
  mX = 0
  mY = 0
  if(selectedObst || draggedObst)
	saveObstacles()
  selectedObst = null;
  draggedObst = null;
  selectedTarget = false;
}
