import React, {useEffect, useState} from "react";
import Pagination from "./PaginationAdmin";
import moment from "moment/moment";
import AnimalAdmin from "./AnimalAdmin";
import styles from '../../css/Admin/AllAnimal.module.css'
import {animals} from "../../api";
import check from '../../img/f24563de-1a4f-4c3d-b3b7-d4ae9a32ecab.png'
import refresh from '../../img/9ddf80b4-0f96-4481-a124-d848bbd68638.png'
import {useTranslation} from "react-i18next";


function Home() {
    const [animal, setAnimal] = useState([])
    const [gender,setGender] = useState('')
    const [type,setType] = useState('')
    const [sterilized,setSterilized] = useState('')
    const [animalFiltered, setAnimalFiltered] = useState([]);
    const [currentPageCurrentAnimal, setCurrentPageCurrentAnimal] = useState(1);
    const [animalCurrentForPage] = useState(12)
    const {t, i18n} = useTranslation();


    useEffect(() => {
        const getAnimals = async () => {
            let store = JSON.parse(localStorage.getItem('shelter_id'))[0];
            let auth = localStorage.getItem('authToken');
            let res = await animals(store, auth).then(resolve => resolve.data);

            setAnimal(res.animals)
            setAnimalFiltered(res.animals)
        }
        getAnimals()
    }, [])

    const lastAnimalCurrentIndex = currentPageCurrentAnimal * animalCurrentForPage
    const firstAnimalCurrentIndex = lastAnimalCurrentIndex - animalCurrentForPage
    const currentAnimal = animalFiltered.slice(firstAnimalCurrentIndex, lastAnimalCurrentIndex)

    const paginateCurrent = pageNumber => setCurrentPageCurrentAnimal((pageNumber))
    const nextPageCurrent = () => setCurrentPageCurrentAnimal(prev => prev + 1)
    const prevPageCurrent = () => setCurrentPageCurrentAnimal(prev => prev - 1)


    function resetAnimal() {
        setAnimalFiltered(animal)
    }

    function applyGenderFilter() {
        setAnimalFiltered(animal.filter(element => element.gender === gender));
    }

    function applyTypeFilter() {
        setAnimalFiltered(animal.filter(element => element.type === type));
    }


    function applySterilizedFilter() {
        setAnimalFiltered(animal.filter(element => String(element.sterilized) === sterilized));
    }

    return (
        <div className={styles.containerAnimal}>
            <div className={styles.choiceFilter}>
                <div onChange={(event) => setGender(event.target.value)}>
                    <div className={styles.input}>
                        <label htmlFor="">{t('animals.genderTitle')}</label>
                        <div className={styles.typeB}>
                            <button>
                                <input type="radio" value="Дівчинка" name="format"/>  {t('animals.genderFemale')}
                            </button>
                            <button>
                                <input type="radio" value="Хлопчик" name="format"/> {t('animals.genderMale')}
                            </button>
                        </div>
                    </div>
                    <button className={styles.btnCheck}
                            onClick={applyGenderFilter}><img src={check} alt=""/></button>
                    <button className={styles.btnRefresh}
                            onClick={resetAnimal}><img src={refresh} alt=""/>
                    </button>
                </div>
                <div onChange={(event) => setType(event.target.value)}>
                    <div className={styles.input}>
                        <label htmlFor="">{t('animals.typeAnimal')}</label>
                        <div className={styles.typeB}>
                            <button>
                                <input type="radio" value="Пес" name="format"/> {t('animals.dog')}
                            </button>
                            <button>
                                <input type="radio" value="Кіт" name="format"/> {t('animals.cat')}
                            </button>
                        </div>
                    </div>
                    <button className={styles.btnCheck}
                            onClick={applyTypeFilter}><img src={check} alt=""/></button>
                    <button className={styles.btnRefresh}
                            onClick={resetAnimal}><img src={refresh} alt=""/>
                    </button>
                </div>
                <div onChange={(event) => setSterilized(event.target.value)}>
                    <div className={styles.input}>
                        <label htmlFor="">{t('animals.sterilized')}?</label>
                        <div className={styles.typeB}>
                            <button>
                                <input type="radio" value="true" name="format"/> {t('animals.yes')}
                            </button>
                            <button>
                                <input type="radio" value="false" name="format"/> {t('animals.no')}
                            </button>
                        </div>
                    </div>
                    <button className={styles.btnCheck}
                            onClick={applySterilizedFilter}><img src={check} alt=""/></button>
                    <button className={styles.btnRefresh}
                            onClick={resetAnimal}><img src={refresh} alt=""/>
                    </button>
                </div>
            </div>

            <div className="container-fluid">
                <AnimalAdmin
                    animal={currentAnimal}
                />
                <Pagination
                    currentPage={currentPageCurrentAnimal}
                    prevPage={prevPageCurrent}
                    nextPage={nextPageCurrent}
                    animalForPage={animalCurrentForPage}
                    totalAnimal={animal.length}
                    paginate={paginateCurrent}
                />
            </div>
        </div>
    );
}

export default Home;
