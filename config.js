var lifespan = 400; //rocket lifetime
var maxforce = 0.3; //rocket max speed
var mutationRate = 0.01 //DNA
const popSize = 40 // number of rockets
const popNum = 3 // nubmer of populations

const brainNodeNum = inputNumber / 2// * 1 // number of nodes in brain layer

var debug = false;

const canvasSize = [400,400] // 
const statCanvasSize = [260,400] // 

var target = {x:canvasSize[0] / 2, y:50,size: 10}

const popColors = [] // custom pop colors RGB // if not specified color will random
popColors.push('rgb(192,32,32)') //predefined good looking colors, can be removed
popColors.push('rgb(32,192,32)')
popColors.push('rgb(32,192,192)')
popColors.push('rgb(192,192,32)')
popColors.push('rgb(128,32,192)') 



// multiply fitness score
var targetBonus = 10;
var timeBonus = 3;
var crashPenalty = 5;
var distanceBonus = 5

// history stats
var drawStats = true;
var histLenght = 50
var LHstLenght = 30
const longH = 100 // log avarge of X generations