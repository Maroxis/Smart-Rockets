var state = 0;
var populations = [];
var maxFitness;
var statCanv
var canvasDiag = 0;

var target = {x:targetDefault.x,y:targetDefault.y,size:targetDefault.size}
var obstacles = [];
var segments = [];
var workers =[];
var maps = [];


//Timer
var count
var sec
var gen

function preload(){
}
function setup() {
  frameRate(60)
  canvasDiag = Math.ceil(Math.hypot(canvasSize[0],canvasSize[1]))
  count = 0;
  sec = 0;
  gen = 1;
	if(localStorage){
		if(localStorage.getItem("maps") !== null){
			maps = JSON.parse(localStorage.getItem("maps"))
			var obst = JSON.parse(maps[0].obst)
			for ( var i = 0; i < obst.length; i++)
				reattachMethods(obst[i],Obstacle)
			obstacles = obst
			target = JSON.parse(maps[0].target)
		}
	}
	remakeSegments()
  createCanvas(canvasSize[0], canvasSize[1]);
  uiCanv = new p5(uiCanvas);
  if (drawStats)
    statCanv = new p5(statCanvas);
  infoCanv = new p5(infoCanvas);
	centerCanvases()
	//centerCanvas(infoCanv.canvas)
  ///rockets
  for(var i = 0; i < popNum; i++){
    if(popColors[i])
      populations.push(new Population(popSize,popColors[i]))
    else
      populations.push(new Population(popSize))
  }  
  if (typeof(Worker) !== "undefined") {
     console.log(" Threads ok")
     createWorkers()
  }
}

function centerCanvases(){
	uiCanv.canvas.style.top = '10px'
	uiCanv.canvas.style.left = canvasSize[0]+10+'px'
	if (drawStats){
    statCanv.canvas.style.top = '10px' 
		statCanv.canvas.style.left = canvasSize[0]+50+'px'
	}
	infoCanv.canvas.style.top = canvasSize[1]+10+'px'
	infoCanv.canvas.style.left = '10px'
}

function quickSim(ammount) {
  
  if (typeof(Worker) === "undefined") {
     console.log("sorry threads not supported")
     return
  }
  
  noLoop()
  workersDone = 0
  for(var i = 0; i < popNum; i++){
  var obst =  JSON.stringify(obstacles)
  var population = JSON.stringify(populations[i])
  var tar = JSON.stringify(target)
  var seg = JSON.stringify(segments)
  var canvD = JSON.stringify(canvasDiag)
	var ma = JSON.stringify(maps)
  var message = {p: population, amm: ammount, c: count, id: i, obst: obst, tar: tar, gen: gen, seg: seg,canvD: canvD,maps:ma}
  workers[i].postMessage(message)
  }
}

function makeSimulation() {
        
  var genDone = true;
   for(var i = 0; i < populations.length; i++){
     if(!populations[i].run() && genDone)
       genDone = false;
   }
  if(genDone)
    count = lifespan;
  else
    count++;
    
   if (count == lifespan) {

   for(var i = 0; i < populations.length; i++){
     populations[i].evaluate();
     populations[i].selection();
     populations[i].LAFit += populations[i].AFit
     populations[i].his.log(populations[i].AFit, populations[i].HFit, gen)
   }
    if (gen % longH === 0 || gen == 1) {
      for(var i = 0; i < populations.length; i++){
        populations[i].LAFit /= longH
        populations[i].longHis.log(populations[i].LAFit, gen) // finished,
        populations[i].LAFit = 0;
      }
    }

    gen++;
    count = 0;
     
    if (drawStats)
      statCanv.drawScore()
    if(training){
			nextMadeMap()
			uiCanv.mapNumber()
		}
    return true; //whole generation completed
  }

}

function draw() {
  background(0);

  if (state !== 0)
    makeSimulation()
  infoCanv.update()
	
  //rockets
  for(var i = 0; i < populations.length; i++){
    for (var j = 0; j < populations[i].popsize; j++) {
      populations[i].rockets[j].show();
    }
  }
  fill(255);
  
  //obstacles
  for (var i = 0; i < obstacles.length; i++)
    obstacles[i].draw();
  fill(255, 0, 0);
  
  //debug outilens
  if(debug){
	stroke(242, 41, 222);
	for (var i = 0; i < segments.length; i ++){
		line(segments[i].a.x,segments[i].a.y,segments[i].b.x,segments[i].b.y)
	}
  }
  
  //stroke(244,131,66)
  
  //target
	
	stroke(0)
  ellipse(target.x, target.y, target.size, target.size);
}
