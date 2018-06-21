// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/bGz7mv2vD6g

DNA = function(genes) {
  if (genes) {
    this.inWeights = genes.inWeights;
    this.outWeights = genes.outWeights;
  } else {
		this.inWeights = []
		this.outWeights = []
	  
		for(var i = 0; i < 5; i++){  //input number
			this.inWeights.push([])
			for(var j = 0; j < brainNodeNum; j++){ //layer number
				this.inWeights[i].push(Math.random()*2-1)
		}
	  }
		for(var i = 0; i < brainNodeNum; i++){ //layer number
			this.outWeights.push([])
		for(var j = 0; j < 2; j++){//output number
			this.outWeights[i].push(Math.random()*2-1)
		}
	  }
    }
}
  

  DNA.prototype.crossover = function(partner) {
    var newgenes = {};
    newgenes.inWeights = [];
	newgenes.outWeights = [];
	for(var x = 0; x < 5; x++){  //input number
		newgenes.inWeights.push([])
		for(var j = 0; j < brainNodeNum; j++){ //layer number
			newgenes.inWeights[x].push(0)
		}
	}
	for(var y = 0; y < brainNodeNum; y++){ //layer number
		newgenes.outWeights.push([])
		for(var j = 0; j < 2; j++){//output number
			newgenes.outWeights[y].push(0)
		}
	}
    
    var mid = Math.floor(Math.random()*this.inWeights.length);
	//console.log("asd1")
	//console.log(this,partner)
    for (var i = 0; i < this.inWeights.length; i++) {
		//console.log(i)
		for (var j = 0; j < this.inWeights[i].length; j++){
			//console.log(j)
			if (j > mid) {
				newgenes.inWeights[i][j] = this.inWeights[i][j];
			} else {
				//console.log(i,j,partner,newgenes[0])
				newgenes.inWeights[i][j] = partner.inWeights[i][j];
			}	
		}
    }
	//console.log("asd3")
	for (var i = 0; i < this.outWeights.length; i++) {
		for (var j = 0; j < this.outWeights[i].length; j++){
			if (j > mid) {
				newgenes.outWeights[i][j] = this.outWeights[i][j];
			} else {
				newgenes.outWeights[i][j] = partner.outWeights[i][j];
			}	
		}
    }
	//console.log(newgenes)
	return new DNA(newgenes)
 
  }

  DNA.prototype.mutation = function() {
	  
    for (var i = 0; i < this.inWeights.length; i++) {
		for (var j = 0; j < this.inWeights[i].length; j++){
			if (Math.random() < mutationRate) {
				//console.log("mutation in")
				this.inWeights[i][j] = Math.random()*2 -1
			}
		}
    }
	for (var i = 0; i < this.outWeights.length; i++) {
		for (var j = 0; j < this.outWeights[i].length; j++){
			if (Math.random() < mutationRate) {
				//console.log("mutation out")
				this.outWeights[i][j] = Math.random()*2 -1
			}
		}
    }
	
  }
