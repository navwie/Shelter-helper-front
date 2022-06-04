import React from 'react';
import styles from '../../css/User/UserAboutUs.module.css'
import {Link, useParams} from "react-router-dom";
import an from '../../img/animals.jpeg'
import {
    allAnimal,
    allAnimalsCount,
    allShelterCount,
    shelters
} from "../../api";
import {useEffect, useState} from "react";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import amountOfAnimals from '../../img/amountAnimals.png';
import amountOfShelters from '../../img/amountShelter.png';
import year from '../../img/creatingYear.png'
import dog from '../../img/png_dog_1334.png'
import phone from '../../img/494a4a5a-cf9b-4373-a3d6-1ee71c8f2a34.png'
import map from '../../img/db0f9375-923e-48bb-a060-54b690ae2aa4.png'
import email from '../../img/message.png'
import {useTranslation} from "react-i18next";

const UserHome = () => {
    const params = useParams();
    const {t, i18n} = useTranslation();
    const [amountAnimals, setAmountAnimals] = useState([])
    const [amountShelters, setAmountShelters] = useState([])
    const [animal, setAnimal] = useState([])
    const [animalImages, setAnimalImages] = useState([])
    const [shelterImages, setShelterImages] = useState([])
    const [shelter,setShelter] = useState([])


    useEffect(() => {
        const getAllAnimals = async () => {
            let store = localStorage.getItem('authToken')
            let id = localStorage.getItem('id')

            const allAnimals = await allAnimal().then(resolve => resolve.data);
            const allShelters = await shelters().then(resolve => resolve.data);
            setShelter(allShelters.shelters)
            setAnimal(allAnimals.animals);

            let newImages = [];
            let newImagesShelter = [];
            for (let i = 0; i < 3; i++) {
                newImages.push(allAnimals.animals[Math.floor(Math.random() * allAnimals.animals.length)].photo);
                newImagesShelter.push(allShelters.shelters[Math.floor(Math.random() * allShelters.shelters.length)].photo);
            }
            setShelterImages(newImagesShelter)
            setAnimalImages(newImages);

            function switchImage() {
                let newImages = [];
                let newImagesShelter = [];
                console.log('call function')
                console.log(allAnimals.animals)
                console.log(allShelters.shelters)

                if (allAnimals.animals.length > 0) {
                    for (let i = 0; i < 3; i++) {
                        newImages.push(allAnimals.animals[Math.floor(Math.random() * allAnimals.animals.length)].photo);
                    }
                }

                if (allShelters.shelters.length > 0) {
                    for (let i = 0; i < 3; i++) {
                        newImagesShelter.push(allShelters.shelters[Math.floor(Math.random() * allShelters.shelters.length)].photo);
                    }
                }
                setShelterImages(newImagesShelter)
                setAnimalImages(newImages);
            }

            const interval = setInterval(() => switchImage(), 30000);

            return () => {
                if (interval) {
                    clearInterval(interval);
                }
            }

        }
        const getAnimalsCount = async () => {
            let store = localStorage.getItem('authToken')
            let id = localStorage.getItem('id')

            const animal = await allAnimalsCount(id, store).then(resolve => resolve.data);
            let amountAnimals = animal.count
            setAmountAnimals(amountAnimals)
        }

        const getSheltersCount = async () => {
            let store = localStorage.getItem('authToken')
            let id = localStorage.getItem('id')

            const shelter = await allShelterCount(id, store).then(resolve => resolve.data);
            let amountShelter = shelter.count
            setAmountShelters(amountShelter)

        }
        getSheltersCount()
        getAnimalsCount()
        getAllAnimals()


    }, [params.id])


    const mouseEnter = () => {
        const image = document.getElementById("image");
        image.style.filter = 'blur(0px)';
    }

    const mouseLeave = () => {
        const image = document.getElementById("image");
        image.style.filter = 'blur(6px)';
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.image}>
                    <img id="image" src={an} className={styles.animals} alt="logo"/>
                </div>

                <h2 className={styles.h2}>
                    <p>{t('home.logoFirst')}</p>
                    <p>{t('home.logoSecond')}</p>
                    {t('home.logoThird')}
                </h2>

                <div className={styles.add}>
                    <button className={styles.btn} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                        <div className={styles.string}><p>{t('home.string')}</p></div>
                    </button>
                </div>

            </div>
            <div className={styles.statistics}>
                <div className={styles.block}>
                    <img src={amountOfAnimals} className={styles.amount} alt="logo"/>
                    <p>
                        {
                            amountAnimals
                        }
                    </p>
                    <p className={styles.p}>
                        {t('home.animals')}
                    </p>
                </div>
                <div className={styles.block}>
                    <img src={amountOfShelters} className={styles.amount} alt="logo"/>
                    <p>
                        {
                            amountShelters
                        }
                    </p>
                    <p className={styles.p}>
                        {t('home.shelters')}
                    </p>
                </div>
                <div className={styles.block}>
                    <img src={year} className={styles.amount} alt="logo"/>
                    <p>2022</p>
                    <p className={styles.p}>
                        {t('home.year')}
                    </p>
                </div>
            </div>
            <hr/>
            <div className={styles.aboutProject}>
                <h2> {t('home.about')}</h2>
                <div className={styles.info}>
                    <img src={logo} className="App-logo5" alt="logo"/>
                    <img src={dog} className={styles.dogImg} alt="logo"/>

                    <div className={styles.infoText}>
                        {t('home.info')}
                    </div>
                </div>
            </div>
            <hr/>
            <div className={styles.ourShelter}>
                <h2>{t('home.animal_shelters')}</h2>
                <div className="d-flex justify-content-evenly">
                    <img src={process.env.REACT_APP_IMAGE_URL + animalImages[0]} alt=""/>
                    <img src={process.env.REACT_APP_IMAGE_URL + shelterImages[0]} alt=""/>
                    <img src={process.env.REACT_APP_IMAGE_URL + animalImages[1]} alt=""/>
                </div>
                <div className="d-flex justify-content-evenly">
                    <img src={process.env.REACT_APP_IMAGE_URL + shelterImages[1]} alt=""/>
                    <img src={process.env.REACT_APP_IMAGE_URL + animalImages[2]} alt=""/>
                    <img src={process.env.REACT_APP_IMAGE_URL + shelterImages[2]} alt=""/>
                </div>
            </div>

            <hr/>

            <div className={styles.contacts}>
                <h2>{t('home.contacts')}</h2>
                <div className={styles.contactsEl}>
                    <div className={styles.el}>
                        <img src={phone} alt="logo"/>
                        <p> {t('home.phone')}</p>
                    </div>
                    <div className={styles.el}>
                        <img src={email}  alt="logo"/>
                        <p>{t('home.email')}</p>
                    </div>
                    <div className={styles.el}>
                        <img src={map}  alt="logo"/>
                        <p> {t('home.address')}</p>
                    </div>
                </div>
                <div className={styles.contactsEl}>
                    <div className={styles.moreInfo}>
                        <p>+380958306692</p>
                    </div>
                    <div className={styles.moreInfo}>
                        <p>shelter.helper@kh.ua</p>
                    </div>
                    <div className={styles.moreInfo}>
                        <p>{t('home.street')}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default UserHome;