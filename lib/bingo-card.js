class BingoCard {
    // The table variable is the array of rows of bingo numbers we have parsed from the txt file.
    constructor(table, id) {
        // establish table data.
        this.table = table;

        // establish rows and set to 0.
        this.rows = Array(this.table.length).fill(0);

        // establish columns and set to 0.
        // we can set up columns and rows as the same length as table should be a symetrical grid.
        this.columns = Array(this.table.length).fill(0);

        // establish our bingo target.
        this.bingoTarget = this.table.length

        if(!!id) {
            this.id = id;
        }
    }



    // This function checks if the number called out is on it's card, and records it.
    check(bingoCall) {
        // cycle through table to find number. Table is of symetric size so we use the same condition on i and j.
        for(let i = 0; i < this.table.length; ++i) {
            for(let j = 0; j < this.table.length; ++j) {
                if(this.table[i][j] === bingoCall) {
                    this.rows[i] += 1;
                    this.columns[j] += 1;

                    return;
                }
            }
        }
    }
    
    // This function checks if this card has bingo, returning either true or false.
    hasBingo() {
        // An edge case could occur here where a row and column get bingo at
        // the same point. Check both first before returning.
        for(let i = 0; i < this.rows.length; ++i) {
            if(this.rows[i] === this.bingoTarget) {
                this.bingoResult.push({
                    row: i + 1,
                    column: undefined,
                    id: this.id
                });
            }

            if(this.columns[i] === this.bingoTarget) {
                this.bingoResult.push({
                    column: i + 1,
                    row: undefined,
                    id: this.id
                });
            }
        }
        
        if(this.bingoResult.length > 0) {
            return this.bingoResult;
        } else {
            return false;
        }
    }

    // This array holds our table information, and is used when a bingo call is made.
    table = [];

    // This array records our progress on the rows of our table. 
    // When an element reaches our bingo target, this card has won bingo and the row index is shown.
    rows = [];

    // This array records our progress on the columns of our table. 
    // When an element reaches our bingo target, this card has won bingo and the row index is shown.
    columns = [];

    // This is the target we aim to get on a row or column.
    bingoTarget = 0;

    bingoResult = [];

    id = "unknown";
}

module.exports = BingoCard;