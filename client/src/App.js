import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, DeleteListModal, DeleteSongModal, Statusbar} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>

            <Statusbar />
            <DeleteListModal id = "deleteModal"/>
            <DeleteSongModal id = "deleteModal"/>
        </Router>
    )
} 

export default App