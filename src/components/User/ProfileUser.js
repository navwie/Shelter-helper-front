import React, {useEffect, useState} from 'react';
import styles from '../../css/User/Profile.module.css'
import {useParams} from "react-router-dom";
import {fetchUser} from "../../api";

require('moment/locale/ru');


const ProfileUser = () => {
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
        <div className={styles.container}>
            <h2>Профиль</h2>
            <div className={styles.userData}>
                <p>{user.name}</p>
                <p>{user.surname}</p>
                <p>{user.email} </p>
                <p>{user.phone}</p>
                <button className={styles.changeUser}><a href={`/changeUser/` + params.id}>Изменить</a></button>
            </div>
        </div>
    )

}
export default ProfileUser;
