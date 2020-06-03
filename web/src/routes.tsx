import React from 'react'
import{Route,BrowserRouter} from 'react-router-dom';
import Home from './pages/Home/index';
import RegisterPoint from './pages/registerPoint'


const Routes:React.FC = () => {
     return (
        <BrowserRouter>
            <Route  exact component={Home} path="/"/>
            <Route  component={RegisterPoint} path="/register"/>
        </BrowserRouter>
    )
}
export default  Routes
