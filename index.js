const { parseBingoFile } = require('./utils/parse-bingo-files');
const BingoCard = require('./lib/bingo-card');

/*
    The function parseBingoFile should return a object that is safe to work with.
    This includes every bingo card having the same dimensions, and all numbers 
    are valid. Any error handling in the BingoCard class is therefore not included.
*/

const fileId = 'test-3.txt';
let bingoData = parseBingoFile(fileId, './bingo-files');

let bingoCards = [];
for(let i = 0; i < bingoData.bingoCards.length; ++i) {
    let bingoCard = new BingoCard(bingoData.bingoCards[i], `Card ${i + 1}`);

    bingoCards.push(bingoCard);
}

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

console.log(`============ Squid Bingo Results | File ${fileId} ============\n`);
console.log("Table of results:")
console.table(bingoResults, ["row", "column", "id"])

if(bingoResults.length === 1) {
    console.log(`\nIn order to beat this squid at bingo, the player must choose ${bingoResults[0].id}. \n\n`)
} else if(bingoResults.length === 2) {
    console.log(`\nIn order to beat this squid at bingo, the player must choose either ${bingoResults[0].id} or ${bingoResults[1].id} and hope the squid doesn't pick either of these!`)
} else if(bingoResults.length === 3) {
    console.log(`\nOn this rare occasion, all three bingo cards win at the same time... Maybe the squid will let you go on a tie?`)
} else {
    console.log(`\nThis program has failed to find any cards that can beat this squid at bingo. I'm afraid the player may have to die at sea.`)
}

