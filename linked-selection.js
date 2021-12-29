import { GAME_RESULT_DRAW, GAME_RESULT_YOU_LOST, GAME_RESULT_YOU_WIN } from '/consts.js';

export default class LinkedSelection {
    constructor(value, winCompareText) {
        this._value = value;
        this._winCompareText = winCompareText;
        this._next = null;
        this._previous = null;
    }

    get value() {
        return this._value;
    }

    setLinks(next, previous) {
        this._next = next;
        this._previous = previous;
    }

    isEqual(linkedSelection) {
        return this._value === linkedSelection._value;
    }

    isGreater(linkedSelection) {
        return this._previous._value === linkedSelection._value;
    }

    getGameResult(linkedSelection) {
        return this.isEqual(linkedSelection) ? GAME_RESULT_DRAW
            : this.isGreater(linkedSelection) ? GAME_RESULT_YOU_LOST
                : GAME_RESULT_YOU_WIN;
    }

    getWinCompareText(gameResult, linkedSelection) {
        return gameResult === GAME_RESULT_DRAW ? ''
            : gameResult === GAME_RESULT_YOU_LOST ? this._winCompareText
                : linkedSelection._winCompareText;
    }

    toString() {
        return this._value;
    }
}