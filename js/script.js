var playerDiv = document.getElementById('player');
var computerDiv = document.getElementById('computer');
var mainDiv = document.getElementById('main');
var pMsg = document.getElementById('msg');
var result = document.getElementById('result');
var btnHit = document.getElementById('hit');
var btnStand = document.getElementById('stand');
var randomBool;
var randCardNum;
var cardValue;
var computerCard;
var cardNum = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'];
var cardType = ['C', 'D', 'H', 'S'];
var msg, msgNode;
var dealerScore = 0, playerScore = 0;
var dealerCards = [], playerCards = [];
var countDealerAce =0, countPlayerAce=0;


function generateCard(){
    randCardNum = Math.floor(Math.random() * 13);
    var randCardType = Math.floor((Math.random() * 3)) + 1;
    var cardName = cardNum[randCardNum] + cardType[randCardType];

    return cardName;
}

function createCardView(div, imgSrc){
    //var imgSrc;
    var img = document.createElement("img");
    imgSrc = "images/" + imgSrc + ".jpg";
    img.setAttribute("src", imgSrc);
    img.setAttribute("class", "card-img");

    div.appendChild(img);
}

function getCardValue(num){
    num +=2;
    if(num >= 12){
        cardValue = 10;
    }
    else{
        cardValue = num;
    }
    return cardValue;
}

function setUp(){
    playerDiv.remove();
    computerDiv.remove();
    pMsg.remove();
    dealerScore = 0;
    playerScore = 0;
    countPlayerAce = 0;
    countDealerAce = 0;

    playerDiv = document.createElement('div');
    playerDiv.setAttribute('class', 'player-div');
    playerDiv.setAttribute('id', 'player');

    computerDiv = document.createElement('div');
    computerDiv.setAttribute('class', 'player-div');
    computerDiv.setAttribute('id', 'computer');

    var initialImg = document.createElement('img');
    initialImg.setAttribute('class', 'card-img');
    initialImg.setAttribute('alt', 'Card Image');
    initialImg.setAttribute('src', 'images/blue_back.jpg');
    initialImg.setAttribute('id', 'first-img');

    pMsg = document.createElement('p');
    pMsg.setAttribute('id', 'msg');
    msg = 'PLEASE PLAY...';
    msgNode = document.createTextNode(msg);
    pMsg.appendChild(msgNode);

    computerDiv.appendChild(initialImg);
    mainDiv.prepend(playerDiv);
    mainDiv.prepend(computerDiv);
    result.prepend(pMsg);
    
    dealerSetUp();
    playerSetup();
    enableBtns();
}

function dealerSetUp(){
    let i = 0;
    while(dealerScore<17){
        dealerCards[i] = generateCard();
        dealerScore += getCardValue(randCardNum);
        if(getCardValue(randCardNum) === 11){
            countDealerAce += 1;
        }
        i++;
        //console.log('Dealer score: ' + dealerScore);
    }
    if(dealerScore > 21){
        if(countDealerAce > 0){
            dealerScore -= 10;
        }
        if(generateBool()){
            dealerScore -= getCardValue(randCardNum);
            dealerCards.pop();
        }
    }
    createCardView(computerDiv, dealerCards[1]);
    //console.log(dealerCards);
}

function playerSetup(){
    for(let j=0; j<=1; j++){
        createCardView(playerDiv, generateCard());
        playerScore += getCardValue(randCardNum);
        if(getCardValue(randCardNum) === 11){
            countPlayerAce += 1;
        }
    }
    //console.log('Player score: ' + playerScore);
}

function drawCard(){
    if(playerScore < 21){
        createCardView(playerDiv, generateCard());
        playerScore += getCardValue(randCardNum);
        if(getCardValue(randCardNum) === 11){
            if(playerScore > 21){
                playerScore -= 10;
            }
            else{
                countPlayerAce += 1;
            }
        }
    }
    if(playerScore === 21){
        playerWins();
    } else if(playerScore > 21){
        playerLoseByBust();
    }
    //console.log('Player score: ' + playerScore);
}

function showDealerCards(){
    var firstImg = document.getElementById('first-img');
    var path = 'images/' + dealerCards[0] +'.jpg';
    firstImg.setAttribute('src', path);
    if(dealerCards.length > 2){
        for(let m=2; m<dealerCards.length; m++){
            createCardView(computerDiv, dealerCards[m]);
        }
    }
}

function playerWins(){
    pMsg.innerHTML = "YOU WON!!";
    disableBtns();
    showDealerCards();
}

function playerLoseByBust(){
    pMsg.innerHTML = "BUSTS!!";
    disableBtns();
}

function playerLose(){
    pMsg.innerHTML = "YOU LOST!!";
    disableBtns();
    showDealerCards();
}

function playerTies(){
    pMsg.innerHTML = "PUSH";
    disableBtns();
    showDealerCards();
}

function disableBtns(){
    btnHit.disabled = true;
    btnStand.disabled = true;
}

function enableBtns(){
    btnHit.disabled = false;
    btnStand.disabled = false;
}

function generateBool(){
    var rNum = Math.floor(Math.random() * 100);

    if(rNum % 2 == 0){
        randomBool = true;
    } else{
        randomBool = false;
    }
    return randomBool;
}

function processResult(){
    if(dealerScore > 21){
        playerWins();
    } else{
        if(playerScore > dealerScore){
            playerWins();
        } else if(playerScore < dealerScore){
            playerLose();
        } else if(playerScore == dealerScore){
            playerTies();
        } else{
            alert("Bugs!! Bugs!! Bugs!!");
        }
    }
}
window.onload = function(){
    dealerSetUp();
    playerSetup();
}