let userMove = '';
let computerMove = '';
let result = '';
let game = JSON.parse(localStorage.getItem('game'))||{
    wins : 0,
    looses : 0,
    ties : 0 
};
let gameHistory = JSON.parse(localStorage.getItem('gameHistory'))||[];
renderGameSummary();
renderGameHistory();
function captureUserMove(move){
    userMove = move;
}


function generateComputerMove(){
    let randNum = Math.random();
    if(randNum<1/3){
        computerMove = 'Rock';
    }
    else if(randNum < 2/3){
        computerMove = 'Paper';
    }
    else{
        computerMove = 'Scissors';
    }
}
function evaluateMoves(){
    if(userMove === computerMove){
        result = 'Tie';
    }
    else if ((userMove==='Rock' && computerMove==='Scissors')||
    (userMove==='Scissors' && computerMove==='Paper')||
    (userMove==='Paper' && computerMove==='Rock')){
        //(R,S),(P,R),(S,P)
        result = 'Win';
    }
    else{
        //(S,R),(R,P),(P,S)
        result = 'Loose';
    }
}

function renderGameSummary(){
    const gamesPlayed = game.wins+game.looses+game.ties;
    console.log(`gamesPlayed : ${gamesPlayed}`);
    document.getElementById('wins').innerHTML = game.wins;
    document.getElementById('looses').innerHTML = game.looses;
    document.getElementById('ties').innerHTML = game.ties;
    document.getElementById('gamesPlayed').innerHTML = gamesPlayed;
    console.log(game);

}
function updateGameScore(){
    if(result === 'Win'){
        game.wins++;
    }
    else if(result === 'Tie'){
        game.ties++;
    }
    else{
        game.looses++;
    }
    const gameHistoryItem = {userMove: userMove, computerMove:computerMove, result : result}
    gameHistory.push(gameHistoryItem);
    localStorage.setItem('game',JSON.stringify(game));
    localStorage.setItem('gameHistory',JSON.stringify(gameHistory));
    
}
function renderGameHistory(){
    let finalGameHistoryHTML = `<tr>
            <th>#</th>
            <th>User Move</th>
            <th>Computer Move</th>
            <th>Result</th>
    </tr>`
    console.log(`userMove : ${userMove} computerMove : ${computerMove}
    result: ${result}`);
    console.log(gameHistory)
    for(let i=0;i<gameHistory.length;i++){
        finalGameHistoryHTML += `<tr>
        <td>${i+1}</td>
        <td>${gameHistory[i].userMove}</td>
        <td>${gameHistory[i].computerMove}</td>
        <td>${gameHistory[i].result}</td>
        </tr>`
        ;
    }
    document.getElementById('gameHistory').innerHTML = finalGameHistoryHTML;
}
function resetScore(){
    game = {
        wins:0,
        looses:0,
        ties:0

    };
    gameHistory = [];
    localStorage.setItem('game',JSON.stringify(game));
    localStorage.setItem('gameHistory',JSON.stringify(gameHistory));
}
    
    
        
    
   

