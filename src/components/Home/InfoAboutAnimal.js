import React, {useEffect, useState} from "react";
import styles from '../../css/Auth/Animal.module.css'
import {bookAnimal, fetchAnimal, fetchShelter, unbookAnimal} from "../../api";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import Swal from "sweetalert2";
import {resolve} from "chart.js/helpers";
import {useTranslation} from "react-i18next";
import button from "bootstrap/js/src/button";

require('moment/locale/ru');

function InfoAboutAnimal() {
    const [animal, setAnimal] = useState([])
    const [booked, setBooked] = useState('')
    const [isBook, setIsBook] = useState(false)
    const [shelter, setShelter] = useState([])
    const [auth, setAuth] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const params = useParams();
    const {t, i18n} = useTranslation();


    useEffect(() => {
        const getAnimals = async () => {
            let res = await fetchAnimal(params.id).then(resolve => resolve.data[0])
            setAnimal(res)
            let store = localStorage.getItem('authToken')
            setAuth(store)
            let bookedDate = new Date(res.booked)
            let nowDate = new Date()

            if (nowDate > bookedDate) {
                unbookAnimal(params.id).then(res => console.log(res))
                setIsBook(false)
            } else {
                setIsBook(true)
            }


            let shelter = await fetchShelter(res.shelter_id)
            console.log(shelter)
            setShelter(shelter.data[0])
        }
        getAnimals()
    }, [params.id])


    const makeBook = (event, id) => {
        event.preventDefault()
        bookAnimal(
            id,
            booked
            ,
            localStorage.getItem('authToken'))
            .then(res => Swal.fire({
                title: `${t('animals.title')}`,
                icon: 'success',
                text: `${t('animals.text')} ${moment(booked).format('lll')}`,
                confirmButtonText: 'ОК'
            })).then(function () {
            window.location.reload();
        }).catch(errors => console.log(errors))
    }

    const addInput = (event) => {
        event.preventDefault();
        setIsVisible(!isVisible);
    }

    const bookedTime = (event) => {
        event.preventDefault();
        setBooked(event.target.value)
    }


    const book = {
        width: '205px',
        backgroundColor: '#B18065',
        border: '1px solid #B18065',
        borderRadius: '20px',
        fontSize: '22px',
        marginTop: '50px',
        marginBottom: '50px',
        padding: '5px',
        color: 'white'
    }

    const select = {
        width: '300px',
        backgroundColor: '#F2D8C0',
        border: '1px solid #F2D8C0',
        borderRadius: '20px',
        fontSize: '22px',
        marginTop: '50px',
        marginBottom: '50px',
        padding: '15px',
        color: 'black'
    }

    const accept = {
        height: '50px',
        marginTop: '57px',
        padding: '10px',
        width: '150px',
        fontSize: '18px',
        borderRadius: '20px',
        marginLeft: '20px',
        backgroundColor: '#0d6efd',
        color: 'white',
        border: '1px solid #0d6efd',
    }

    const b = {
        textAlign: 'center'
    }

    const h6 = {
        marginTop: '20px',
        color: "red",
        fontSize: "24px"
    }

    return (
        <div className={styles.containerAnimal}>
            <div>
                <div className={styles.bookedAnimal}>{isBook === true && <p>{t('animals.booked')}</p>}</div>
                <div className={styles.animal}>
                    <img className={styles.image}
                         src={process.env.REACT_APP_IMAGE_URL + animal.photo}
                         alt=""/>

                    <div className={styles.info}>
                        <div className={styles.p}><strong>{t('animals.name')}:</strong>{animal.name}</div>
                        <div className={styles.p}>
                            <strong>{t('animals.date')}</strong>{moment(animal.birthday).format('ll')}</div>
                        <div className={styles.p}><strong>{t('animals.gender')}:</strong>{animal.gender}</div>
                        <div className={styles.p}><strong>{t('animals.sterilized')}:</strong>{animal.sterilized === true
                            ? `${t('animals.yes')}`
                            : `${t('animals.no')}`
                        }</div>
                        <div className={styles.p}><strong>{t('animals.type')}:</strong>{animal.type}</div>
                        <div className={styles.p}><strong>{t('animals.weight')}:</strong>{animal.weight}</div>
                    </div>
                </div>
                <p>{t('animals.where')}</p>
                <div className={styles.shelter}>
                    <img className={styles.image}
                         src={process.env.REACT_APP_IMAGE_URL + shelter.photo}
                         alt=""/>
                    <div className={styles.info}>
                        <div className={styles.p}><strong>{t('animals.nameShelter')}: </strong> {shelter.name}</div>
                        <div className={styles.p}>
                            <strong>{t('animals.addressShelter')}:</strong> {shelter.city} , {shelter.address}
                        </div>
                        <div className={styles.p}><strong>{t('animals.emailShelter')}: </strong> {shelter.email}</div>
                        <div className={styles.p}><strong>{t('animals.phoneShelter')}: </strong> {shelter.phone}</div>
                    </div>
                </div>
            </div>

            {
                auth !== null && isVisible === false && isBook === false &&
                <button style={book} onClick={event => addInput(event)}>{t('animals.book')}</button>
            }
            {
                auth == null && <h6 style={h6}> {t('animals.condition')}</h6>
            }
            {
                isVisible === true && isBook === false && <div className='d-flex justify-content-center'>
                    <input type="datetime-local" style={select} value={booked} onChange={event => bookedTime(event)}/>
                    <button id="third" disabled={booked === ''} style={accept}
                            onClick={event => makeBook(event, animal.id)}>{t('animals.accept')}
                    </button>
                </div>
            }
        </div>
    );
}

export default InfoAboutAnimal;
