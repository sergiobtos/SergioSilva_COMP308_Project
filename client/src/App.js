import React from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import  Home from './components/Home/Home';
import AfterLogin from './components/AfterLogin';


const App = () => (
    <BrowserRouter>
        <Container maxWidth="lg">
            <Home />
            <div>
                <Route render ={()=> <AfterLogin />} path="/afterlogin"/>
            </div>
        </Container>
    </BrowserRouter>
    
);

export default App;