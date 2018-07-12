function remakeSegments(){
	segments = [
		{a:{x:0,y:0},b:{x:canvasSize[0],y:0}},
		{a:{x:canvasSize[0],y:0},b:{x:canvasSize[0],y:canvasSize[1]}},
		{a:{x:canvasSize[0],y:canvasSize[1]},b:{x:0,y:canvasSize[1]}},
		{a:{x:0,y:canvasSize[1]},b:{x:0,y:0}}
	]
	for(var i = 0; i < obstacles.length; i++){
		for(var j = 0; j < 4; j++){
			segments.push(obstacles[i].getSegments(j))	
		}
	}
}