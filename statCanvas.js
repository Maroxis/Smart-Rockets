var statCanvas = function( c ) {

  c.setup = function() {
    c.score = 0;
    c.prevScore = 0;
    c.createCanvas(400, 300);
    c.noLoop();
    c.step = width/histLenght
  };

  c.draw = function() {
    c.fill(192);
    c.noStroke()
    c.rect(0,0,c.width,c.height);
    
    c.push()
    c.strokeWeight(3)
    c.stroke(0,0,255);
    c.line(0,40,c.width,40)
    c.pop()
    
  };
  c.drawScore = function(){
    c.draw()
    
    c.fill(0, 102, 153);
    c.textSize(32);
    c.text("Max Fit: "+population.TFit, 10, 30);
      
      c.stroke(population.col.levels[0],population.col.levels[1],population.col.levels[2],62)
      c.fill(population.col.levels[0],population.col.levels[1],population.col.levels[2],62)
      c.beginShape();
      for(var i = 0; i < statHist.el.length; i++) // Avarge fitt / Total
      {
        c.score = map(statHist.el[i][0],0,population.TFit,0,c.height-42)
        c.vertex((i+1)*c.step, c.height - c.score);
   
        // c.push()
        // c.strokeWeight(4)
        // c.point((i+1)*c.step,c.height - c.score)
        // c.pop()
        
      }
      c.vertex((statHist.el.length)*c.step, height);
      c.vertex(0, height);
      c.endShape(CLOSE);
    
      c.noFill()
      c.strokeWeight(1)
      c.stroke(population.col.levels[0],population.col.levels[1],population.col.levels[2],255)
     
      for(var i = 0; i < LongStatHist.el.length; i++) //Longterm Avarge fitt / Total
      {
        c.score = map(LongStatHist.el[i][0],0,population.TFit,0,c.height-42)
        
        if(c.prevScore !== 0)
          c.line(i*c.step,c.height - c.prevScore,(i+1)*c.step,c.height - c.score)
        else
          c.line(i*c.step,c.height - c.score,(i+1)*c.step,c.height - c.score)
        
        c.push()
        c.strokeWeight(4)
        c.point((i+1)*c.step,c.height - c.score)
        c.pop()
        c.prevScore = c.score
      }
      c.prevScore = 0

       /* 
      c.stroke(0,255,0,192)
      for(var i = 0; i < statHist.el.length; i++) // hit target / Total
      {
        c.score = map(statHist.el[i][1],0,population.popsize,0,c.height-42)
        if(c.prevScore !== 0)
          c.line(i*c.step,c.height - c.prevScore,(i+1)*c.step,c.height - c.score)
        else
          c.line(i*c.step,c.height - c.score,(i+1)*c.step,c.height - c.score)
          
        c.push()
        c.strokeWeight(4)
        c.point((i+1)*c.step,c.height - c.score)
        c.pop()
        c.prevScore = c.score
      }
      c.prevScore = 0
    */
  }
};
