var infoCanvas = function( c ) {

  c.setup = function() {
    if(drawStats){
      c.createCanvas(canvasSize[0] + 40 + statCanvasSize[0] , 40);
      c.textSize(28)
    }
	  else{
      c.createCanvas(canvasSize[0] + 40, 40);
      c.textSize(22)
    }
    
    c.noLoop();
    c.sec = 0;
    c.min = 0;
    c.time;
  };

  c.draw = function() {
    c.fill(168)
    c.noStroke()
    c.rect(0,0,c.width,c.height)
    c.stroke(128,16,16)
    c.strokeWeight(3)
    c.line(0,1,c.width,1)
    c.update()
  };
  c.update = function(){
    c.noStroke()
    c.fill(168)
    c.rect(0,12,c.width,c.height-20)
    c.fill(0)
    var m = c.min
    if(m < 10)
      m = "0"+m
    var s = c.sec
    if(s < 10)
      s = "0"+s
    c.text("Time: "+m+":"+s+"    Generation: "+ gen + "    Frame: " + count,10,32)
  }
  
  c.timer = function(){
    c.sec++
    if(c.sec == 60){
      c.sec = 0
      c.min++
    }
  }
};
