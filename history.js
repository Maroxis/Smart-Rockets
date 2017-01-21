hist = function(size){
  this.el = []
  this.size = size
}

hist.prototype.log = function(score,generation){
  if (this.el.length >= this.size)
    this.el.slice(0,1)
  this.el.push([score,generation])
}
