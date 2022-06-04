import React, {useEffect, useState} from 'react';
import styles from '../../css/Admin/ProfileAdmin.module.css'
import {useParams} from "react-router-dom";
import {fetchUser} from "../../api";
import pencil from "../../img/pencil.png";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import {useTranslation} from "react-i18next";

require('moment/locale/ru');


const ProfileAdmin = () => {
    const params = useParams();
    const [user, setUser] = useState([])
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const getUser = async () => {
            let store = localStorage.getItem('shelter_id')
            console.log(store)
            const res = await fetchUser(params.id, store).then(resolve => resolve.data);
            const user = res[0]
            setUser(user)

        }
        getUser().then(r => r.data)
    }, [params.id])

    return (
        <div className="AdminProfile text-center">
            <div className={styles.dataInfo}>
                <div className="viewing">
                    <div className="box">
                        <div className={styles.userData}>
                            <img src={logo} className="App-logo3" alt="logo" />
                            <img src={logo} className="App-logo4" alt="logo" />
                            <h2>{t('profile.title')}</h2>
                            <div className={styles.userDataInfo}>
                                <div className={styles.user}>
                                    <p>{t('profile.name')}:</p>
                                    <p>{t('profile.surname')}::</p>
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
                            <button className={styles.changeUser}><a href={`/changeUser/` + params.id}>{t('profile.edit')} <img
                                src={pencil} className={styles.pencil} alt="logo"/> </a></button>
                        </div>
                    </div>
                    <div className="box">

                        <div className={styles.userData}>
                            <h2>{t('shelter_profile.title')}</h2>
                            {
                                user.shelters === undefined
                                    ? ''
                                    : user.shelters.map(shelter => {
                                        return <div>
                                            <div className={styles.userDataInfo}>
                                                <div className={styles.user}>
                                                    <p>{t('shelter_profile.name')}:</p>
                                                    <p>{t('shelter_profile.city')}:</p>
                                                    <p>{t('shelter_profile.address')} :</p>
                                                    <p>{t('shelter_profile.phone')}:</p>
                                                    <p>{t('shelter_profile.email')}:</p>
                                                </div>
                                                <div className={styles.data}>
                                                    <p>{shelter.name}</p>
                                                    <p>{shelter.city}</p>
                                                    <p>{shelter.address}</p>
                                                    <p>{shelter.phone}</p>
                                                    <p>{shelter.email}</p>
                                                </div>
                                            </div>
                                            <button className={styles.changeUser}><a href={`/editShelter/` + shelter.id}>{t('shelter_profile.edit')} <img
                                                src={pencil} className={styles.pencil} alt="logo"/> </a></button>
                                        </div>
                                    })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileAdmin;
