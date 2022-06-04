import './App.css';
import logo from './img/icons8-кошачий-след-100 13.png';
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
import ChangeShelter from "./components/Admin/EditShelter";
import AboutUs from "./components/Home/AboutUs";
import AllAnimal from "./components/Admin/AllAnimal";
import UserHome from "./components/User/UserHome";
import EditAnimal from "./components/Admin/EditAnimal";
import Chart from "./components/Home/Chart/Chart";
import ChartShelterAnimal from "./components/Admin/ChartShelterAnimal";
import ChartCreateAnnouncement from "./components/Home/Chart/ChartCreateAnnouncement";
import ChartCreateShelter from "./components/Home/Chart/ChartCreateShelter";
import ChartDoneAnnouncement from "./components/Home/Chart/ChartDoneAnnouncement";
import AllAnimalHome from "./components/Home/AllAnimalHome";
import InfoAboutAnimal from "./components/Home/InfoAboutAnimal";
import AnnouncementHome from "./components/Home/Announcement/AnnouncementHome";
import AllAnnouncement from "./components/Admin/AllAnnouncement";
import i18n from "./i18n";
import {withTranslation} from "react-i18next";

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
        <div className="App" >
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

                <Route path="/profileAdmin/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <ProfileAdmin/>
                }/>

                <Route path="/createShelter/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <CreateShelter/>
                }/>

                <Route path="/createAnimal/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <CreateAnimal/>
                }/>

                <Route path="/editShelter/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <ChangeShelter/>
                }/>

                <Route path="/editAnimal/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <EditAnimal/>
                }/>

                <Route path="/admin/home/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <AllAnimal/>
                }/>

                <Route path="/admin/home/chart/:id" element={
                    storage === null
                        ? <Authorization/>
                        : <ChartShelterAnimal/>
                }/>
                <Route path="/admin/home/announcement" element={
                    storage === null
                        ? <Authorization/>
                        : <AllAnnouncement/>
                }/>

                <Route path='/user/home/:id' element={<UserHome/>}/>
                <Route path='/login' element={<Authorization/>}/>
                <Route path='/chart' element={<Chart/>}/>
                <Route path='/allAnimalHome' element={<AllAnimalHome/>}/>
                <Route path='/allAnnouncement' element={<AnnouncementHome/>}/>
                <Route path='/animalInfoHome/:id' element={<InfoAboutAnimal/>}/>
                <Route path='/chartCreateAnnouncement' element={<ChartCreateAnnouncement/>}/>
                <Route path='/chartCreateShelter' element={<ChartCreateShelter/>}/>
                <Route path='/chartDoneAnnouncement' element={<ChartDoneAnnouncement/>}/>
                <Route path='/register' element={<Registration/>}/>
                <Route path='/aboutUs' element={<AboutUs/>}/>
                <Route path='/createAnnouncement' element={<CreateAnnouncement/>}/>
            </Routes>
        </div>
    );
}

export default App;
