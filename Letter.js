// refrence the code plan with tuter

// function to make user write only from a to z & 1 and 9 to be true
function Letter(char) {
  //regular expressions
  this.visible = !/[a-z1-9]/i.test(char);
  this.char = char;
}
Letter.prototype.toString = function() {
  if (this.visible == true) {
    return this.char;
  }
  return '_';
};

Letter.prototype.getSolution = function() {
  return this.char;
};
Letter.prototype.guess = function(charGuess) {
  if (charGuess.toUpperCase() === this.char.toUpperCase()) {
    this.visible = true;
    return true;
  }

  return false;
};
// to use (letter) outside this file
module.exports = Letter;
