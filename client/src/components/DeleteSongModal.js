import React, { Component } from 'react';
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal()
{
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
   
    
    
    /*let index = 0;
    if(store.currentList != null)
    {
        
        for(let i = 0; i < store.currentList.songs.length; i++)
        {
            if(store.currentList.songs[i].title == store.deleteSongName)
            {
                index = i;
                break;
            }
        }
        console.log("ARHIGOS " + index);
    }*/

    function cancelD()
    {
        document.getElementById("delete-song-modal").classList.remove("is-visible");
    }

    function confirmD()
    {
        document.getElementById("delete-song-modal").classList.remove("is-visible");
        console.log("GAMO " + store.deleteSongid);
        store.deleteSong(store.deleteSongid);
    }
        return (
            <div 
                className="modal"  
                id="delete-song-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-delete-list-root'>
                        <div className="modal-north">
                            Remove song? 
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content">
                                Are you sure you wish to permanently delete the <span className="dModalName">{store.deleteSongName}</span> song from the playlist?
                            </div>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="delete-list-confirm-button" 
                                className="modal-button" 
                                onClick = {confirmD}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-list-cancel-button" 
                                className="modal-button" 
                                onClick = {cancelD}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
}

export default DeleteSongModal;

 