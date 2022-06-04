import React from 'react'
import styles from '../../css/Admin/AllAnimal.module.css'
import moment from "moment/moment";
import {useParams} from "react-router";
import male from '../../img/icons8-мужчина-100.png'
import female from '../../img/icons8-венера-100.png'
import {archiveAnimal} from "../../api";
import {useTranslation} from "react-i18next";

require('moment/locale/ru');

const Animal = ({animal}) => {
    const params = useParams();
    const {t, i18n} = useTranslation();


    function calculateAge(dateString) {
        let nowDate = moment(new Date())
        let animalYear = moment(dateString)
        let monthCount = nowDate.diff(animalYear, 'month')
        if (monthCount < 12) {
            return monthCount + " міс.";
        }
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age + " рік.";
    }

    const submitArchive = (id) => {
        console.log(id)
        let auth = localStorage.getItem('authToken')
        archiveAnimal(id, auth).then(resolve => console.log(resolve))
    }

    return (
        <div className={styles.animal}>
            {
                animal.map((animal) => {
                    return (
                    <div className={styles.animalCard}>
                        <div className={styles.card}>
                            <div className={styles.cardBody}>
                                <div className="image">
                                    <img className={styles.image}
                                         src={process.env.REACT_APP_IMAGE_URL + animal.photo}
                                         alt=""/>
                                </div>

                                <div className={styles.cardInfo}>
                                    <p className={styles.name}>{animal.name}</p>
                                    {
                                        animal.gender === 'Хлопчик'
                                            ? <div className={styles.genderInfo}>
                                                <img src={male} className={styles.gender} alt=""/>
                                                <p>{t('animals.genderMale')}</p>
                                            </div>
                                            : <div className={styles.genderInfo}>
                                                <img src={female} className={styles.gender} alt=""/>
                                                <p>{t('animals.genderFemale')}</p>
                                            </div>
                                    }
                                    <p className={styles.age}>{calculateAge(animal.birthday)}</p>
                                    {
                                        animal.sterilized === false
                                            ? <p className={styles.sterilized}>{t('animals.sterilizedNo')}</p>
                                            : <p className={styles.sterilized}>{t('animals.sterilizedYes')}</p>
                                    }
                                    <p className={styles.description}>{animal.description}</p>
                                    <div className={styles.btnA}>
                                        <a href={"/animalInfoHome/" + animal.id}>{t('animals.more')}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )

                })
            }
        </div>
    )
}
export default Animal
