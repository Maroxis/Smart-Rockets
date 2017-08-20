hist = function(size){
  this.el = []
  this.size = size
}

hist.prototype.log = function(score,generation){
  if (this.el.length >= this.size)
    this.el.shift()
  this.el.push([score,generation])
}
