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
var statCanvasSize = [250,400] // 

// multiply fitness score
var targetBonus = 10;
var timeBonus = 20;
var crashPenalty = 30;

// history stats
var drawStats = true;
var histLenght = 30
var LHstLenght = 30
var longH = 50 // log avarge of X generations