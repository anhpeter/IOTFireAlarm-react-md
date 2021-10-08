import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import RoomList from './components/RoomList';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';

function App() {
    return (
        <Router>
            <Header></Header>

            <Switch>
                <Route path="/room/:id">
                    <RoomPage />
                </Route>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
            <Footer />
        </Router>

    );
}

export default App;
