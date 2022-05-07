import React, {Component} from 'react';
import styles from '../../css/Admin/CreateShelter.module.css'
import {
    createMovie,
} from "../../api";
import {Link} from "react-router-dom";

export default class CreateAnimal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: "",
            weight: "",
            type: "",
            gender: "",
            photo: null,

        };
        this.submit = this.submit.bind(this);
    }

    submit = event => {
        event.preventDefault();
        let animal = {
            name: this.state.name,
            age: this.state.address,
            weight: this.state.phone,
            photo: this.state.photo,
            type: this.state.type,
            gender: this.state.gender,
        }

        createMovie(animal).then(response => {
            this.setState({response: response.data});
        }).catch(errors => {
            this.setState({valid: errors.response.data.errors});
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
            <div className={styles.wrapper}>
                <h1>Введіть дані про тварину</h1>
                <form onSubmit={this.submit} encType="multipart/form-data">

                    <div className={styles.formElements}>
                        <div className={styles.elementsRight}>
                            <div className="name">
                                <input name='name'
                                       id='name'
                                       type="text"
                                       value={this.state.name}
                                       placeholder="Название притулку"
                                       onClick={(item) => {
                                           this.handleChanges("name", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("name", item)
                                       }}
                                />
                            </div>
                            <div>
                                <input name='age'
                                       type="text"
                                       id='age'
                                       placeholder="Вік"
                                       value={this.state.age}
                                       onClick={(item) => {
                                           this.handleChanges("age", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("age", item)
                                       }}
                                />
                            </div>
                            <div>
                                <input name='weight'
                                       type="number"
                                       id='weight'
                                       placeholder="Вага тварини"
                                       value={this.state.weight}
                                       onClick={(item) => {
                                           this.handleChanges("weight", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("weight", item)
                                       }}/>
                            </div>

                            <div>
                                <input name="photo"
                                       type="file"
                                       placeholder="Фото"
                                       onChange={(e) => this.onChange(e)}
                                />
                            </div>

                            <div onChange={this.setType.bind(this)}>
                                <input type="radio" value="dog" name="type"/> Пес
                                <input type="radio" value="cat" name="type"/> Кіт
                            </div>

                            <div onChange={this.setGender.bind(this)}>
                                <input type="radio" value="male" name="gender"/> Чоловічий
                                <input type="radio" value="female" name="gender"/> Жіночий
                            </div>
                        </div>
                    </div>
                    <button className={styles.button}>
                        <Link to='/adminMovies'>Додати тварину</Link>
                    </button>
                </form>
            </div>

        )
    }

}
