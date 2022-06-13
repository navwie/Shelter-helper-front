import React, {Component} from 'react';
import styles from '../../css/Admin/CreateAnimal.module.css'
import {
    createAnimal, createShelter, fetchUser,
} from "../../api";
import {Link} from "react-router-dom";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import Swal from "sweetalert2";
import {Translation} from 'react-i18next';


export default class CreateAnimal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: "",
            weight: "",
            type: "",
            gender: "",
            sterilized: '',
            photo: null,
            description: ''

        };
        this.submit = this.submit.bind(this);
    }

    submit = event => {
        event.preventDefault();
        let shelter = JSON.parse(localStorage.getItem('shelter_id'));
        console.log(shelter)

        let animal = {
            name: this.state.name,
            birthday: this.state.age,
            weight: this.state.weight,
            photo: this.state.photo,
            type: this.state.type,
            gender: this.state.gender,
            sterilized: Boolean(this.state.sterilized),
            shelter_id: shelter[0],
            description: this.state.description
        }

        let userId = localStorage.getItem('id')
        console.log(userId)
        this.setState({id: userId})

        let store = localStorage.getItem('authToken')
        createAnimal(animal, store).then(res => Swal.fire({
                title: 'Вітаємо, ви успішно створили тварину!',
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


    handleChanges = (field, value) => {
        let fieldString = `${field}`;
        let input = document.getElementById(fieldString);
        if (value.target.value === "") {
            input.style.border = '3px solid red';
        } else {
            input.style.border = '';
            input.style.borderBottom = '2px solid #000';
        }
        this.setState({[fieldString]: value.target.value})
    }

    setGender(event) {
        this.setState({gender: event.target.value})
    }

    setType(event) {
        this.setState({type: event.target.value})
    }

    setSterilized(event) {
        this.setState({sterilized: event.target.value})
    }

    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader()
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            this.setState({photo: files[0].name + "\\" + e.target.result})
        }
    }

    render() {
        return (
            <Translation>
                {
                    (t, {i18n}) => {
                        return <div className={styles.data}>
                            <div className={styles.wrapper}>
                                <form onSubmit={this.submit} encType="multipart/form-data">
                                    <img src={logo} className="App-logo3" alt="logo"/>
                                    <img src={logo} className="App-logo2" alt="logo"/>
                                    <h2>{t(`create_animal.title`)}</h2>
                                    <div className={styles.formElements}>
                                        <div className={styles.elementsRight}>
                                            <div className="name">
                                                <input name='name'
                                                       id='name'
                                                       type="text"
                                                       className={styles.inputName}
                                                       value={this.state.name}
                                                       placeholder={`${t(`create_animal.name`)}`}
                                                       onClick={(item) => {
                                                           this.handleChanges("name", item)
                                                       }}
                                                       onChange={(item) => {
                                                           this.handleChanges("name", item)
                                                       }}
                                                />
                                            </div>
                                            <div>
                                                <input name='weight'
                                                       type="number"
                                                       id='weight'
                                                       placeholder={`${t(`create_animal.weight`)}`}
                                                       value={this.state.weight}
                                                       className={styles.inputWeight}
                                                       onClick={(item) => {
                                                           this.handleChanges("weight", item)
                                                       }}
                                                       onChange={(item) => {
                                                           this.handleChanges("weight", item)
                                                       }}/>
                                            </div>

                                            <div className={styles.input} onChange={this.setType.bind(this)}>
                                                <p>{t(`create_animal.type.title`)}:</p>
                                                <div className={styles.typeB}>
                                                    <button>
                                                        <input type="radio" value="Пес" name="type"/> {t(`create_animal.type.dog`)}
                                                    </button>
                                                    <button>
                                                        <input type="radio" value="Кіт" name="type"/> {t(`create_animal.type.cat`)}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={styles.gender} onChange={this.setGender.bind(this)}>
                                                <p>{t(`create_animal.gender.title`)}:</p>

                                                <div className={styles.typeB}>
                                                    <button>
                                                        <input type="radio" value="Хлопчик" name="gender"/> {t(`create_animal.gender.male`)}
                                                    </button>
                                                    <button>
                                                        <input type="radio" value="Дівчинка" name="gender"/> {t(`create_animal.gender.female`)}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={styles.input} onChange={this.setSterilized.bind(this)}>
                                                <p>{t(`create_animal.sterilization.title`)}</p>

                                                <div className={styles.typeB}>
                                                    <button>
                                                        <input type="radio" value="false" name="sterilized"/> {t(`create_animal.sterilization.no`)}
                                                    </button>
                                                    <button>
                                                        <input type="radio" value="true" name="sterilized"/> {t(`create_animal.sterilization.yes`)}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <input name='age'
                                                       type="date"
                                                       id='age'
                                                       placeholder={`${t(`create_animal.date_format`)}`}
                                                       value={this.state.age}
                                                       className={styles.inputAge}
                                                       onClick={(item) => {
                                                           this.handleChanges("age", item)
                                                       }}
                                                       onChange={(item) => {
                                                           this.handleChanges("age", item)
                                                       }}
                                                />
                                            </div>

                                            <div className={styles.formD}>
                                                <input name="photo"
                                                       type="file"
                                                       placeholder="Фото"
                                                       className={styles.customFileInput}
                                                       onChange={(e) => this.onChange(e)}
                                                />
                                            </div>
                                            <div className={styles.description}>
                                    <textarea name='description'
                                              id='description'
                                              value={this.state.description}
                                              placeholder={`${t(`create_animal.description`)}`}
                                              onClick={(item) => {
                                                  this.handleChanges("description", item)
                                              }}
                                              onChange={(item) => {
                                                  this.handleChanges("description", item)
                                              }}
                                    />
                                            </div>
                                        </div>
                                    </div>
                                    <button className={styles.btn} onClick={this.submit}>
                                        {t(`create_animal.submit`)}
                                    </button>
                                </form>
                            </div>
                        </div>

                    }
                }
            </Translation>
        )
    }

}
