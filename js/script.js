(function(){

  var outputBox = document.getElementById("output");
  var resultBox = document.getElementById("result");
  var roundsBox = document.getElementById("roundsToWin");

  var params = {
    playerScore: 0,
    computerScore: 0,
    winsRequired: 0
  }

  // assign function playerMove to buttons
  var buttons = document.querySelectorAll(".player-move");
  console.log(buttons);
  buttons.forEach(btn => btn.addEventListener("click", function(){playerMove(this.dataset.move)}));

  // gat a random integer between 0 and max
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // append element
  function appendElement(element, content){
    element.innerHTML += content;
  }

  // write to an element
  function writeTo(element, content){
    element.innerHTML = content;
  }

  // blank out div
  function blankOut(...elements){
    for (let element of elements) {
      writeTo(element, "");
    }
  }

  // after game is finished, remind the player to reset it
  function resetReminder(){
    appendElement(outputBox, "<br><br>Game over, please press the new game button!")
  }

  // reset all var's associated with the game
  function resetScores(){
    params.playerScore = 0;
    params.computerScore = 0;
    params.winsRequired = 0;
  }

  // check if is a number
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  // start a new game
  function resetGame(rounds){
    blankOut(resultBox, outputBox, roundsBox);
    resetScores();
    writeTo(roundsBox, ("Rounds to win: " + rounds));
    // set rounds required to win the game
    params.winsRequired = rounds;
  }

  function playerMove(move){

    if (requiredWinsMet()){
      appendElement(outputBox, "<br>Game over, please press the new game button!");
      return;
    }

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
      // check who won, add a point
      if (results === "0 - 1"){
        params.computerScore++;
        if (params.computerScore == params.winsRequired) {appendElement(outputBox, "<br> YOU LOST THE ENTIRE GAME!!! <br> COMPUTER IS VICTORIOUS!");}
      } else if (results === "1 - 0"){
        params.playerScore++;
        if (params.playerScore == params.winsRequired) {appendElement(outputBox, "<br> YOU WON THE ENTIRE GAME!!!");}
      }

      writeTo(resultBox, params.playerScore + " - " + params.computerScore);
    }

    // update outcome
    function updateOutcome(outcome){
      writeTo(outputBox, outcome);
    }

    // check if required number of wins has been reached
    function requiredWinsMet(){
      return params.computerScore == params.winsRequired || params.playerScore == params.winsRequired;
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
  var newGameModal = document.getElementById('newGameModal');

  // Get the button that opens the modal
  var newGameBtn = document.getElementById("new_game");

  // Get the <span> element that closes the modal
  var submitBtn = document.getElementsByClassName("submit")[0];

  // Get the modal message p
  var newGameModalMessage = document.getElementById("newGameModalMessage");

  // When the user clicks the button, open the modal
  newGameBtn.onclick = function() {
    newGameModal.style.display = "block";
  }

  // When the user clicks on submit button hide modal
  submitBtn.onclick = function() {
    var rounds = document.getElementById("rounds");
    if (isNumber(rounds.value) && rounds.value > 0) {
      resetGame(rounds.value);
      newGameModal.style.display = "none";
      rounds.value = "";
    } else {
      newGameModalMessage.innerHTML = "Please enter a numeric value!";
      rounds.value = "";
    }
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == newGameModal) {
      newGameModal.style.display = "none";
    }
  }


}());
