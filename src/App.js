import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import useSocket from 'use-socket.io-client';

function App() {
    const [socket] = useSocket('ws://localhost:4000', {
        autoConnect: false,
        //any other options
    });
    socket.connect();
    socket.on('test-data', (text) => {
        console.log(text);
    });

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
