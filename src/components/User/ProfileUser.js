import React, {useEffect, useState} from 'react';
import styles from '../../css/User/Profile.module.css'
import {useParams} from "react-router-dom";
import {fetchUser} from "../../api";
import pencil from '../../img/pencil.png';
import logo from "../../img/icons8-кошачий-след-100 13.png";
import {useTranslation} from "react-i18next";

require('moment/locale/ru');


const ProfileUser = () => {
    const params = useParams();
    const [user, setUser] = useState([])
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const getUser = async () => {
            let store = localStorage.getItem('authToken')
            const res = await fetchUser(params.id, store).then(resolve => resolve.data);
            let user = res[0]
            setUser(user)
        }
        getUser()
    }, [params.id])

    return (
        <div className={styles.container}>
            <div className={styles.userData}>
                <img src={logo} className="App-logo3" alt="logo" />
                <img src={logo} className="App-logo4" alt="logo" />
                <h2>{t('profile.title')}</h2>
                <div className={styles.userDataInfo}>
                    <div className={styles.user}>
                        <p>{t('profile.name')}:</p>
                        <p>{t('profile.surname')}:</p>
                        <p>{t('profile.email')} :</p>
                        <p>{t('profile.phone')}:</p>
                    </div>
                    <div className={styles.data}>
                        <p>{user.name}</p>
                        <p>{user.surname}</p>
                        <p>{user.email} </p>
                        <p>{user.phone}</p>
                    </div>
                </div>
                <button className={styles.changeUser}><a href={`/changeUser/` + params.id}>{t('profile.edit')}  <img src={pencil} className={styles.pencil} alt="logo" /> </a></button>
            </div>
        </div>
    )

}
export default ProfileUser;
