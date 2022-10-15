import jsTPS_Transaction from "../common/jsTPS.js"

export default class AddSong_Transaction extends jsTPS_Transaction { 
    constructor(contex) {
        super();
          this.store = contex;
    }

    doTransaction() {
        this.store.disableButton('redo-button');
        this.store.createNewSong();
    }
    
    undoTransaction() {
        this.store.deleteSongT();
    }
}