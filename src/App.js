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
import HeaderAdmin from "./components/Headers/HeaderAdmin";
import HeaderUser from "./components/Headers/HeaderUser";


function App() {
    const [storage, setStorage] = useState([])
    const [role, setRole] = useState([])


    useEffect(() => {
        let store = localStorage.getItem('authToken')
        let role = localStorage.getItem('role')
        setStorage(store)
        setRole(role)

    }, [])

    return (
        <div>
            {
                storage === null && role !== undefined
                    ? <Header/>
                    : (role === 'true' ? <HeaderAdmin/> : <HeaderUser/>)
            }
            <Routes>
                <Route path="/changeUser/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <ChangeUser/>
                }/>

                <Route path="/profileUser/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <ProfileUser/>
                }/>

                <Route path='/login' element={<Authorization/>}/>
                <Route path='/register' element={<Registration/>}/>
                <Route path='/profileAdmin' element={<ProfileAdmin/>}/>
                <Route path='/createShelter' element={<CreateShelter/>}/>
                <Route path='/createAnimal' element={<CreateAnimal/>}/>
                <Route path='/createAnnouncement' element={<CreateAnnouncement/>}/>
            </Routes>
        </div>
    );
}

export default App;
