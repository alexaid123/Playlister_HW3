import React, { Component } from 'react';
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal()
{
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    let title = "";
    let artist = "";
    let yID = "";

    function confirmE ()
    {
        store.addEditSongTransaction();
        document.getElementById("edit-song-modal").classList.remove("is-visible");
    }

    function cancelE ()
    {
        document.getElementById("edit-song-modal").classList.remove("is-visible");
    }
      
        return (
            <div 
                className="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-edit-song-root'>
                        <div className="modal-north">
                            Edit Song
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content">
                            <div className="editTexts">
                            Title: 
                            <input className = "text-box" type="text" id="edit-song-title" placeholder=""/>
                        <br></br>
                        Artist:
                        <input className = "text-box" type="text" id="edit-song-artist" placeholder=""/>
                        <br></br>
                        YouTubeId:
                        <input className = "text-box" type="text" id="edit-song-ytid" placeholder=""/>
                    </div>
                            </div>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                className="modal-button" 
                                onClick={confirmE}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                className="modal-button" 
                                onClick={cancelE}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
}

export default EditSongModal;

 