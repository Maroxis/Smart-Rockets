var uiCanvas = function( c ) {

  c.setup = function() {
    c.createCanvas(40, canvasSize[1]);
    c.noLoop();
    c.bgCol = color(164,182,164)
    c.cells = 4
    c.mouseX = mouseX
    //pauseBt.loadPixels();
    c.cellSize = canvasSize[1]/c.cells
  };

  c.draw = function() {
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
    c.image(img,4,(c.cellSize - img.height)/2+c.cellSize)
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
  c.mousePressed = function() {
    if(c.mouseX > 0 && c.mouseX < 40){
      for(var i = 0; i < c.cells; i++){
        if(c.mouseY > c.cellSize*i && c.mouseY < c.cellSize*(i+1)){
          switch(i){
            
            case 0: //buton 1
              if(state === 0){
                c.btPause()
                state = 1;
                timeI =setInterval(timer, 1000)
              }
              else{
                c.btResume()
                state = 0;
                clearInterval(timeI)
              }
            break;
            
            case 1:
               obstacles.push( new obstacle(25,25,20,20) )
            break;
            
            default:
            break;
          }
        }
      }
    }
  }
  
}
