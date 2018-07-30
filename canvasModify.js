function resizeCanvases(){
	mainCanv.resize(windowWidth/3*2, windowHeight/10*9)
	statCanv.resizeCanvas(windowWidth/3-44, windowHeight-4)
	infoCanv.resizeCanvas(mainCanv.width+40, windowHeight/10-4)
	uiCanv.resizeCanvas(40, mainCanv.height)
	uiCanv.cellSize = uiCanv.height/uiCanv.cells
	uiCanv.draw()
	//resizeCanvas(windowWidth/2, windowHeight/2);
	//mainCanv.width = Math.floor(window.innerWidth/3)
	//mainCanv.canvas.width = Math.floor(window.innerWidth/3)
	//mainCanv.canvas.height = Math.floor(window.innerHeight/10*8)
	//mainCanv.height = Math.floor(window.innerHeight/10*8)
}
function centerCanvases(){
	uiCanv.canvas.style.left = mainCanv.width+2+'px'
	if (drawStats){
		statCanv.canvas.style.left = mainCanv.width+42+'px'
	}
	infoCanv.canvas.style.top = mainCanv.height+2+'px'
}