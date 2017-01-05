var statCanvas = function( c ) {

  c.setup = function() {
    c.score = 0;
    c.prevScore = 0;
    c.createCanvas(statCanvasSize[0], statCanvasSize[1]);
    c.noLoop();
    c.step = c.width/histLenght
  };

  c.draw = function() {
    c.fill(192);
    c.noStroke()
    c.rect(0,0,c.width,c.height);
    
    // c.push()
    // c.strokeWeight(3)
    // c.stroke(0,0,255);
    // c.line(0,40,c.width,40)
    // c.pop()
    
  };
  c.drawScore = function(){
    c.draw()
    var TopFit = populations[0].TFit
    for(var i = 1; i < populations.length; i++){
      if(populations[i].TFit > TopFit)
        TopFit = populations[i].TFit
    }
    
    c.fill(0, 102, 153);
    c.textSize(32);
    //c.text("Top: "+TopFit, 10, 30);
    
    for(var i = 0; i < populations.length; i++){
      
      c.stroke(populations[i].col.levels[0],populations[i].col.levels[1],populations[i].col.levels[2],62)
      c.fill(populations[i].col.levels[0],populations[i].col.levels[1],populations[i].col.levels[2],62)
      c.beginShape();
     
      for(var j = 0; j < populations[i].his.el.length; j++) // Avarge fitt / Total
      {
        c.score = map(populations[i].his.el[j][0],0,TopFit,0,c.height) // -42
        c.vertex((j+1)*c.step, c.height - c.score);
   
        // c.push()
        // c.strokeWeight(4)
        // c.point((i+1)*c.step,c.height - c.score)
        // c.pop()
        
      }
      c.vertex((populations[i].his.el.length)*c.step, height);
      c.vertex(0, height);
      c.endShape(CLOSE);
    
      c.noFill()
      c.strokeWeight(1)
      c.stroke(populations[i].col.levels[0],populations[i].col.levels[1],populations[i].col.levels[2],255)
     
      for(var j = 0; j < populations[i].longHis.el.length; j++) //Longterm Avarge fitt / Total
      {
        c.score = map(populations[i].longHis.el[j][0],0,TopFit,0,c.height) // -42
        
        if(c.prevScore !== 0)
          c.line(j*c.step,c.height - c.prevScore,(j+1)*c.step,c.height - c.score)
        else
          c.line(j*c.step,c.height - c.score,(j+1)*c.step,c.height - c.score)
        
        c.push()
        c.strokeWeight(4)
        c.point((j+1)*c.step,c.height - c.score)
        c.pop()
        c.prevScore = c.score
      }
      c.prevScore = 0
    }
  }
};
