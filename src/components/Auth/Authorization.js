import React, { useState} from 'react'
import styles from '../../css/Auth/Auth.module.css'
import {Link} from "react-router-dom";
import {fetchLoginUser} from "../../api";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import {useTranslation} from "react-i18next";


export default function Authorization() {
    const [authorization, setAuthorization] = useState(() => {
        return {
            email: "",
            password: "",
        }
    })
    const {t, i18n} = useTranslation();


    const changeInputAuth = (field, event) => {
        setAuthorization(prev => {
            return {
                ...prev,
                [field]: event.target.value
            }
        })
    }

    const linkStyle = {
        color: 'black',
        marginLeft: '40px',
        fontSize: '20px'
    };
    const submit = event => {
        event.preventDefault();
        fetchLoginUser({
            email: authorization.email,
            password: authorization.password,
        }).then(res => {
            localStorage.setItem('id', res.data.userId)
            localStorage.setItem('authToken', res.data.token);
            localStorage.setItem('authTokenDate', new Date().toISOString());
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('shelter_id', JSON.stringify(res.data.shelter_id.map(el => el.id)));

            if(res.data.role){
                window.location.replace('/admin/home/' + res.data.userId);
            }else{
                window.location.replace('/user/home/' + res.data.userId);

            }

        })
            .catch(e => {
                alert(e)
            })
    }
    return (
        <div className={styles.formRegister}>
            <form onSubmit={submit} className={styles.formA}>
                <div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <img src={logo} className="App-logo2" alt="logo" />
                    <h2>{t('login.title')}</h2>
                    <div className={styles.formData}>
                        <input
                            type="email"
                            id="email"
                            placeholder={`${t(`login.email`)}`}
                            name="Пошта"
                            value={authorization.email}
                            onChange={(event) => changeInputAuth("email", event)}
                            className={styles.input}

                        />
                    </div>
                    <div className={styles.formData}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder={`${t(`login.password`)}`}
                            value={authorization.password}
                            onChange={(event) => changeInputAuth("password", event)}
                            className={styles.input}

                        />
                    </div>
                    <button className={styles.btn}>
                        {t('login.submit')}
                    </button>
                </div>
                <Link to="/register" style={linkStyle}>{t('login.register')}</Link>
            </form>
        </div>
    )
}
