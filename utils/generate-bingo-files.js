/*

This file is a utilty tool to help create randomly generated bingo calls and cards.
The purpose of this tool is to create files to test our algorithm against multiple scenarios and any error prone files.

Here are some assumptions I have made:

1. The maximum number we can go up to is 27.
2. Numbers called out are never repeated, so we end up with an array of numbers from 0 to 26, placed in random sequence. 
3. Each card does not have any duplicate numbers.

*/

const fs = require('fs');
const path = require('path');

// path to bingo files
const FILE_DIR = path.join(`${__dirname}`, "../bingo-files");

const CARD_SIZE = 5;
const NUMBER_OF_CALLS = 27;
const NUMBER_OF_CARDS = 3;

// This function generates an array of ascending integers from 0 to input variable 'length', and returns them in a random sequence.
function generateBingoCalls(length) {
    let initArray = Array.from({ length }, (_, v) => v);
    let bingoCalls = [];

    while(initArray.length) {
        let randomIndex = Math.round(Math.random() * (initArray.length - 1));
        bingoCalls.push(initArray[randomIndex]);
        initArray.splice(randomIndex, 1);
    }

    return bingoCalls;
}

// This function generates a bingo card of equal dimension with input variable width 'size'. 'maxNumber' is also included to highlight the maximum number.
function generateBingoCard(size, maxNumber) {
    // include an exception to conform to how we want cards created. If maxNumber is smaller than size^2, we will have to include duplicates, which we don't want. 
    if((size*size) > maxNumber) {
        throw new Error("Size of card is bigger than max number. Please make sure max number is bigger than size^2.")
    }

    let initArray = Array.from({ length: maxNumber }, (_, v) => v);
    let cardGrid = [];
    for(let i = 0; i < size; i++) {
        let row = [];

        for(let j = 0; j < size; j++) {
            let randomIndex = Math.round(Math.random() * (initArray.length - 1));
            row.push(initArray[randomIndex]);
            initArray.splice(randomIndex, 1);
        }

        cardGrid.push(row);
    }

    return cardGrid;
};

// This function helps create a string of numbers, with seperating commas and a new line character.
function createNumberListString(list) {
    let string = "";
    for(let i = 0; i < list.length - 1; i++) {
        string += list[i] + ", ";
    }

    string += list[list.length - 1];
    string += `\n`;

    return string;
}

// This function makes use of the two functions above to generate bingo calls, bingo cards, and saves it to a .txt file.
function generateBingoFile(fileName, cardSize, numOfCalls, numOfCards) {
    let bingoCalls = generateBingoCalls(NUMBER_OF_CALLS);

    let bingoCards = [];
    for(let i = 0; i < numOfCards; i++) {
        bingoCards.push(generateBingoCard(cardSize, numOfCalls));
    }
    
    // create a file, and input data accordingly.
    let createStream = fs.createWriteStream(`${FILE_DIR}/${fileName}`);

    // add bingo calls
    createStream.write(createNumberListString(bingoCalls));
    createStream.write(`\n`);

    // add bingo cards
    for(let i = 0; i < numOfCards; i++) {
        let bingoCard = bingoCards[i];
        for(let j = 0; j < cardSize; j++) {
            createStream.write(createNumberListString(bingoCard[j]));
        }

        createStream.write(`\n`);
    }

    createStream.end();

    console.log(`Successfully created a bingo file with name: ${fileName}`);
}

// generate bingo files for testing purposes. 
try {
    generateBingoFile("test-1.txt", CARD_SIZE, NUMBER_OF_CALLS, NUMBER_OF_CARDS);
    generateBingoFile("test-2.txt", CARD_SIZE, NUMBER_OF_CALLS, NUMBER_OF_CARDS);
    generateBingoFile("test-3.txt", CARD_SIZE, NUMBER_OF_CALLS, NUMBER_OF_CARDS);
    generateBingoFile("test-4.txt", CARD_SIZE, NUMBER_OF_CALLS, NUMBER_OF_CARDS);
    generateBingoFile("test-5.txt", CARD_SIZE, NUMBER_OF_CALLS, NUMBER_OF_CARDS);
} catch (error) {
    console.error(error);
}