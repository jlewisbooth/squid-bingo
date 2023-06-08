/*

This file is a utilty tool to help parse bingo files and identify bingo calls and bingo cards,
and return them so they can be used in our algorithm.

This parsing has a strict idea on what the file looks like so it can avoid any errors before proceeding.

It expects the file to follow this structure:
- bingo calls
- empty line
- bingo card grid
- empty line
- next bingo card grid
...

It should be able to deal with multiple bingo cards, but it expects an empty line between them,
and will check if the size of the bingo cards are the same. 

*/

const fs = require('fs');
const path = require('path');

function parseBingoFile(fileName, pathToFile) {
    let fileURI = path.join(pathToFile, fileName);
    try {
        // Firstly, we need to check if this file exists.
        if(!fs.existsSync(fileURI)) {
            throw new Error("Unable to locate file. Please make sure you have the right file name, and path to file.")
        }

        const data = fs.readFileSync(fileURI, 'utf8');

        // In order to parse these files, we first split by the new line character 
        // to get a list of individual lines from the text file.
        let lines = data.split(`\n`);

        // Bingo calls 
        let bingoCallsStrings = lines[0].split(',');
        let bingoCalls = bingoCallsStrings.map(str => {
            return parseInt(str);
        })

        // check whether we have an array of numbers
        if(!bingoCalls.every(i => typeof i === "number" && !isNaN(i))) {
            throw new Error("Unable to parse bingo calls (first line of txt file). Not all elements in array are numbers.")
        }

        // Bingo cards
        // Our assumption is every bingo card is seperate by an empty line.
        let cardSize, i = 1, bingoCards = [], attempts = 0, maxAttempts = lines.length;
        while(i < lines.length - 1) {
            // we have reached an empty line
            if(lines[i].length === 0) {
                let bingoCard = [];
                ++i;
                
                // carry on cycling through the list until we reach the next empty line.
                while(i < lines.length && lines[i].length !== 0) {
                    let bingoRowStrings = lines[i].split(',');
                    let row = bingoRowStrings.map(str => {
                        return parseInt(str);
                    });
                    
                    if(!row.every(i => typeof i === "number" && !isNaN(i))) {
                        throw new Error("Unable to parse a row of a bingo card. Not all elements in array are numbers. This could also mean there is a comma at the end of the row without a number to end the line.")
                    }

                    bingoCard.push(row);
                    ++i;
                }

                // make sure bingoCard is populated before adding it to the list.
                if(bingoCard.length > 0) {
                    // initialise the card size
                    if(!cardSize) {
                        cardSize = bingoCard.length;

                    // if we find a bingo card with a different size, we have an inconsistency in our txt file.
                    } else if(cardSize !== bingoCard.length) {
                        throw new Error("Bingo cards provided in the txt file are of inconsistent sizes. Please make sure each card has the same dimensions.")
                    }

                    // We also want to check each row is the same size
                    let firstRow = bingoCard[0];
                    if(!bingoCard.every(r => r.length === firstRow.length)) {
                        throw new Error("Bingo cards provided in the txt file are of incosistent sizes. Rows of bingo cards are not of the same length. Please make sure each card has the same dimensions.")
                    }

                    bingoCards.push(bingoCard);
                }
            } else {
                ++attempts;
            }

            // in order to make sure we are running this function without breaking out of a while loop,
            // a maximum number of attempts is included to pick up any other edge cases we may see.
            if(attempts >= maxAttempts) {
                throw new Error("While trying to parse bingo cards, it got stuck in a while loop. This is most likely due to the structure of the txt file. Please ensure it is the correct structure before continuing.")
            }
        }

        // Now we've parsed our bingo calls and bingo cards, return an object with this information
        return {
            bingoCalls,
            bingoCards
        }
      } catch (err) {
        console.error(err);

        return null;
      }
}

module.exports = {
    parseBingoFile
}