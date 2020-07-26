// Global Declarations
const buttonColours = ["red", "blue", "green", "yellow"]
var randomChosenColor = "";
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// User Key Press Listener
$('html').keypress(() => {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// User Click Listener
$('.btn').click(function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// Game Answer Checker
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        gameOver();
    }
}

// Next Sequence Generator
function nextSequence() {
    level++;
    userClickedPattern=[];
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    // Flash Chosen Color
    $('#' + randomChosenColor).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChosenColor);
}

// Button Sound Handler
function playSound(chosenColor) {
    var audio = new Audio('sounds/' + chosenColor + '.mp3');
    audio.play();
}

// Button Animation Handler
function animatePress(chosenColor) {
    $('#' + chosenColor).addClass('pressed');
    setTimeout(() => {
        $('#' + chosenColor).removeClass('pressed');
    }, 100);
}



// Game Over Handler
function gameOver(){
    playSound("wrong");

    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);
    startOver();
}

// Game restarter
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
