class Room {
    constructor(controlPerson) {
        this.controlPerson = controlPerson;
        this.currentId = this._currentIdEl().currentIdEl;
        this.tableEl = document.createElement('table');
        this.divWrapperEl = document.querySelector('.wrapper');
        this.imgEl = document.createElement('img');
        this.imgEl.src = 'top_and_down.jpg'
        this.tr = null;
        this.td = null;
        this.n = 7;
        this.m = 7;
        for (let i = 0; i < this.m; i++) {
            this.tr = document.createElement('tr');
            for (let j = 0; j < this.n; j++) {
                this.td = document.createElement('td');
                this.td.id = "id" + i + j;
                this.tr.appendChild(this.td);
            }
            this.tableEl.appendChild(this.tr);
        }
        this.startCell = this.tableEl.querySelector("#" + this.currentId)
        this.startCell.appendChild(this.imgEl);
    }

    createRoom() {
        this.divWrapperEl.appendChild(this.tableEl);
        this.viewControlPerson();
    }

    _currentIdEl() {
        const currentState = {
            currentIdEl: ("id" + this.controlPerson.currentColumnIndex) + this.controlPerson.currentCellIndex,
            currentColumnIndex: this.controlPerson.currentColumnIndex,
            currentCellIndex: this.controlPerson.currentCellIndex
        }
        return currentState;
    }

    _addInCellPerson(person, id) {
        console.log(id);
        const cell = this.divWrapperEl.querySelector('#' + id);
        if (person === "next_person") {
            this.imgEl.src = "next.jpg"
        }
        if (person === "prev_person") {
            this.imgEl.src = "prev.jpg"
        }
        if (person === "person") {
            this.imgEl.src = "top_and_down.jpg"
        }
        cell.appendChild(this.imgEl);
    }

    _addPerson(person, id) {
        this._addInCellPerson(person, id);
    }

    _onMovingPerson(e) {
        debugger;
        const currentIdEl = this._currentIdEl().currentIdEl;
        const colInx = this._currentIdEl().currentColumnIndex;
        const cellInx = this._currentIdEl().currentCellIndex;
        if (colInx < 6 && colInx > 0 && cellInx < 6 && cellInx > 0) {
            const currentCell = this.divWrapperEl.querySelector("#" + currentIdEl);
            const currentImg = currentCell.querySelector('img');
            currentImg.remove();
        }
        if (e.keyCode === 39) {
            this.controlPerson.nextPerson(this._addPerson.bind(this));
        }
        if (e.keyCode === 37) {
            this.controlPerson.prevPerson(this._addPerson.bind(this));
        }
        if (e.keyCode === 38) {
            this.controlPerson.topPerson(this._addPerson.bind(this));
        }
        if (e.keyCode === 40) {
            this.controlPerson.downPerson(this._addPerson.bind(this));
        }
    }

    viewControlPerson() {
        document.addEventListener('keyup', this._onMovingPerson.bind(this));
    }
}

class СontrolPerson {
    constructor() {
        this.currentCellIndex = 0;
        this.currentColumnIndex = 0;
        this.id = null;
    }

    _idElement() {
        this.id = ("id" + this.currentColumnIndex) + this.currentCellIndex;
        return this.id;
    }

    nextPerson(callback) {
        if (this.currentCellIndex < 6) {
            this.currentCellIndex += 1;
            const id = this._idElement();
            callback('next_person', id);
        }
    }

    prevPerson(callback) {
        if (this.currentCellIndex > 0) {
            this.currentCellIndex -= 1;
            const id = this._idElement();
            callback('prev_person', id);
        }
    }

    topPerson(callback) {
        if (this.currentColumnIndex > 0) {
            this.currentColumnIndex -= 1;
            const id = this._idElement();
            callback('person', id);
        }
    }

    downPerson(callback) {
        if (this.currentColumnIndex < 6) {
            this.currentColumnIndex += 1;
            const id = this._idElement();
            callback('person', id);
        }
    }
}

const controlPerson = new СontrolPerson()
const room = new Room(controlPerson);

room.createRoom();