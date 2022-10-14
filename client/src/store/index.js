import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api, { updatePlaylistById,  updateSongsById} from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    CREATE_NEW_SONG: "CREATE_NEW_SONG",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    HANDLE_DRAG: "HANDLE_DRAG",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listDeleteActive: false,
        isDragging: false,
        draggedTo: false,
        listToDeleteName: null,
        listToDeleteId: null,
        deleteSongName: null,
        deleteSongid: null,
        editSongId: null
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                })
            }
            // CREATE A NEW Song
            case GlobalStoreActionType.CREATE_NEW_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: payload.name,
                    listToDeleteId: payload.id,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                });
            }

            // PREPARE TO DELETE A SONG
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: payload.name,
                    deleteSongid: payload.deleteInd
                });
            }

            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                });
            }

            // START DELETE LIST MODAL
            case GlobalStoreActionType.SET_LIST_DELETE_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listDeleteActive: true,
                    isDragging: store.isDragging,
                    draggedTo: store.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                });
            }

            // DRAG START
            case GlobalStoreActionType.HANDLE_DRAG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.currentList,
                    listDeleteActive: store.currentList,
                    isDragging: payload.isDragging,
                    draggedTo: payload.draggedTo,
                    listToDeleteName: store.listToDeleteName,
                    listToDeleteId: store.listToDeleteId,
                    deleteSongName: store.deleteSongName,
                    deleteSongid: store.deleteSongid
                });
            }

            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST 
        async function asyncChangeListName(id, newName) {
            let response = await api.getPlaylistById(id); 
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    let par = {list: playlist, change: true}
                   response = await api.updateSongsById(playlist._id, par);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                                store.idNamePairs.name = newName;
                                store.loadIdNamePairs();
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id, newName);
    }

    store.handleMove = function (first, second)
    {
        storeReducer({
            type: GlobalStoreActionType.HANDLE_DRAG,
            payload: {
                isDragging: first,
                draggedTo: second
            }
        });
    }

    store.moveCallback = function (start, end)
    {
        start = start.substring(0,1);
        end = end.substring(0,1);
        async function asyncMoveSong(start, end) {
            let response = await api.getPlaylistById(store.currentList._id); 
            if (response.data.success) {
               
                let list = response.data.playlist;
                
                // WE NEED TO UPDATE THE STATE FOR THE APP
               list.songs.splice(end, 0, list.songs.splice(start, 1)[0]);
                async function updateSong(list) {
                    let par = {list: list, change: false}
                   response = await api.updateSongsById(list._id, par);
                    if (response.data.success) {
                        async function getListPairs(list) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CREATE_NEW_SONG,
                                    payload: list
                                });
                            }
                        }
                        getListPairs(list);
                    }
                }
                updateSong(list);
            }
        }
        asyncMoveSong(start, end);
    }


    store.deletePlaylist = function (id) {
        async function asyncDeleteList(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success)
            {
                async function asyncGetPlaylistPairs()
                {
                    let response = await api.getPlaylistPairs();
                    if (response.data.success) {
                    let playlist = response.data.playlist;
                    if (response.data.success) {
                       store.loadIdNamePairs();
                    }
                }
                }
                asyncGetPlaylistPairs();
            }
        }
        asyncDeleteList(id);
    }


    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: {}
        });
    }

    store.setIsListDeleteActive = function (id) {
        async function asyncGetPlaylist(id)
        {
                let response = await api.getPlaylistById(id);
                if (response.data.success) {
                let playlist = response.data.playlist;
                    storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {name: playlist.name, id: playlist._id}
                    });
                }
        }
        asyncGetPlaylist(id);
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.createNewList = function () {
        async function asyncCreateNewList() {
            const payload = { name: "Untitled"}
            let response = await api.createPlaylist(payload);
            if (response.data.success)
            {
                async function asyncGetPlaylistPairs()
                {
                    let response = await api.getPlaylistPairs();
                    if (response.data.success) {
                    let playlist = response.data.playlist;
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.CREATE_NEW_LIST,
                            payload: playlist
                        });
                        store.loadIdNamePairs();
                        let num = store.idNamePairs.length;
                        store.newListCounter = num;
                        store.setCurrentList(response.data.idNamePairs[store.newListCounter]._id);
                    }
                }
                }
                asyncGetPlaylistPairs();
            }
            
        }
        asyncCreateNewList();
    }


    store.setSongEdit = function (index)
    {
        index = index.substring(0,1);
        console.log(index);
        let songs = store.currentList.songs;
        let title = songs[index].title;
        let artist = songs[index].artist;
        let yID = songs[index].youTubeId;
        document.getElementById("edit-song-title").value = title;
        document.getElementById("edit-song-artist").value = artist;
        document.getElementById("edit-song-ytid").value = yID;
    }

    store.createNewSong = function () 
    {
        async function asyncCreateNewSong() {
            let response = await api.getPlaylistById(store.currentList._id); 
            if (response.data.success) {
                let playlist = response.data.playlist;
                store.newListCounter += 1;
                let song = {title: store.newListCounter, artist: "Unknown", youTubeId: "dQw4w9WgXcQ"};
                playlist.songs.push(song);
                async function updateSong(playlist) {
                    let par = {list: playlist, change: false}
                   response = await api.updateSongsById(playlist._id, par);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CREATE_NEW_SONG,
                                    payload: playlist
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateSong(playlist);
            }
        }
        asyncCreateNewSong();
     }


     store.setSongDe = function (index) 
    {
            index = index.substring(5);
            console.log(index);
            let pame = index;
            
            storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: {name: store.currentList.songs[index].title, deleteInd: index}
            });

            store.deleteSongid = index;
    }

     store.deleteSong = function (index) 
    {
        async function asyncDeleteSong(index) {
            let response = await api.getPlaylistById(store.currentList._id); 
            if (response.data.success) {
                let playlist = response.data.playlist;
                
                //index = index.substring(5);
                playlist.songs.splice(index, 1);
                 
                async function updateSongD(playlist) {
                    let par = {list: playlist, change: false}
                   response = await api.updateSongsById(playlist._id, par);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CREATE_NEW_SONG,
                                    payload: playlist
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateSongD(playlist);
            }
        }
        asyncDeleteSong(index);
     }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }

    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}