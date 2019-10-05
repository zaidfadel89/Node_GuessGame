// refrence the code plan with tuter

// require letter.js to Word.js
var letter = require('./letter.js');
// word function to split each word(char)
function Word(word) {
  this.letters = word.split('').map(function(char) {
    return new letter(char);
  });
}

Word.prototype.getSolution = function() {
  return this.letters
    .map(function(letter) {
      return letter.getSolution();
    })
    .join('');
};
Word.prototype.toString = function() {
  return this.letters.join(' ');
};
Word.prototype.guessLetter = function(char) {
  var foundLetter = false;
  this.letters.forEach(function(letter) {
    if (letter.guess(char)) {
      foundLetter = true;
    }
  });
  return foundLetter;
};
// if user guess right then return letter
Word.prototype.guessedCorrectly = function() {
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};
module.exports = Word;
