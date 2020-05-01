var buttonColours = ["red", "blue", "green", "yellow"];

var gameStarted = false;
var level = 0;

let userClickedColor;
let randomGeneratedColor;



$(document).keypress(function () {
  if (gameStarted === false) {
    nextSequence();
    $("#level-title").text("Level " + level);
    gameStarted = true;
  }
});

$(".btn").click(function () {
  userClickedColor = $(this).attr("id");
  playSound(userClickedColor);
  animatePress(userClickedColor);
  checkAnswer();
});

function checkAnswer() {
  if (userClickedColor == randomGeneratedColor) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  randomGeneratedColor = randomChosenColour;

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gameStarted = false;
}
