import jsTPS_Transaction from "../common/jsTPS.js"

export default class DeleteSong_Transaction extends jsTPS_Transaction { 
    constructor(contex, inde, neo) {
        super();
          this.store = contex;
          this.index = inde;
          this.song = neo;
    }

    doTransaction() {
        console.log("inhere butrch");
       this.store.deleteSong(this.index);
    }
    
    undoTransaction() {
        this.store.addSongT(this.index, this.song);
    }
}