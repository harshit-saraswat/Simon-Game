const buttonColours=["red","blue","green","yellow"]
var randomChosenColor="";
var gamePattern=[];

function nextSequence(min=0,max=4){
    var randomNumber= Math.floor(Math.random() * (max - min) ) + min;
    randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    return gamePattern;
}