/*

    This is the entry file to solving how to beat a squid at bingo.

    Included in this project are:
    1. A generation script that builds test .txt files - ./utils/generate-bingo-files.js
    2. A parsing script to safely read these .txt files - ./utils/parse-bingo-files.js
    3. A class file that contains logic to help decide which bingo card to choose - ./lib/bingo-card.js

    In order to use this entry script, it uses variables FILE_ID and DIR to help find a .txt
    file to use. It can only solve one file at a time, so you will need to change the variable
    FILE_ID to test a different file.

    The function parseBingoFile should return a object that is safe to work with.
    This includes every bingo card having the same dimensions, and all numbers 
    are valid. Any error handling in the BingoCard class is therefore not included.
*/

const { parseBingoFile } = require('./utils/parse-bingo-files');
const BingoCard = require('./lib/bingo-card');

// Change FILE_ID to test different files in the ./bingo-files dir
const FILE_ID = 'test-1.txt';
const DIR = './bingo-files';

function solve(fileId, dir) {
    let bingoData = parseBingoFile(fileId, dir);

    // construct a list of bingo cards from the parsed file.
    let bingoCards = [];
    for(let i = 0; i < bingoData.bingoCards.length; ++i) {
        let bingoCard = new BingoCard(bingoData.bingoCards[i], `Card ${i + 1}`);
    
        bingoCards.push(bingoCard);
    }
    
    // cycle through the bingo calls until you end up with one winner.. or multiple!
    let bingoResults = [];
    for(let bingoCall of bingoData.bingoCalls) {
        // Let each bingo card know what number has been called, and update records.
        for(let card of bingoCards) {
            card.check(bingoCall);
        }
    
        // We check if all cards have the chance of bingo, before declaring the winner.
        // It could be a rare occurance, but two bingo cards could win at the same time.
        // We hopefully account for that here.
        for(let card of bingoCards) {
            let bingoResult = card.hasBingo();
    
            if(bingoResult) {
                bingoResults = bingoResults.concat(bingoResult);
            }
        }
    
        // If any card has bingo, break for loop.
        if(bingoResults.length > 0) {
            break;
        }
    }

    return bingoResults;
}

// begin to solve our problem!
let results = solve(FILE_ID, DIR);

console.log(`============ Squid Bingo Results | File ${FILE_ID} ============\n`);
console.log("Table of results:")
console.table(results, ["row", "column", "id"])

if(results.length === 1) {
    console.log(`\nIn order to beat this squid at bingo, the player must choose ${results[0].id}. \n\n`)
} else if(results.length === 2) {
    console.log(`\nIn order to beat this squid at bingo, the player must choose either ${results[0].id} or ${results[1].id} and hope the squid doesn't pick either of these!`)
} else if(results.length === 3) {
    console.log(`\nOn this rare occasion, all three bingo cards win at the same time... Maybe the squid will let you go on a tie?`)
} else {
    console.log(`\nThis program has failed to find any cards that can beat this squid at bingo. I'm afraid the player may have to die at sea.`)
}
