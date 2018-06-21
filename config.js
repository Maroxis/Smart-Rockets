var lifespan = 400; //rocket lifetime
var maxforce = 0.3; //rocket max speed
var mutationRate = 0.01 //DNA
var popSize = 20 // number of rockets
var popNum = 1 // nubmer of populations
var popColors = [] // custom pop colors RGB // if not specified color will random
var brainNodeNum = 20

const canvasSize = [400,400] // 
const statCanvasSize = [260,400] // 

var target = {x:canvasSize[0] / 2, y:50}

popColors.push('rgb(192,32,32)')
popColors.push('rgb(32,192,32)')
popColors.push('rgb(32,192,192)')
popColors.push('rgb(192,192,32)')
popColors.push('rgb(128,32,192)') 



// multiply fitness score
var targetBonus = 5;
var timeBonus = 5;
var crashPenalty = 50;

// history stats
var drawStats = true;
var histLenght = 50
var LHstLenght = 30
const longH = 100 // log avarge of X generations