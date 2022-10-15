import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction { 
    constructor(contex, inde, tit, arti, yId, neo) {
        super();
          this.store = contex;
          this.index = inde;
          this.song = {title: tit, artist: arti, youTubeId: yId}
          this.curSong = neo;
    }

    doTransaction() {
       this.store.disableButton('redo-button');
       this.store.editSong(this.index, this.curSong);
    }
    
    undoTransaction() {
        this.store.editSong(this.index, this.song);
    }
}