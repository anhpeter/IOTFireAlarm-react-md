import './App.css';
import Header from './components/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import styled from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    min-height:100vh;
`;

function App() {

    return (
        <HashRouter>
            <Wrapper>
                <Header></Header>

                <div className="main">
                    <Switch>
                        <Route path="/room/:id">
                            <RoomPage />
                        </Route>
                        <Route path="/" exact>
                            <HomePage />
                        </Route>
                        {/* <Route path="*">
                            <Redirect to="/" />
                        </Route> */}
                    </Switch>
                </div>
            </Wrapper>
        </HashRouter>

    );
}

export default App;
