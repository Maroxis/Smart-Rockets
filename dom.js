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
  state = 1;
  btStart.hide()
  btAddObst.hide()
  setInterval(timer, 1000)
    //console.log(btStart)
}

function timer() {
  sec++
}

function addObst(){
  obstacles.push( new obstacle(25,25,20,20) )
}
