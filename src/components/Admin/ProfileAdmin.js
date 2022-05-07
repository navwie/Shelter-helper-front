import React, {useEffect, useState} from 'react';
import styles from '../../css/Admin/ProfileAdmin.module.css'
import {useParams} from "react-router-dom";
import {fetchUser} from "../../api";

require('moment/locale/ru');


const ProfileAdmin = () => {
    const params = useParams();
    const [user, setUser] = useState([])

    useEffect(() => {
        const getUser = async () => {
            let store = localStorage.getItem('authToken')
            const res = await fetchUser(params.id, store).then(resolve => resolve.data);
            const user = res.data
            setUser(user)

        }
        getUser().then(r => r.data)
    }, [params.id])

    return (
        <div className="AdminProfile text-center">
            <div className="dataInfo">
                <div className="viewing">
                    <div className="box">
                        <div className="infobox">
                            <h2>Данные об админе</h2>
                            <div className="data">
                                <p className="dataTitle">Имя</p>
                                <p>Здесь имя</p>
                            </div>
                            <div className="data">
                                <p className="dataTitle">Фамилия</p>
                                <p>Здесь фамилия</p>
                            </div>
                            <div className="data">
                                <p className="dataTitle">Номер телефона</p>
                                <p>numberOfPhone</p>
                            </div>
                            <div className="data">
                                <p className="dataTitle">Email</p>
                                <p>HereEmail</p>
                            </div>
                            <a id="submitButton1" href="/userChangeData" className="btn btn-primary">Изменить данные о пользователи</a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="infobox">
                            <h2>Данные о приюте</h2>
                            <div className="data">
                                <p className="dataTitle">Название приюта</p>
                                <p>Здесь название приюта</p>
                            </div>
                            <div className="data">
                                <p className="dataTitle">Адресс</p>
                                <p>Здесь адресс</p>
                            </div>
                            <div className="data">
                                <p className="dataTitle">Номер телефона</p>
                                <p>Здесь номер</p>
                            </div>
                            <div className="data">
                                <p className="dataTitle">Email</p>
                                <p>Здесь email</p>
                            </div>
                            <a id="submitButton" href="/editShelter" type="submit" className="btn btn-primary">Изменить данные о приюте</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileAdmin;
