import React, {useState} from 'react'
import styles from '../../css/Auth/Registration.module.css'
import {fetchCreateUser, shelters} from "../../api";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import Swal from "sweetalert2";
import moment from "moment/moment";
import {useTranslation} from "react-i18next";


export default function Registration() {
    const [register, setRegister] = useState(() => {
        return {
            name: "",
            surname: "",
            phone: "",
            email: "",
            password: "",
            invalidName: false
        }
    })
    const [invalidName, setInvalidName] = useState('')
    const [invalidSurname, setInvalidSurname] = useState('')
    const [invalidEmail, setInvalidEmail] = useState('')
    const [invalidPhone, setInvalidPhone] = useState('')
    const [invalidPassword, setInvalidPassword] = useState('')


    const {t, i18n} = useTranslation();

    const changeInputRegister = (field, event) => {
        setRegister(prev => {
            return {
                ...prev,
                [field]: event.target.value
            }
        })
    }


    const linkStyle = {
        color: 'black',
        marginLeft: '60px',
        fontSize: '20px',
        marginBottom: '50px'
    };
    const submit = event => {
        event.preventDefault();


        fetchCreateUser({
            name: register.name,
            surname: register.surname,
            phone: register.phone,
            email: register.email,
            password: register.password,
        }).then(res => Swal.fire({
                title: `${t(`alert.ok`)}`,
                icon: 'success',
                confirmButtonText: 'ОК'
            }
        ).then(function () {
            window.location.replace('/login');
        }))
            .catch(e => {
                    Swal.fire({
                            title: `${t(`alert.cancel`)}`,
                            icon: 'error',
                            confirmButtonText: 'ОК'
                        },
                    )

                    setInvalidName('')
                    setInvalidSurname('')
                    setInvalidPhone('')
                    setInvalidEmail('')
                    setInvalidPassword('')

                    console.log('clear')

                    if ((e.response.data.errors.name !== undefined)) {
                        setInvalidName(e.response.data.errors.name[0])
                    }
                    if ((e.response.data.errors.surname !== undefined)) {
                        setInvalidSurname(e.response.data.errors.surname[0])
                    }
                    if (e.response.data.errors.phone !== undefined) {
                        setInvalidPhone(e.response.data.errors.phone[0])
                    }
                    if (e.response.data.errors.email !== undefined) {
                        setInvalidEmail(e.response.data.errors.email[0])
                    }
                    if (e.response.data.errors.password !== undefined) {
                        setInvalidPassword(e.response.data.errors.password[0])
                    }
                }
            )
    }
    return (
        <div className={styles.container}>
            <div className={styles.formRegister}>
                <img src={logo} className="App-logo" alt="logo"/>
                <img src={logo} className="App-logo2" alt="logo"/>
                <form onSubmit={submit} className={styles.form}>
                    <h2>{t('register.title')}</h2>
                    <div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder={`${t(`register.name`)}`}
                            value={register.name}
                            onChange={(event) => changeInputRegister("name", event)}
                            className={styles.input}
                        />
                        <div className={styles.invaid}>
                            {
                                invalidName !== '' && <p className='text-danger'>{invalidName}</p>
                            }
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            placeholder={`${t(`register.surname`)}`}
                            value={register.surname}
                            onChange={(event) => changeInputRegister("surname", event)}
                            className={styles.input}
                        />
                        <div className={styles.invaid}>
                            {
                                invalidSurname !== '' &&
                                <p className='text-danger'>{invalidSurname}</p>
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder={`${t(`register.email`)}`}
                                value={register.email}
                                onChange={(event) => changeInputRegister("email", event)}
                                className={styles.input}

                            />
                        </div>
                        <div className={styles.invaid}>
                            {
                                invalidEmail !== '' && <p className='text-danger'>{invalidEmail}</p>
                            }
                        </div>

                    </div>
                    <div>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder={`${t(`register.phone`)}`}
                            onChange={(event) => changeInputRegister("phone", event)}
                            className={styles.input}

                        />
                        <div className={styles.invaid}>
                            {
                                invalidPhone !== '' && <p className='text-danger'>{invalidPhone}</p>
                            }
                        </div>
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder={`${t(`register.password`)}`}
                            value={register.password}
                            onChange={(event) => changeInputRegister("password", event)}
                            className={styles.input}

                        />
                        <div className={styles.invaid}>
                            {
                                invalidPassword !== '' &&
                                <p className='text-danger'>{invalidPassword}</p>
                            }
                        </div>
                    </div>
                    <button className={styles.btn} onClick={submit}>{`${t(`register.submit`)}`}</button>
                    <a href={"/login"} style={linkStyle}>{`${t(`register.login`)}`}</a>
                </form>
            </div>
        </div>

    )
}
