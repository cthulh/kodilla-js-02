(function(){

  var outputBox = document.getElementById("output");
  var resultBox = document.getElementById("result");
  var roundsBox = document.getElementById("roundsToWin");

  var params = {
    currentRound: 0,
    playerScore: 0,
    computerScore: 0,
    winsRequired: 0,
    progress: []
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
    params.currentRound = 0;
    params.playerScore = 0;
    params.computerScore = 0;
    params.winsRequired = 0;
    params.progress = []
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
    params.currentRound ++

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

    // update game progress
    function updateProgress(move, outcome, result){
      // update results
      function updateResults(result){
        // check who won, add a point
        if (result === "0 - 1"){
          params.computerScore++;
          if (params.computerScore == params.winsRequired) {appendElement(roundResultModalMessage, "<br><br> YOU LOST THE ENTIRE GAME!!! <br> COMPUTER IS VICTORIOUS!");}
        } else if (result === "1 - 0"){
          params.playerScore++;
          if (params.playerScore == params.winsRequired) {appendElement(roundResultModalMessage, "<br><br> YOU WON THE ENTIRE GAME!!!");}
        }
        // return updated results
        return (params.playerScore + " - " + params.computerScore);
      }

      params.progress.push({
        roundOutcome: outcome,
        playerMove: move.split("-")[0],
        computerMove: move.split("-")[1],
        result: updateResults(result),
        roundNum: params.currentRound
      });
      console.log(params.progress);
    }


    // update outcome
    function updateOutcome(outcome){
      writeTo(roundResultModalMessage,outcome);
      roundResultsModal.style.display = "block";
    }

    // check if required number of wins has been reached
    function requiredWinsMet(){
      return params.computerScore == params.winsRequired || params.playerScore == params.winsRequired;
    }

    // scenario = playerMove-computerMove
    var scenario = move + "-" + computerMove();

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
    var moves;
    var outcome;
    var result;

    for(var i = 0; i < outcomes.length; i++){

      if (outcomes[i].moves === scenario) {
        outcome = outcomes[i].outcome;
        result = outcomes[i].result;
        moves = outcomes[i].moves;
      }
    }
    console.log(outcome);

    updateOutcome(outcome);
    updateProgress(moves,outcome,result);
  }

  // Get the modals
  var newGameModal = document.getElementById("newGameModal");
  var roundResultsModal = document.getElementById("roundResultModal");

  // Get the button that opens the new game modal
  var newGameBtn = document.getElementById("new_game");

  // Get the <span> element that closes the new game modal
  var submitBtn = document.getElementsByClassName("submit")[0];

  // Get the button that closes the round results modal
  var closeBtn = document.getElementsByClassName("roundResultClose")[0];

  // Get the modal message p
  var newGameModalMessage = document.getElementById("newGameModalMessage");
  var roundResultModalMessage = document.getElementById("roundResultModalMessage");

  // When the user clicks the button, open the modal
  newGameBtn.onclick = function() {
    newGameModal.style.display = "block";
  }

  // Close buttons closes round results modal
  closeBtn.onclick = function() {
    roundResultsModal.style.display = "none";
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
    if (event.target == newGameModal || event.target == roundResultsModal) {
      newGameModal.style.display = "none";
      roundResultsModal.style.display = "none";
    }
  }


}());
