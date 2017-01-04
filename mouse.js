var mX = 0
var mY = 0
var draggedObst = null
var selectedObst = null
var obj = {};

function mousePressed() {

  mX = mouseX
  mY = mouseY

  var p = createVector(mX, mY)
  obj = {
    pos: p
  }
  for (var i = 0; i < obstacles.length; i++)
    if (obstacles[i].collide(obj)) {
      if (mouseButton == LEFT) {
        draggedObst = obstacles[i]
        mX = mX - obstacles[i].x
        mY = mY - obstacles[i].y
        selectedObst = obstacles[i]
        obstW.value(obstacles[i].width)
        obstH.value(obstacles[i].height)
      }
    }
}


function mouseDragged() {
  if (draggedObst) {
    draggedObst.x = parseInt(mouseX - mX)
    draggedObst.y = parseInt(mouseY - mY)
  }
}

function mouseReleased() {
  mX = 0
  mY = 0
  draggedObst = null;
}