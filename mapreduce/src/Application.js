import App from './App';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Logs from './components/Logs';
function Application(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/logs" target="_blank" element={<Logs/>}/>
        </Routes>
      </BrowserRouter>
    );
}

export default Application;