import React from 'react';
import styles from '../../css/Admin/CreateAnnouncement.module.css'
import {Link, useParams} from "react-router-dom";
import {createAnnouncement, createShelter, fetchUser} from "../../api";
import {useEffect, useState} from "react";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";

const CreateAnnouncement = () => {
    const params = useParams();
    const [description, setDescription] = useState([])
    const [needs, setNeeds] = useState([])
    const [user, setUser] = useState([])
    const [id, setId] = useState('')
    const {t, i18n} = useTranslation();


    useEffect(() => {
        const getUser = async () => {
            let store = localStorage.getItem('authToken')
            let id = localStorage.getItem('id')
            setId(id)
            const res = await fetchUser(id, store).then(resolve => resolve.data);
            let user = res[0].shelters[0].id
            setUser(user)
        }
        getUser()
    }, [params.id])

    const submit = () => {
        let store = localStorage.getItem('authToken')
        let userId = localStorage.getItem('id')

        let announcement = {
            topic: needs,
            description: description,
            shelter_id: user
        }
        createAnnouncement({announcement}, store).then(res => Swal.fire({
                title: 'Вітаємо, ви успішно створили об`яви!',
                icon: 'success',
                confirmButtonText: 'ОК'
            }
        ).then(function () {
            window.location.replace(`/admin/home/` + userId);
        }))
            .catch(e => {
                alert(e)

            })
    }

    const addDescription = (e) => {
        console.log(e.target.value)
        setDescription(e.target.value)
    }

    const change = (event) => {
        console.log(event.target.value)
        setNeeds(event.target.value)
    }


    const select = {
        width: '500px',
        padding: '10px',
        borderRadius: '20px',
        backgroundColor: '#F2D8C0',
        border: '1px solid #F2D8C0',
        fontFamily: `'Comfortaa', cursive`,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '22px',
        lineHeight: '36px',
        marginBottom: '50px'
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <form onSubmit={submit}>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <img src={logo} className="App-logo2" alt="logo"/>
                    <h2>{t('create_announcement.title')}</h2>
                    <div className={styles.formElements}>
                        <div className={styles.elementsRight}>
                            <div>
                                <select id="needs" onChange={change} style={select}>
                                    <option value="food">{t('create_announcement.type.food')}</option>
                                    <option value="toys">{t('create_announcement.type.toys')}</option>
                                    <option value="dishes">{t('create_announcement.type.dishes')}</option>
                                    <option value="medicines">{t('create_announcement.type.medicines')}</option>
                                </select>
                            </div>
                            <div className={styles.description}>
                            <textarea name='description'
                                      id='description'
                                      value={description}
                                      placeholder={t('create_announcement.description')}
                                      onChange={e => addDescription(e)}
                            />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <button className={styles.btn} onClick={submit}>
                {t('create_announcement.submit')}
            </button>
        </div>

    )
}
export default CreateAnnouncement;