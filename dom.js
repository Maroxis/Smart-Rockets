//Dom
var lifeP
//var fitnessP
var btAddObst
var inp
var timeI

function dom()
{
  lifeP = createP();
  //fitnessP = createP();
  
  btAddObst = createButton('Add Obstacle');
  btAddObst.id("btAddObst");
  btAddObst.mousePressed(addObst);
  
  var qucikSimDiv = createDiv("");
  

  var btQuickSim = createButton('Quick Simulation');
  btQuickSim.id("btQuickSim")
  btQuickSim.mousePressed(quickSim);
  btQuickSim.parent(qucikSimDiv)

  inp = createInput(5)

  inp.parent(qucikSimDiv)
  inp.attribute("type", "number");
}

function timer() {
  sec++
}

function addObst(){
  obstacles.push( new obstacle(25,25,20,20) )
}
