function remakeSegments(){
	segments = [
		{a:{x:0,y:0},b:{x:mainCanv.width,y:0}},
		{a:{x:mainCanv.width,y:0},b:{x:mainCanv.width,y:mainCanv.height}},
		{a:{x:mainCanv.width,y:mainCanv.height},b:{x:0,y:mainCanv.height}},
		{a:{x:0,y:mainCanv.height},b:{x:0,y:0}}
	]
	for(var i = 0; i < obstacles.length; i++){
		for(var j = 0; j < 4; j++){
			segments.push(obstacles[i].getSegments(j))	
		}
	}
}