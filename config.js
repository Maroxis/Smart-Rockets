var lifespan = 400; //rocket lifetime
var maxforce = 0.3; //rocket max speed
var mutationRate = 0.01 //DNA
var popSize = 20 // number of rockets
var popNum = 3 // nubmer of populations
var popColors = [] // custom pop colors RGB // if not specified color will random

popColors.push([192,32,192]) 
popColors.push([32,192,32])
popColors.push([32,192,192])

var canvasSize = [400,400] // 
var statCanvasSize = [260,400] // 

// multiply fitness score
var targetBonus = 2;
var timeBonus = 4;
var crashPenalty = 3;

// history stats
var drawStats = true;
var histLenght = 40
var LHstLenght = 40
var longH = 50 // log avarge of X generations