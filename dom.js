//Dom
var lifeP
//var fitnessP
var inp
var timeI

function dom(){
  lifeP = createP();
  //fitnessP = createP();
  
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