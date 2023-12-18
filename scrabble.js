// Name: Sid Shankar; email - siddarth_shankar@student.uml.edu
// This file contains all the good stuff - the 
// meat of the program. A lot of this was mostly the dragging
// and the dropping of the tiles. There are also 3 structures relating
// to the letters and the frequencies. One of them was the score, as well
// as the images from which I would generate the tiles randomly. The generation 
// was fairly straightforward. There were also the on click listeners
// for each of the buttons to ensure that the letters would generate properly
//, and the scores would update, along with ending the game if the player chose
// to do so. 
var score = 0;
var totalScore = 0;
var letter;
var tile;
var totalLettersRemaining = 88;
// Function to generate a random letter
function getRandomLetter() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // List of possible letters
    var randomIndex = Math.floor(Math.random() * letters.length);
    return letters.charAt(randomIndex);
  }
  
  
  function getTileAtCol(targetCol) {
    // Get the tile that was dropped in the specified column
    var tilesInCol = $(".droppable.target[data-col='" + targetCol + "'] .draggable img");
    if (tilesInCol.length > 0) {
        return tilesInCol.last(); // Return the last tile if multiple tiles are present (stacked)
    } else {
        return $(); // Return an empty jQuery object if no tile is present
    }
}



  function getLetterFromTile(tile) {
    // Extract the letter from the tile source attribute
    return tile.attr("src").match(/\/Scrabble_Tile_(\w)\.jpg/)[1];
  }


  // Mapping between letters and image sources
  var letterImageMap = {
    A: "Scrabble_Tiles/Scrabble_Tile_A.jpg",
    B: "Scrabble_Tiles/Scrabble_Tile_B.jpg",
    C: "Scrabble_Tiles/Scrabble_Tile_C.jpg",
    D: "Scrabble_Tiles/Scrabble_Tile_D.jpg",
    E: "Scrabble_Tiles/Scrabble_Tile_E.jpg",
    F: "Scrabble_Tiles/Scrabble_Tile_F.jpg",
    G: "Scrabble_Tiles/Scrabble_Tile_G.jpg",
    H: "Scrabble_Tiles/Scrabble_Tile_H.jpg",
    I: "Scrabble_Tiles/Scrabble_Tile_I.jpg",
    J: "Scrabble_Tiles/Scrabble_Tile_J.jpg",
    K: "Scrabble_Tiles/Scrabble_Tile_K.jpg",
    L: "Scrabble_Tiles/Scrabble_Tile_L.jpg",
    M: "Scrabble_Tiles/Scrabble_Tile_M.jpg",
    N: "Scrabble_Tiles/Scrabble_Tile_N.jpg",
    O: "Scrabble_Tiles/Scrabble_Tile_O.jpg",
    P: "Scrabble_Tiles/Scrabble_Tile_P.jpg",
    Q: "Scrabble_Tiles/Scrabble_Tile_Q.jpg",
    R: "Scrabble_Tiles/Scrabble_Tile_R.jpg",
    S: "Scrabble_Tiles/Scrabble_Tile_S.jpg",
    T: "Scrabble_Tiles/Scrabble_Tile_T.jpg",
    U: "Scrabble_Tiles/Scrabble_Tile_U.jpg",
    V: "Scrabble_Tiles/Scrabble_Tile_V.jpg",
    W: "Scrabble_Tiles/Scrabble_Tile_W.jpg",
    X: "Scrabble_Tiles/Scrabble_Tile_X.jpg",
    Y: "Scrabble_Tiles/Scrabble_Tile_Y.jpg",
    Z: "Scrabble_Tiles/Scrabble_Tile_Z.jpg",
    // Add more mappings as needed
  };

  var letterScores = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10,
    // Add more mappings as needed
  };

  var letterFrequencies = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1,
    K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6,
    U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1
};
  
// ...
// ...

$(function () {
  $(".draggable").each(function () {
    var randomLetter = getRandomLetter();
    var imageSource = letterImageMap[randomLetter];

    $(this).html("<img src='" + imageSource + "' alt='Tile Image'>");
  });

  $(".draggable").draggable({
    appendTo: '#rack',
    revert: function (valid) {
      return !valid;
    },
    cursorAt: { top: 37, left: 37 }
  });

  $(".droppable.target").droppable({
    drop: function (event, ui) {
      var sourceId = ui.draggable.attr("id");
      var targetRow = $(this).data("row");
      var targetCol = $(this).data("col");
      tile = ui.draggable.find("img");

      if (tile && tile.length > 0) {
        // Get the letter from the tile
        letter = getLetterFromTile(tile);
        console.log("Letter is: " + letter);
        console.log("Tile is: " + tile);
        // Add the score for the letter to the total score
      }

      // Calculate and display the score after each letter is dropped
      if(targetCol == 2 || targetCol == 5 || targetCol == 7 ) {
        score += 2 * letterScores[letter];
      }
      else {
        score += letterScores[letter];
      }
      if(totalLettersRemaining == 0) gameOver();
      else totalLettersRemaining--;
      // Optionally, update a UI element with the current score
      $("#currentScore").text("Current Score: " + score);
      $("#lettersRemaining").text("Letters Remaining " + totalLettersRemaining);
      // Add the "dropped" class to the dragged element
      ui.draggable.addClass("dropped");
    }
  });
$("#generateLetters").on("click", function () {
  // Call getRandomLetter function and update the image source for each draggable element
  $(".draggable").each(function () {
    var randomLetter = getRandomLetter();
    var imageSource = letterImageMap[randomLetter];
    $(this).html("<img src='" + imageSource + "' alt='Tile Image'>");
  });
});

$("#restartGame").on("click", function () {
  // Call getRandomLetter function and update the image source for each draggable element
  totalScore = 0;
  score = 0;
  totalLettersRemaining = 88;
  $("#currentScore").text("Current Score: " + score);
  $("#totalScore").text("Total Score: " + totalScore);
  $("#lettersRemaining").text("Letters Remaining " + totalLettersRemaining);

  // Clear the board by removing all tiles from droppable targets
  $(".droppable.target img").remove();

  // Reset the droppable targets to their initial state
  $(".droppable.target").removeClass("occupied");

  $(".draggable").each(function () {
    var randomLetter = getRandomLetter();
    var imageSource = letterImageMap[randomLetter];
    $(this).html("<img src='" + imageSource + "' alt='Tile Image'>");
  });
});

  $("#submitWord").on("click", function () {
    // Call a function to handle the submission of the word
    totalScore += score;
    score = 0;
    $("#currentScore").text("Current Score: " + score);
    $("#totalScore").text("Total Score: " + totalScore);

    // Clear the board by removing all tiles from droppable targets
    $(".droppable.target img").remove();

    // Generate new letters for the hand based on the number of letters used
    generateNewLetters();
  });

  function gameOver() {
    // Disable buttons
    $("#generateLetters, #submitWord, #restartGame").prop("disabled", true);
  
    // Display game over message
    $("#gameOver").text("Game over! The final score was: " + totalScore);
  }
  

  function generateNewLetters() {
    var rack = $('#rack');
    var droppedLetters = $(".draggable.dropped");
  
    // Sort the dropped letters by their original index
    droppedLetters.sort(function (a, b) {
      return $(a).index() - $(b).index();
    });
  
    droppedLetters.each(function () {
      var randomLetter = getRandomLetter();
      var imageSource = letterImageMap[randomLetter];
      var newLetter = $("<div class='draggable'><img src='" + imageSource + "' alt='Tile Image'></div>");
  
      // Append the new letter to the rack in the correct order
      rack.append(newLetter);
  
      // Remove the old letter
      $(this).remove();
    });
  
    // Make the new letters draggable
    rack.find(".draggable").draggable({
      appendTo: '#rack',
      revert: function (valid) {
        return !valid;
      },
      cursorAt: { top: 37, left: 37 }
    });
  }
  
  
});

