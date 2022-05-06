import './App.css';
import React, {useEffect, useState} from "react";
import {Routes, Route,} from 'react-router-dom';
import Header from "./components/Headers/HeaderUnauthorized";


function App() {
    const [storage, setStorage] = useState([])

    useEffect(() => {
        let store = localStorage.getItem('authToken')
        setStorage(store)
    }, [])

    return (
        <div>
          <Header/>
            <Routes>

            </Routes>
        </div>
    );
}

export default App;
