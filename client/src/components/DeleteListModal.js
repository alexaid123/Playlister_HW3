import React, { Component } from 'react';
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal()
{
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    if(store.listToDeleteName != null)
    {
    function cancelD()
    {
        document.getElementById("delete-list-modal").classList.remove("is-visible");
    }

    function confirmD()
    {
        document.getElementById("delete-list-modal").classList.remove("is-visible");
        store.deletePlaylist(store.listToDeleteId);
    }

        return (
            <div 
                className="modal"  
                id="delete-list-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-delete-list-root'>
                        <div className="modal-north">
                            Delete playlist? 
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content">
                                Are you sure you wish to permanently delete the <span className="dModalName">{store.listToDeleteName}</span> playlist?
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
    return (
        <div 
            className="modal"  
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                        Delete playlist? 
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the <span className="dModalName">{}</span> playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            className="modal-button" 
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            className="modal-button" 
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteListModal;

 