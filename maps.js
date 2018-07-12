mapNum = 1
function saveMap(){
	maps[mapNum-1] = {
		obst:JSON.stringify(obstacles),
		target:JSON.stringify(target)
	}
	localStorage.setItem("maps", JSON.stringify(maps))
}

function clearMap(){
	obstacles = []
	target = targetDefault
	saveMap()
}

function dumpMaps(){
	clearMap()
	maps = []
	localStorage.removeItem("maps")
}

function prevMap(){
		
		if(mapNum == 1){
			loadMap(998)
			mapNum = 999
		}
		else{
			loadMap(mapNum-2)
			mapNum--
		}
		
	}
function nextMap(){
	if(mapNum == 999){
		loadMap(0)
		mapNum = 1
	}
	else{
		loadMap(mapNum)
		mapNum++
	}
}

function nextMadeMap(){
	for(var i = mapNum+1; maps[i-1] == null || maps[i-1].obs == [] ; i++){
		if(i > 999)
			i = 0
	}
	loadMap(i-1)
	mapNum = i
}

function loadMap(index){
	//saveMap()
	if(maps[index] != undefined){
		
		var obst = JSON.parse(maps[index].obst)
		for ( var i = 0; i < obst.length; i++)
			reattachMethods(obst[i],Obstacle)
		obstacles = obst
		
		target = JSON.parse(maps[index].target)
	}
	else{
		obstacles = []
		target = {x:targetDefault.x,y:targetDefault.y,size:targetDefault.size}
	}
}