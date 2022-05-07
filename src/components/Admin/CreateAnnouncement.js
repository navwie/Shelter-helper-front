import React, {Component} from 'react';
import styles from '../../css/Admin/CreateShelter.module.css'
import {
    createMovie,
} from "../../api";
import {Link} from "react-router-dom";

export default class CreateAnnouncement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: "",
            needs: ""
        };
        this.submit = this.submit.bind(this);
    }

    submit = event => {
        event.preventDefault();
        let animal = {
            description: this.state.description,
            needs: this.state.needs
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

    setSelect(event) {
        this.setState({gender: event.target.value})
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <h1>Введіть дані про тварину</h1>
                <form onSubmit={this.submit} encType="multipart/form-data">

                    <div className={styles.formElements}>
                        <div className={styles.elementsRight}>
                            <div>
                                <select id="needs" onChange={this.setSelect.bind(this)}>
                                    <option value="food">Їжа</option>
                                    <option value="toys">Іграшки</option>
                                    <option value="dishes">Посуд</option>
                                    <option value="medicines">Медичні препарати</option>
                                </select>
                            </div>
                            <div className="description">
                                <input name='description'
                                       id='description'
                                       type="text"
                                       value={this.state.description}
                                       placeholder="Опис потреби"
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
                    <button className={styles.button}>
                        <Link to='/adminMovies'>Додати об'яву</Link>
                    </button>
                </form>
            </div>

        )
    }

}
