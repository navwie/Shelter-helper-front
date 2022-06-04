import React, {Component} from 'react';
import styles from '../../css/Admin/CreateShelter.module.css'
import {
    createShelter,
} from "../../api";
import {Link, useParams} from "react-router-dom";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import {Translation} from 'react-i18next';

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class CreateShelter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            phone: "",
            email: "",
            city: "",
            photo: null,

        };
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.params;
        this.setState({id: id})
    }

    submit = event => {
        event.preventDefault();
        let shelter = {
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email,
            city: this.state.city,
            photo: this.state.photo,
            user_id: this.state.id
        }

        let store = localStorage.getItem('authToken')

        createShelter(shelter, store)
            .then(response => {
                let shelter = [response.data.shelter_id];
                localStorage.setItem('shelter_id', JSON.stringify(shelter));
                window.location.replace(`/admin/home/` + this.state.id);
            })
            .catch(errors => {
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
            <Translation>
                {
                    (t, {i18n}) => {
                        return <div className={styles.wrapper}>
                            <form onSubmit={this.submit} encType="multipart/form-data">
                                <img src={logo} className="App-logo" alt="logo"/>
                                <img src={logo} className="App-logo2" alt="logo"/>
                                <h2>{t('create_shelter.title')}</h2>

                                <div className={styles.formElements}>
                                    <div className={styles.elementsRight}>
                                        <div className={styles.formData}>
                                            <input name='name'
                                                   id='name'
                                                   type="text"
                                                   value={this.state.name}
                                                   className={styles.input}
                                                   placeholder={`${t(`create_shelter.name`)}`}
                                                   onClick={(item) => {
                                                       this.handleChanges("name", item)
                                                   }}
                                                   onChange={(item) => {
                                                       this.handleChanges("name", item)
                                                   }}
                                            />
                                        </div>
                                        <div className={styles.formData}>
                                            <input name='city'
                                                   type="text"
                                                   id='city'
                                                   placeholder={`${t(`create_shelter.city`)}`}
                                                   className={styles.input}
                                                   value={this.state.city}
                                                   onClick={(item) => {
                                                       this.handleChanges("city", item)
                                                   }}
                                                   onChange={(item) => {
                                                       this.handleChanges("city", item)
                                                   }}
                                            />
                                        </div>
                                        <div className={styles.formData}>
                                            <input name='address'
                                                   type="text"
                                                   id='address'
                                                   className={styles.input}
                                                   placeholder={`${t(`create_shelter.address`)}`}
                                                   value={this.state.address}
                                                   onClick={(item) => {
                                                       this.handleChanges("address", item)
                                                   }}
                                                   onChange={(item) => {
                                                       this.handleChanges("address", item)
                                                   }}
                                            />
                                        </div>
                                        <div className={styles.formData}>
                                            <input name='phone'
                                                   type="text"
                                                   id='phone'
                                                   className={styles.input}
                                                   placeholder={`${t(`create_shelter.phone`)}`}
                                                   value={this.state.phone}
                                                   onClick={(item) => {
                                                       this.handleChanges("phone", item)
                                                   }}
                                                   onChange={(item) => {
                                                       this.handleChanges("phone", item)
                                                   }}/>
                                        </div>
                                        <div className={styles.formData}>
                                            <input name='email'
                                                   type="text"
                                                   id='email'
                                                   placeholder={`${t(`create_shelter.email`)}`}
                                                   className={styles.input}
                                                   value={this.state.email}
                                                   onClick={(item) => {
                                                       this.handleChanges("email", item)
                                                   }}
                                                   onChange={(item) => {
                                                       this.handleChanges("email", item)
                                                   }}
                                            />
                                        </div>
                                        <div className={styles.formD}>
                                            <input name="photo"
                                                   type="file"
                                                   placeholder={`${t(`create_shelter.photo`)}`}
                                                   onChange={(e) => this.onChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className={styles.btn} onClick={this.submit}>
                                    <a href=''>{t('create_shelter.submit')}</a>
                                </button>
                            </form>
                        </div>
                    }
                }
            </Translation>

        )
    }
}

export default withParams(CreateShelter);

