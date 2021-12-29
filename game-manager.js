import { GAME_RESULT_DRAW, GAME_RESULT_YOU_LOST, GAME_RESULT_YOU_WIN } from '/consts.js';
import LinkedSelectionManager from '/linked-selection-manager.js';

export default class GameManager {
    _roundCount = 5;
    _linkedSelectionManager = new LinkedSelectionManager();
    _computerScores = 0;
    _playerScores = 0;

    computerPlay() {
        const index = Math.floor(Math.random() * 3);
        const computerSelection = this._linkedSelectionManager.getSelectionByIndex(index);

        return computerSelection;
    }

    playerPlay() {
        let playerSelection = '';
        while (true) {
            const enteredValue = prompt('Введите камень, ножницы или бумага', '').toLowerCase();
            playerSelection = this._linkedSelectionManager.getSelectionByValue(enteredValue);
            if (playerSelection) {
                break;
            }
        }

        return playerSelection;
    }

    calcScores(gameResult) {
        gameResult === GAME_RESULT_YOU_LOST && (this._computerScores++);
        gameResult === GAME_RESULT_YOU_WIN && (this._playerScores++);
    }

    getTotalResult() {
        return this._playerScores === this._computerScores ? GAME_RESULT_DRAW
            : this._playerScores > this._computerScores ? GAME_RESULT_YOU_WIN
                : GAME_RESULT_YOU_LOST;
    }

    playRound(playerSelection, computerSelection) {
        const gameResult = computerSelection.getGameResult(playerSelection);
        const winCompareText = computerSelection.getWinCompareText(gameResult, playerSelection);

        this.calcScores(gameResult);

        return `${gameResult} ${winCompareText}`;
    }

    game() {
        for (let i = 1; i <= this._roundCount; i++) {
            console.log(`РАУНД ${i}`);
            console.log('----------')

            const playerSelection = this.playerPlay();
            console.log(`Вы выбрали "${playerSelection.value}"`);

            const computerSelection = this.computerPlay();
            console.log(`Компютер выбрали "${computerSelection.value}"`);

            const result = this.playRound(playerSelection, computerSelection);
            console.log(result);

            console.log('----------')
        }

        console.log('ИТОГО:');
        console.log(`У вас очков: ${this._playerScores}`);
        console.log(`У компютера очков: ${this._computerScores}`);
        console.log('---')
        console.log(this.getTotalResult());
    }
}