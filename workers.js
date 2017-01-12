function createWorkers(){
  for(var i = 0; i < popNum; i++){
  workers[i] = new Worker("./quickGen.js")
      workers[i].onmessage = function (oEvent) {
        var id = oEvent.data.id *1
        var p = oEvent.data.p
        rebuild(p)
        populations[id] = p
        workersDone++
        if(workersDone == popNum){
          count = 0;
          gen += oEvent.data.amm
          console.log(oEvent.data.amm+" gen. done in " +oEvent.data.time+ " sec" )
          loop()
          //terminateWorkers()
        }
     };
  }
}