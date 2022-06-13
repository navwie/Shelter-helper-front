import React, {Component} from 'react';
import styles from '../../css/Admin/CreateAnimal.module.css'
import {
    fetchAnimal,
    updateAnimal
} from "../../api";
import {Link, useParams} from "react-router-dom";
import update from "../../img/icons8-редактировать-96.png";
import {Translation} from 'react-i18next';


function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class EditAnimal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userId: '',
            age: "",
        }
        this.submit = this.submit.bind(this);
    }


    componentDidMount() {
        const {id} = Number(this.props.params.id);
        let auth = localStorage.getItem('authToken')

        let userId = localStorage.getItem('id')

        this.setState({userId: userId})
        this.setState({id: id})

        fetchAnimal(Number(this.props.params.id), auth).then(resolve => {
            this.setState({animal: resolve.data[0]})
        });
    }

    submit = event => {
        event.preventDefault();
        let shelter = JSON.parse(localStorage.getItem('shelter_id'));
        console.log(shelter)
        console.log(this.state.animal.birthday)
        let store = localStorage.getItem('authToken')
        let animal = {
            name: this.state.animal.name,
            birthday: this.state.age === ''
                ? this.state.animal.birthday
                : this.state.age,
            weight: this.state.animal.weight,
            photo: this.state.animal.photo,
            type: this.state.type,
            gender: this.state.gender,
            sterilized: Boolean(this.state.sterilized),
            shelter_id: shelter[0],
            description: this.state.animal.description
        }
        updateAnimal(Number(this.props.params.id), animal, store).then(
            window.location.replace('/admin/home/' + Number(this.props.params.id))
        );
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
        this.setState(prevState => ({
            animal: {
                ...prevState.animal,
                [fieldString]: value.target.value
            }
        }));
    }

    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader()
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            this.setState({photo: files[0].name + "\\" + e.target.result})
        }
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

    setAge(event) {
        this.setState({age: event.target.value})
    }

    render() {
        return (
            <Translation>
                {
                    (t, {i18n}) => {
                      return  <div>
                            <div className={styles.wrapper}>
                                <form onSubmit={this.submit} encType="multipart/form-data">
                                    <h2>{t('animals.update')}</h2>
                                    <div className={styles.formElements}>
                                        <div className={styles.elementsRight}>
                                            <div className="name">
                                                <input name='name'
                                                       id='name'
                                                       type="text"
                                                       className={styles.inputName}
                                                       value={(this.state.animal === undefined) ? '' : this.state.animal.name}
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
                                                       value={(this.state.animal === undefined) ? '' : this.state.animal.weight}
                                                       className={styles.inputWeight}
                                                       onClick={(item) => {
                                                           this.handleChanges("weight", item)
                                                       }}
                                                       onChange={(item) => {
                                                           this.handleChanges("weight", item)
                                                       }}/>
                                            </div>
                                            <div className={styles.input} onChange={this.setType.bind(this)}>
                                                <p>{t(`create_animal.type.title`)}</p>
                                                <div className={styles.typeB}>
                                                    <button>
                                                        <input type="radio" value="Пес" name="type"/> {t(`create_animal.type.dog`)}
                                                    </button>
                                                    <button>
                                                        <input type="radio" value="Кіт" name="type"/>  {t(`create_animal.type.cat`)}
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
                                                        <input type="radio" value="Дівчинка" name="gender"/>{t(`create_animal.gender.female`)}
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
                                                       value={this.state.age === ''
                                                           ? ((this.state.animal === undefined) ? '' : this.state.animal.birthday)
                                                           : this.state.age}
                                                       className={styles.inputAge}
                                                       onChange={this.setAge.bind(this)}
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
                                              value={(this.state.animal === undefined) ? '' : this.state.animal.description}
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
                                </form>
                            </div>
                            <button className={styles.btnUpdate} onClick={this.submit}>
                                {t('animals.update')}
                            </button>
                        </div>

                    }
                }
            </Translation>
        )
    }

}

export default withParams(EditAnimal);
