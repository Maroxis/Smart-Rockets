hist = function(size){
  this.el = []
  this.size = size
}

hist.prototype.log = function(score,generation){
  if (this.el.length < this.size)
     this.el.push([score,generation])
   else{
    for (var i = 0; i < size-1; i++)
      this.el[i] = this.el[i+1]
    this.el[size-1] = [score,generation]
  }
}
