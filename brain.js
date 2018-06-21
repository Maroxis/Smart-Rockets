Brain = function(dna){
	this.dna = {}
  if(dna){
	  //console.log("test",dna)
    this.dna.inWeights = dna.inWeights;
    this.dna.outWeights = dna.outWeights;
  }else
  this.genDna()
  
  this.layer = [];
  this.outputs = [0,0];
}
Brain.prototype.genDna = function(){
  this.dna.inWeights = []
  this.dna.outWeights = []
  
  for(var i = 0; i < 5; i++){  //input number
    this.dna.inWeights.push([])
    for(var j = 0; j < brainNodeNum; j++){ //layer number
     this.dna.inWeights[i].push(Math.random()*2-1)
    }
  }
  for(var i = 0; i < brainNodeNum; i++){ //layer number
    this.dna.outWeights.push([])
    for(var j = 0; j < 2; j++){//output number
     this.dna.outWeights[i].push(Math.random()*2-1)
    }
  }
}

Brain.prototype.calculate = function(inputs){
  this.layer = []
  for(var i = 0; i < brainNodeNum; i++){
    this.layer[i] = 0;
  }
  ///// PART 1 -> calculate layer
  for(var j = 0; j < brainNodeNum; j++){ //number of nodes in layer
    for(var i = 0; i < inputs.length; i++){ //num of inp
        this.layer[j] +=  inputs[i]*this.dna.inWeights[i][j]
		this.layer[j] = Math.tanh(this.layer[j])
    }
  }
  this.outputs = [0,0];
  //// PART 2 -> calculate outputs
  for(var j = 0; j < 2; j++){ //num of outp
    for(var i = 0; i < brainNodeNum; i++){ //num of nodes in layer
        this.outputs[j] +=  this.layer[i]*this.dna.outWeights[i][j]
		this.outputs[j] = Math.tanh(this.outputs[j])
    }
  }
  ////PART 3 -> return actions

  return this.outputs
}