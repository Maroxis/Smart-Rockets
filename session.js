function saveSession(){
	state = 0 // pause
		
	session = {}
	
	session.maps = maps
	session.currMap = mapNum
	session.frame = count
	session.generation = gen
	session.sec = infoCanv.sec
	session.populations = populations
	
	localStorage.setItem("session", JSON.stringify(session))
	
	state = 1 // reusme
}

function loadSession(){
	if(localStorage.getItem("session") !== null){
		var session = JSON.parse(localStorage.getItem("session"))
		maps = session.maps
		mapNum = session.currMap
		count = session.frame
		gen = session.generation
		infoCanv.sec = session.sec
		populations = session.populations
		
		for(var i = 0; i < populations.length; i++){
			rebuild(populations[i])
		}
		
		loadMap(mapNum-1)
	}else
		console.log("no session to load")
}