import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    function handleDeleteClick(event)
    {
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        store.setSongDe(targetId);
        store.disableButton('add-song-button');
        store.disableButton('close-button');
        store.disableButton('undo-button');
        store.disableButton('redo-button');
        document.getElementById("delete-song-modal").classList.add("is-visible");
    }

    function handleEditSong(event)
    {
        store.disableButton('add-song-button');
        store.disableButton('close-button');
        store.disableButton('undo-button');
        store.disableButton('redo-button');
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        document.getElementById("edit-song-modal").classList.add("is-visible");
        store.setSongEdit(targetId);
    }


  function handleDragStart (event){
        event.dataTransfer.setData("song", event.target.id);
        store.handleMove(true, false);
    }

   function handleDragOver (event) {
        event.preventDefault();
        store.handleMove(false, true);
    }

    function handleDragEnter (event) {
        event.preventDefault();
        store.handleMove(false, true);
    }

   function handleDragLeave (event) {
        event.preventDefault();
        store.handleMove(false, false);
    }

   function handleDrop (event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        store.handleMove(false, false);

        // ASK THE MODEL TO MOVE THE DATA
        store.addMoveSongTransaction(sourceId, targetId);
        //store.moveCallback(sourceId, targetId);
    }



    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={handleEditSong}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable = "true"
        >
            {index + 1}. 
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleDeleteClick}
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;