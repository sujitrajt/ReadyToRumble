// 1. Deposit some money 
// 2. DEtermine the number of lun
// 3. Collect a Bet Amount 
// 4. spin the machine 
// 5. check if the user has won 
// 6. give the user their winning 
//7. play again 

const prompt = require("prompt-sync")()
const ROWS = 3;
const COLS = 3 
const SYMBOL_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}
const SYMBOL_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit = () => {
    while(true){
        const depositAmt = prompt("Enter the Amount to be Depoisted: ")
        const numberDepositAmt = parseFloat(depositAmt);
        if(isNaN(numberDepositAmt) || numberDepositAmt <= 0) {
            console.log("Enter valid number greater than zero. Try Again!")
        } else {
            return numberDepositAmt;
        }
    }
};

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the Lines to bet on(1-3): ")
        const numberOfLines = parseFloat(lines);
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of Lines. Try Again!")
        } else {
            return numberOfLines;
        }
    }
}

const getBet = (balance, lines) => {

    while(true){
        const bet = prompt("Enter the amount to bet per line: ")
        const betAmt = parseFloat(bet);
        if(isNaN(betAmt) || betAmt <= 0 || betAmt > balance / lines){
            console.log("Invalid Bet. Try Again!")
        } else {
            return betAmt;
        }
    }
}

const spin = () => {
    const symbols = [];
    const reels = [[],[],[]]
    for(const [symbol,value] of Object.entries(SYMBOL_COUNT)){
        // console.log(symbol,value)
        for(let i = 0 ;i < value ; i++){
            symbols.push(symbol)
        }

    }
    for(let i = 0 ; i < COLS ; i++){
        const reelSymbol = [...symbols]
        for(let j=0; j< ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbol.length)
            const selectedSymbol = reelSymbol[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbol.splice(randomIndex,1)
        }
    }
    return reels;
    // console.log(symbols)
}

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows) {
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows,betAmt,numberOfLines) => {
    let winnings = 0;
    for(let row = 0; row < numberOfLines ; row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }

        }
        if(allSame){
            winnings += betAmt * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = () => {
    let balance = deposit();
    while(true){
        console.log("Current Balance = ",balance)
        const numberOfLines = getNumberOfLines();
        const betAmt = getBet(balance,numberOfLines);
        // console.log(betAmt);
        balance -= betAmt * numberOfLines
        const reels = spin();
        // console.log("reels",reels)
        const rows = transpose(reels)
        // console.log("---",rows);
        printRows(rows);
        const winnings = getWinnings(rows,betAmt,numberOfLines);
        balance += winnings;
        console.log("You won $"+winnings.toString())
        if(balance <= 0) {
            console.log("You ran out of Money")
            break;
        }
        const playAgain = prompt("Do you want to continue (y/n)? ")
        if (playAgain != 'y') break;
    }
}
game();