export default class Boat {
    constructor(boatName, boatSize) {
        this.name = boatName;
        this.size = boatSize;
        this._health = boatSize;
        this._isAlive = true;
    }

    get isAlive() {
        return this._isAlive;
    }

    isHitted () {
        this._health--;
        
        if(this._health <= 0 && this._isAlive) {
            this._isAlive = false;
        }
    }
}