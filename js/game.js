const buttonColours=["red","blue","green","yellow"]
var randomChosenColor="";
var gamePattern=[];

function nextSequence(min=0,max=4){
    var randomNumber= Math.floor(Math.random() * (max - min) ) + min;
    randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    
    // Flash Chosen Color
    $('#'+randomChosenColor).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChosenColor);
}

function playSound(chosenColor){
    var audio = new Audio('sounds/'+chosenColor+'.mp3');
    audio.play();
}