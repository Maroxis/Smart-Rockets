Brain = function(dna){
	this.dna = {}
    this.dna.inWeights = dna.inWeights;
    this.dna.outWeights = dna.outWeights;
  
  this.layer = [];
  this.outputs = [0,0];
}
Brain.prototype.calculate = function(inputs){
  this.layer = []
  for(var i = 0; i < brainNodeNum; i++){
    this.layer[i] = 0;
  }
  ///// PART 1 -> calculate layer
  for(var j = 0; j < brainNodeNum; j++){ //number of nodes in layer
    for(var i = 0; i < inputs.length; i++){ //num of inp
        this.layer[j] += inputs[i]*this.dna.inWeights[i][j]
		this.layer[j] = Math.tanh(this.layer[j])
    }
  }
  this.outputs = [0,0];
  //// PART 2 -> calculate outputs
  for(var j = 0; j < 2; j++){ //num of outp
    for(var i = 0; i < brainNodeNum; i++){ //num of nodes in layer
        this.outputs[j] += this.layer[i]*this.dna.outWeights[i][j]
		this.outputs[j] = Math.tanh(this.outputs[j])
    }
  }
  ////PART 3 -> return actions

  return this.outputs
}

var inputNumber = 10; // inputs for brain, global variable for ease of use, change when adding new inputs