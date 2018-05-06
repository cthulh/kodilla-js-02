(function(){

  var buttonRock = document.getElementById("rock");
  var buttonPaper = document.getElementById("paper");
  var buttonScissors = document.getElementById("scissors");
  var outputBox = document.getElementById("output");

  buttonRock.addEventListener("click", function(){playerMove("rock")});
  buttonPaper.addEventListener("click", function(){playerMove("paper")});
  buttonScissors.addEventListener("click", function(){playerMove("scissors")});

  // gat a random integer between 0 and max
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // write to an element
  function writeTo(element, content){
    element.innerHTML = content;
  }

  // check if is a number
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  // start a new game
  function resetGame(rounds){
    var roundsBox = document.getElementById("roundsToWin");
    writeTo(roundsBox, ("Rounds to win: " + rounds));
  }

  function playerMove(move){
    // takes players move
    // generates random number 1 - 3
    function computerMove(){
      var compMove;
      // associate each number with computers move
      switch (getRandomInt(3) + 1) {
        case 1:
          compMove = "rock";
          break;
        case 2:
          compMove = "paper";
          break;
        case 3:
          compMove = "scissors";
          break;
      }
      return compMove;
    }

    // update results
    function updateResults(results){

      var resultBox = document.getElementById("result");
      var currentResults = resultBox.innerHTML == ""? "0 - 0": resultBox.innerHTML;
      var playerPoints = currentResults.split(" - ")[0];
      var computerPoints = currentResults.split(" - ")[1];

      if (results === "0 - 1"){
        computerPoints++;
      } else if (results === "1 - 0"){
        playerPoints++;
      }

      writeTo(resultBox,playerPoints + " - " + computerPoints);
    }

    // update outcome
    function updateOutcome(outcome){
      writeTo(outputBox, outcome);
    }

    // scenario = playerMove-computerMove
    var scenario = move + "-" + computerMove();
    var result;
    // choose outcome from array of keys of player moves vs computer moves
    var outcomes = [
      {
        moves: "paper-paper",
        outcome: "IT'S A DRAW: Both you and computer played Paper!",
        result: "0 - 0"
      },
      {
        moves: "rock-rock",
        outcome: "IT'S A DRAW: Both you and computer played ROCK!",
        result: "0 - 0"
      },
      {
        moves: "scissors-scissors",
        outcome: "IT'S A DRAW: Both you and computer played SCISSORS!",
        result: "0 - 0"
      },
      {
        moves: "paper-rock",
        outcome: "YOU WON: you played PAPER, and computer played ROCK",
        result: "1 - 0"
      },
      {
        moves: "paper-scissors",
        outcome: "YOU LOST: you played PAPER, and computer played SCISSORS",
        result: "0 - 1"
      },
      {
        moves: "rock-paper",
        outcome: "YOU LOST: you played ROCK, and computer played PAPER",
        result: "0 - 1"
      },
      {
        moves: "rock-scissors",
        outcome: "YOU WON: you played ROCK, and computer played SCISSORS",
        result: "1 - 0"
      },
      {
        moves: "scissors-paper",
        outcome: "YOU WON: you played SCISSORS, and computer played PAPER",
        result: "1 - 0"
      },
      {
        moves: "scissors-rock",
        outcome: "YOU LOST: you played SCISSORS, and computer played ROCK",
        result: "0 - 1"
      }
    ]
    // return outcome
    var outcome;
    console.log(scenario);
    for(var i = 0; i < outcomes.length; i++){
      console.log(outcomes[i]);
      if (outcomes[i].moves === scenario) {
        outcome = outcomes[i].outcome;
        result = outcomes[i].result;
      }
    }
    console.log(outcome);
    // write outcome in a div
    updateOutcome(outcome);
    updateResults(result);
  }

  // Get the modal
  var modal = document.getElementById('newGameModal');

  // Get the button that opens the modal
  var newGameBtn = document.getElementById("new_game");

  // Get the <span> element that closes the modal
  var submitBtn = document.getElementsByClassName("submit")[0];

  // Get the modal message p
  var modalMessage = document.getElementById("modalMessage");

  // When the user clicks the button, open the modal
  newGameBtn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on submit button hide modal
  submitBtn.onclick = function() {
    var rounds = document.getElementById("rounds");
    if (isNumber(rounds.value)) {
      resetGame(rounds.value);
      modal.style.display = "none";
      rounds.value = "";
    } else {
      modalMessage.innerHTML = "Please enter a numeric value!";
      rounds.value = "";
    }
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


}());
