const buttonColours = ["red", "blue", "green", "yellow"]
var randomChosenColor = "";
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    // Flash Chosen Color
    $('#' + randomChosenColor).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChosenColor);
}

function playSound(chosenColor) {
    var audio = new Audio('sounds/' + chosenColor + '.mp3');
    audio.play();
}

function animatePress(chosenColor) {
    $('#' + chosenColor).addClass('pressed');
    setTimeout(() => {
        $('#' + chosenColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("success");
        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver(){
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();

    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
}

function startOver(){
    level=0;
    userPattern=[];
    gamePattern=[];
    started=false;
}

$('.btn').click(function () {
    var userChosenColor = $(this).attr('id');
    userPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userPattern.length - 1);
});

$('html').keypress(() => {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});