function history(size){
  this.el = []
  this.size = size
  this.log = function(score,generation){
    if (this.el[size-1] === undefined)
      this.el.push([parseInt(score),parseInt(generation)])
    else
    {
      for (var i = 0; i < size-1; i++)
      {
        this.el[i] = this.el[i+1]
      }
        this.el[size-1] = [parseInt(score),parseInt(generation)]
    }
  }
}