// refrence the code plan with tuter
//  create varebles and require them
var Word = require('./Word.js');
var inquirer = require('inquirer');
var words = require('./words');
var chalk = require('chalk');
// 10 time can guess the word to win
function Game() {
  var self = this;
  this.play = function() {
    this.guessesLeft = 10;
    this.nextWord();
  };
  //   random the next word
  this.nextWord = function() {
    var randomWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randomWord);
    this.makeGuess();
  };

  this.makeGuess = function() {
    this.askForLetter().then(function() {
      // console lost when guessleft hit 0 or less
      if (self.guessesLeft <= 0) {
        console.log('No guesses left \n');
        console.log('solution is: ' + self.currentWord.getSolution());
        self.askUserToPlayAgain();
        // contenue playing while guessleft 1 and up
      } else if (self.currentWord.guessedCorrectly()) {
        console.log('You guessed it right \n');

        self.guessesLeft = 10;

        self.nextWord();
      } else {
        self.makeGuess();
      }
    });
  };
  //   ask user if want to play again

  this.askUserToPlayAgain = function() {
    //  require inquirer works here
    inquirer

      .prompt([
        {
          type: 'confirm',
          name: 'desition',
          message: 'Play again ? '
        }
      ])
      .then(function(input) {
        if (input.desition) {
          self.play();
        } else {
          self.quit();
        }
      });
  };
  //   inquirer to guess a letter should be between a to z & 1 to 9
  this.askForLetter = function() {
    return (
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'choice',
            message: 'Guessa a Letter',
            validate: function(val) {
              return /[a-z1-9]/gi.test(val);
            }
          }
        ])
        //   type correct is user guess write
        .then(function(input) {
          var guessedCorrectly = self.currentWord.guessLetter(input.choice);
          if (guessedCorrectly) {
            console.log('\n Correct \n');
          } else {
            self.guessesLeft--;
            console.log('\n Incorrect \n ');
            console.log('guess left are: ' + self.guessesLeft);
          }
        })
    );
  };
  //   to quit the game if user want to
  this.quit = function() {
    console.log('Thank you for playing');
    process.exit(0);
  };
}
module.exports = Game;
