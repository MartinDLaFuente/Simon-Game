
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour = [];
var userChosenColour = [];

var randomNumber;



var started = false;
var level = 0;

$(document).keydown(function (objeto) {

  if (!started) {

    $('h1').text('LEVEL ' + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;
  $('h1').text('LEVEL ' + level);

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

playSound(randomChosenColour);
animatePress(randomChosenColour);
}

for (let i = 0; i <= 3; i++) {

  document.querySelectorAll('div .btn')[i].addEventListener('click', function() {

    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);

});
  
}

function playSound(name) {

  var audio2 = new Audio("sounds/" + name + ".mp3");
  audio2.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed');
setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
} , 100);
}


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }

  else
  {
    console.log("ERROR");

    var malo = new Audio("sounds/wrong.mp3");
    malo.play();

    $('h1').text('Game Over, Press Any Key to Restart');


    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');

    }, 200);

    startOver();

  }
}


function startOver() {

  level = 0;
  gamePattern = [];
  started = false;


  
}



