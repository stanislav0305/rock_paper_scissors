import LinkedSelection from '/linked-selection.js';

export default class LinkedSelectionManager {
    constructor() {
        const r = new LinkedSelection('камень', 'Камень затупляет ножницы.');
        const s = new LinkedSelection('ножницы', 'Ножницы режут бумагу.');
        const p = new LinkedSelection('бумага', 'Бумага закрывает камень.');

        r.setLinks(p, s);
        s.setLinks(r, p);
        p.setLinks(s, r);

        this._selections = [r, s, p];
    }

    getSelectionByValue(value) {
        return this._selections.find(e => e.value == value);
    }

    getSelectionByIndex(index) {
        return this._selections[index];
    }
}