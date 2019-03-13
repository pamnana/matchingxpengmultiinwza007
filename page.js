class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-text').classList.add('visible');
        document.getElementById('result').innerHTML = "<br>Total Flips : " + this.totalClicks;
    }
    victory() {
        clearInterval(this.countdown);
        document.getElementById('victory-text').classList.add('visible');
        document.getElementById('result-vic').innerHTML = "<br>Total Flips : " + this.totalClicks;

    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched'); 
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const randIndex = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        cardsArray = cardsArray.map((card, index) => {
            card.style.order = index;
        }); 
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
}





if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(60, cards);
    document.getElementById('game-start-text').innerHTML= "<center>Are you ready?<br>Click to Play.</center>";
    var countStart = 3;
    game.shuffleCards(cards);
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            document.getElementById('show1').classList.add('visible')
            document.getElementById('show2').classList.add('visible')
            document.getElementById('show3').classList.add('visible')
            document.getElementById('show4').classList.add('visible')
            document.getElementById('show5').classList.add('visible')
            document.getElementById('show6').classList.add('visible')
            document.getElementById('show7').classList.add('visible')
            document.getElementById('show8').classList.add('visible')
            document.getElementById('show9').classList.add('visible')
            document.getElementById('show10').classList.add('visible')
            document.getElementById('show11').classList.add('visible')
            document.getElementById('show12').classList.add('visible')
            document.getElementById('show13').classList.add('visible')
            document.getElementById('show14').classList.add('visible')
            document.getElementById('show15').classList.add('visible')
            document.getElementById('show16').classList.add('visible')
            setInterval(() => {
            document.getElementById('game-start-text').innerHTML = countStart;
            if(countStart === -1){
                overlay.classList.remove('visible');
                game.startGame();
            }
            countStart--;
        }, 1000);
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}