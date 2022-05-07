import './App.css';
import React, {useEffect, useState} from "react";
import {Routes, Route,} from 'react-router-dom';
import Header from "./components/Headers/HeaderUnauthorized";
import Authorization from "./components/Auth/Authorization";
import Registration from "./components/Auth/Registration";
import ChangeUser from "./components/User/ChangeUser";
import ProfileUser from "./components/User/ProfileUser";
import ProfileAdmin from "./components/Admin/ProfileAdmin";
import CreateShelter from "./components/Admin/CreateShelter";
import CreateAnimal from "./components/Admin/CreateAnimal";
import CreateAnnouncement from "./components/Admin/CreateAnnouncement";


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
                <Route path='/login' element={<Authorization/>}/>
                <Route path='/register' element={<Registration/>}/>
                <Route path='/changeUser' element={<ChangeUser/>}/>
                <Route path='/profileUser' element={<ProfileUser/>}/>
                <Route path='/profileAdmin' element={<ProfileAdmin/>}/>
                <Route path='/createShelter' element={<CreateShelter/>}/>
                <Route path='/createAnimal' element={<CreateAnimal/>}/>
                <Route path='/createAnnouncement' element={<CreateAnnouncement/>}/>
            </Routes>
        </div>
    );
}

export default App;
