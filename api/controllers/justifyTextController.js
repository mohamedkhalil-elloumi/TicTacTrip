"use strict";

const middleware = require("../middleware/global");

// It processes the text by splitting the text into several lines.
// The length of each line is 80 or less.
const preProcessingText = (text) => {
  // Count the characters per line
  var count = 79;
  // The text separated each time by 80
  var preProcessedText = "";
  var j;
  // We replace any type of whitespace of the text with only 1 whitespace.
  var originalText = text.replace(/\s\s+/g, " ");

  for (let i = 0; i < originalText.length; i++) {
    // We put the character in the text.
    preProcessedText += originalText[i];
    if (i == count) {
      // If we reached the 80 characters and it matches a special character,
      // We break a line and counter takes 80 + the position of the index + 1 in the text
      // Else we go backwars until finding a special character and we remove it from the preprocessed text
      // We break a line and the counter takes the position of the index + 80
      if (isASpecialCharacter(originalText[i])) {
        preProcessedText += "\n";
        count = i + 1 + 80;
      } else {
        j = 0;
        while (isASpecialCharacter(originalText[i])) {
          i--;
          j++;
        }
        preProcessedText = preProcessedText.substr(
          0,
          preProcessedText.length - j
        );
        preProcessedText += "\n";
        count = i + 80;
      }
    }
  }
  // When finished preparing the text, we justify it by adding whitespaces between words in the lines.
  return preProcessedText;
};

const isASpecialCharacter = (character) => {
  let format = /[\:\?!\.,;\ ]/g;
  return format.test(character);
};

// It justifies the text by adding whitespaces between the words.
// We add the whitespaces smoothly so the text can be harmonious.
exports.textJustification = (req, res) => {
  var text = req.body;
  if (!middleware.checkUserRate(req, res)) {
    res
      .status(401)
      .send({
        message: "Impossible to proceed to the justification of the text...",
      });
  }

  var textProcessed = preProcessingText(text);
  const nbWordsPerLine = 80;
  var lines = textProcessed.split(/\n/);

  lines.forEach((line, index) => {
    // We trim the line to remove the whitespaces in the begin and the end of the line
    line = line.trim();

    // If the length of the line < 80, we add whitespaces.
    // Otherwise, we do nothing and we move to the next line.
    if (line.length < nbWordsPerLine) {
      for (let j = 0, k = 1; j < line.length; j++) {
        // If the character is a whiteSpace and the length of the line is inferior to 80, we add a whitespace to the line.
        if (line[j] == " " && line.length < nbWordsPerLine) {
          line = addWhiteSpace(line, j);
          j += k;
        }
        // If we reached the end of the line and the length of the line is still less than 80, we re-iterate to add whitespaces in order to reach the 80.
        if (j == line.length - 1 && line.length < nbWordsPerLine) {
          j = 0;
          k++;
        }
      }

      lines[index] = line;
    }
  });

  // When finishing the treatment of adding the whitespaces, we have our text justified by joining all the lines with a newline each time.
  var textJustified = lines.join("\n");
  return res.status(200).send("<p>" + textJustified + "</p>");
};

const addWhiteSpace = (line, index) => {
  // If the given index is greater than the length, we do nothing
  if (index > line.length - 1) return line;
  // Otherwise, we add a whitespace in the given index of the string str.
  // P.S: we put 2 whitespaces because the whitespace will be removed with the substr(0, index)
  // so to compensate the removed whitespace, we put 2.
  return line.substr(0, index) + "  " + line.substr(index + 1);
};
