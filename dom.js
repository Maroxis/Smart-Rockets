//Dom
var lifeP
var fitnessP
var btStart
var btPause
var btResume
var btAddObst
var inp
var timeI

function dom()
{
  lifeP = createP();
  fitnessP = createP();
  
  btAddObst = createButton('Add Obstacle');
  btAddObst.id("btAddObst");
  btAddObst.mousePressed(addObst);
  
  btStart = createButton('Start Simulation');
  btStart.id("btStart");
  btStart.mousePressed(startSim);
  
  btPause = createButton('Pause Simulation');
  btPause.id("btPause");
  btPause.mousePressed(pauseSim);
  btPause.hide()
  
  btResume = createButton('Resume Simulation');
  btResume.id("btResume");
  btResume.mousePressed(resumeSim);
  btResume.hide()
  
  var qucikSimDiv = createDiv("");
  

  var btQuickSim = createButton('Quick Simulation');
  btQuickSim.id("btQuickSim")
  btQuickSim.mousePressed(quickSim);
  btQuickSim.parent(qucikSimDiv)

  inp = createInput(5)

  inp.parent(qucikSimDiv)
  inp.attribute("type", "number");
  
  obstPropDiv = createDiv("");
  var obstTable = select('#tbObst');
  obstTable.parent(obstPropDiv)
  obstW = select('#obstW');
  obstH = select('#obstH');
  obstW.changed(obstWCh); 
  obstH.changed(obstHCh); 
}
function obstWCh(){
  selectedObst.width = parseInt(obstW.value())
}
function obstHCh(){
  selectedObst.height = parseInt(obstH.value())
}

function startSim() {
  resumeSim()
  btStart.hide()
  btAddObst.hide()
  
  
}
function pauseSim(){
  state = 0;
  btPause.hide()
  btResume.show()
  //btStart.elt.innerHTML = "Resume"
  clearInterval(timeI)
}
function resumeSim(){
  state = 1;
  btResume.hide()
  btPause.show()
  //btStart.elt.innerHTML = "Pause"
  timeI =setInterval(timer, 1000)
}

function timer() {
  sec++
}

function addObst(){
  obstacles.push( new obstacle(25,25,20,20) )
}
