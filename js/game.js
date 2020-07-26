const buttonColours=["red","blue","green","yellow"]
var randomChosenColor="";
var gamePattern=[];
var userPattern=[];

var started=false;

function nextSequence(){
    var levelString=$('#level-title').text();
    var currentLevel=parseInt(levelString.slice(levelString.length-1))+1;
    $('#level-title').text(levelString.slice(0,levelString.length-1)+currentLevel);
    var randomNumber= Math.floor(Math.random() * 4);
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

function animatePress(chosenColor){
    $('#'+chosenColor).addClass('pressed');
    setTimeout(()=>{
        $('#'+chosenColor).removeClass('pressed');
    }, 100);
}

$('.btn').click(function (){
    var userChosenColor=$(this).attr('id');
    userPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
});

$('html').keypress(()=>{
    if(!started){
        started=true;
        $('#level-title').text('Level 0');
        nextSequence();
    }
});