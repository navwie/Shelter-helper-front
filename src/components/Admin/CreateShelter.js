import React, {Component} from 'react';
import styles from '../../css/Admin/CreateShelter.module.css'
import {
    createMovie,
    fetchFormats,
    fetchGenres,
    fetchHalls,
    fetchLanguages,
} from "../../api";
import {Link} from "react-router-dom";

export default class CreateShelter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            phone: "",
            email: "",

        };
        this.submit = this.submit.bind(this);
    }

    submit = event => {
        event.preventDefault();
        let shelter = {
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email,

        }

        createMovie(shelter).then(response => {
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
                <h1>Введіть дані про притулок</h1>
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
                                <input name='address'
                                       type="text"
                                       id='address'
                                       placeholder="Адреса притулку"
                                       value={this.state.address}
                                       onClick={(item) => {
                                           this.handleChanges("address", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("address", item)
                                       }}
                                />
                            </div>
                            <div>
                                <input name='phone'
                                       type="text"
                                       id='phone'
                                       placeholder="Номер телефону"
                                       value={this.state.phone}
                                       onClick={(item) => {
                                           this.handleChanges("phone", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("phone", item)
                                       }}/>
                            </div>
                            <div>
                                <input name='email'
                                       type="text"
                                       id='email'
                                       placeholder="Email"
                                       value={this.state.email}
                                       onClick={(item) => {
                                           this.handleChanges("email", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("email", item)
                                       }}
                                />
                            </div>
                        </div>
                    </div>
                    <button className={styles.button}>
                        <Link to='/adminMovies'>Створити притулок</Link>
                    </button>
                </form>
            </div>

        )
    }

}
