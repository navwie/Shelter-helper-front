import React, {useState} from 'react'
import styles from '../../css/Auth/Registration.module.css'
import {fetchCreateUser} from "../../api";

export default function Registration() {
    const [register, setRegister] = useState(() => {
        return {
            name: "",
            surname: "",
            phone: "",
            email: "",
            password: "",
        }
    })

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
        marginLeft: '240px',
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
        }).then(() => {
            alert('Вы успешно зарегестрированы')
            window.location.replace('/login');
        })
            .catch(e => {
                alert('Пользователь с такой почтой или номером телефоне уже есть' )

            })
    }
    return (
        <div className={styles.formRegister}>
            <form onSubmit={submit} className={styles.form}>
                <h2>Регистрация</h2>
                <div className={styles.formData}>
                    <label htmlFor="username">Имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={register.name}
                        onChange={(event) => changeInputRegister("name", event)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formData}>
                    <label htmlFor="surname">
                        Фамилия:
                    </label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={register.surname}
                        onChange={(event) => changeInputRegister("surname", event)}
                        className={styles.input}

                    />
                </div>
                <div className={styles.formData}>
                    <label htmlFor="email">Почта:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={register.email}
                        onChange={(event) => changeInputRegister("email", event)}
                        className={styles.input}

                    />
                </div>
                <div className={styles.formData}>
                    <label htmlFor="phone"> Номер телефона: </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        onChange={(event) => changeInputRegister("phone", event)}
                        className={styles.input}

                    />
                </div>
                <div className={styles.formData}>
                    <label htmlFor="password">
                        Пароль:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={register.password}
                        onChange={(event) => changeInputRegister("password", event)}
                        className={styles.input}

                    />
                </div>
                <button className={styles.btn}>Зарегистрироваться</button>
                <p className={styles.account}>Уже есть аккаунт?</p>
                <a href={"/login"} style={linkStyle}>Войти</a>
            </form>
        </div>
    )
}
