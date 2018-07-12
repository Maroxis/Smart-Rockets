var uiCanvas = function( c ) {

  c.setup = function() {
    c.createCanvas(40, canvasSize[1]);
    c.noLoop();
    c.bgCol = color(164,182,164)
    c.cells = 5
    c.genNum = "0005"
    c.typing = false
    c.noType;
    c.mouseX = mouseX
    c.cellSize = canvasSize[1]/c.cells
  };

  c.draw = function() {
		ctx = c.canvas.getContext("2d")
    c.fill(c.bgCol);
    c.noStroke()
    c.rect(0,0,c.width,c.height);
    c.push()
    c.strokeWeight(2)
    c.stroke(16,192,16);
    
    c.line(1,0,1,c.height)
    c.line(c.width-1,0,c.width-1,c.height)
    for(var i = 0; i < floor(canvasSize[1]/c.cellSize); i++)
      c.line(0,i*c.cellSize+1,c.width,i*c.cellSize+1)
    c.line(0,c.height-1,c.width,c.height-1)
    c.pop()
    
    c.btResume()
    
    loadImage("assets/addObstBt.png", function(img) {
			c.image(img,4,(c.cellSize - img.height)/2+c.cellSize*0.8)
    });
	
		loadImage("assets/delObstBt.png", function(img) {
			c.image(img,4,(c.cellSize - img.height)/2+c.cellSize*1.25)
    });
		
		loadImage("assets/arrowBt.png", function(img) {
			ctx.save()
			ctx.translate(c.canvas.width/2,c.canvas.height/2)
			ctx.rotate(Math.PI/2)
			c.image(img,8,-16)
			ctx.rotate(Math.PI)
			c.image(img,8,-16)
			//c.image(img,4,(c.cellSize - img.height)/2+c.cellSize*2)
			ctx.restore()
    });
    c.mapNumber(mapNum);
    loadImage("assets/skipGenBt.png", function(img) {
			c.image(img,4,(c.cellSize - img.height-16)/2+c.cellSize*3)
    });
    c.genNumber(c.genNum);
    loadImage("assets/settingsBt.png", function(img) {
			c.image(img,4,(c.cellSize - img.height)/2+c.cellSize*4)
    });
  };
  c.btResume = function(){
    //clear
    c.fill(c.bgCol);
    c.noStroke()
    c.rect(2,2,c.width-4,c.cellSize-2);
    
    //draw
    loadImage("assets/playBt.png", function(img) {
    c.image(img,4,(c.cellSize - img.height)/2)
    });
  }
  c.btPause = function(){
    //clear
    c.fill(c.bgCol);
    c.noStroke()
    c.rect(2,2,c.width-4,c.cellSize-2);
    
    //draw
    loadImage("assets/pauseBt.png", function(img) {
    c.image(img,4,(c.cellSize - img.height)/2)
    });
  }
  c.genNumber = function (num){
    // for(var i = num.toString().length;i!=4;i++)
    //   num = "0" + num
    c.fill(c.bgCol)
    c.rect(2,c.cellSize*7/2 + 14 ,c.width-4,12);
    c.push()
    c.textSize(15)
    c.fill(0);
    c.text(num, 4, (c.cellSize + 50)/2+c.cellSize*3);
    c.pop()
  }
	c.mapNumber = function(){
		c.push()
		c.fill(c.bgCol)
    c.rect(2,c.cellSize*2.4 +2,c.width-4,12);
    c.textSize(15)
    c.fill(0);
		
		c.txt = ""
		if(mapNum < 10)
			c.txt += "00"
		else if(mapNum < 100)
			c.txt += "0"
		c.txt += mapNum
		
    c.text(c.txt, 8, (c.cellSize + 50)/2+c.cellSize*1.75);
    c.pop()
	}
  c.mousePressed = function() {
    if(c.mouseX > 0 && c.mouseX < 40){
      for(var i = 0; i < c.cells; i++){
        if(c.mouseY > c.cellSize*i && c.mouseY < c.cellSize*(i+1)){
          switch(i){
            
            case 0: //buton 1
              if(state === 0)
                c.resume()
              else
                c.pause()
              break;
            case 1:
							if(c.mouseY < c.cellSize*(i+0.5)){
								obstacles.push( new Obstacle(25,25,20,20) )				
							}else{
								undoObstacle()
							}
							saveMap()
              break;
						case 2:
							if(c.mouseY < c.cellSize*(i+0.4)){
								nextMap()
							}else if(c.mouseY > c.cellSize*(i+0.6)){
								prevMap()
							}else
								changeMap()
							c.mapNumber()
						break;
            case 3:
              quickSim(parseInt(c.genNum))
             break;
            case 4:
              break;
            default:
              break;
          }
        }
      }
    }
  }
  c.keyTyped= function(){
    if(c.keyCode == 13)
      quickSim(parseInt(c.genNum))
      
    if(c.keyCode == 32){
      if(state === 0)
        c.resume()
      else
        c.pause()
    }
      
    if(c.keyCode > 47 && c.keyCode < 58){
      clearTimeout(c.noType)
      c.noType = setTimeout(c.notTyping,1500)
      if(c.typing){
        c.genNum = "" + c.genNum[1] + c.genNum[2] + c.genNum[3]  + (c.keyCode - 48)
        c.genNumber(c.genNum)
      }
      else{
        c.genNum = "000" + (c.keyCode - 48)
        c.genNumber(c.genNum)
      }
      
      c.typing = true;
    }
  }
  c.notTyping = function (){
    c.typing = false;
  }
  c.resume = function(){
    c.btPause()
    state = 1;
    infoCanv.time = setInterval(infoCanv.timer, 1000)
  }
  c.pause = function(){
    c.btResume()
    state = 0;
    clearInterval(infoCanv.time)
  }
	
}
