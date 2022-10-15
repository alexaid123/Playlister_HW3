import jsTPS_Transaction from "../common/jsTPS.js"

export default class MoveSong_Transaction extends jsTPS_Transaction { 
    constructor(contex, start, end) {
        super();
          this.store = contex;
          this.startI = start;
          this.endI = end;
    }

    doTransaction() {
        this.store.disableButton('redo-button');
        this.store.moveCallback(this.startI, this.endI);
    }
    
    undoTransaction() {
        this.store.moveCallback(this.endI, this.startI);
    }
}