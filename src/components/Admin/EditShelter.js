import React, {Component} from 'react';
import styles from '../../css/User/ChangeUser.module.css'
import {useParams} from "react-router-dom";
import {fetchShelter, fetchUser, updateShelter, updateUser} from "../../api";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import {Translation} from 'react-i18next';


function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class ChangeShelter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',

        }
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.params;

        console.log(this.props.params)

        this.setState({id: id})
        let store = localStorage.getItem('authToken')
        let userId = localStorage.getItem('id')
        this.setState({userId: userId})

        fetchShelter(id, store).then(resolve => {
            this.setState({shelter: resolve.data[0]})
        });

    }

    submit = event => {
        event.preventDefault();
        let store = localStorage.getItem('authToken')
        let shelter = {
            name: this.state.shelter.name,
            city: this.state.shelter.city,
            address: this.state.shelter.address,
            phone: this.state.shelter.phone,
            email: this.state.shelter.email,

        }
        updateShelter(this.state.id, shelter, store)
            .then(response => {
                window.location.href = `/profileAdmin/${this.state.userId}`
            })
            .catch(e => console.log(e));
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
            shelter: {
                ...prevState.shelter,
                [fieldString]: value.target.value
            }
        }));
    }

    render() {
        return (<Translation>
                {
                    (t, {i18n}) => {
                        return <div className={styles.wrapper}>
                            <form onSubmit={this.submit} encType="multipart/form-data">
                                <img src={logo} className="App-logo" alt="logo"/>
                                <img src={logo} className="App-logo2" alt="logo"/>
                                <h2>{t(`create_shelter.edit`)}</h2>
                                <div>
                                    <div className={styles.formData}>
                                        <input name='name'
                                               id='name'
                                               type="text"
                                               className={styles.input}
                                               value={(this.state.shelter === undefined) ? '' : this.state.shelter.name}
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
                                               id='city'
                                               type="text"
                                               value={(this.state.shelter === undefined) ? '' : this.state.shelter.city}
                                               placeholder={`${t(`create_shelter.city`)}`}
                                               className={styles.input}
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
                                               id='address'
                                               type="text"
                                               value={(this.state.shelter === undefined) ? '' : this.state.shelter.address}
                                               placeholder={`${t(`create_shelter.address`)}`}
                                               className={styles.input}
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
                                               id='phone'
                                               type="text"
                                               className={styles.input}
                                               value={(this.state.shelter === undefined) ? '' : this.state.shelter.phone}
                                               placeholder={`${t(`create_shelter.phone`)}`}
                                               onClick={(item) => {
                                                   this.handleChanges("phone", item)
                                               }}
                                               onChange={(item) => {
                                                   this.handleChanges("phone", item)
                                               }}
                                        />
                                    </div>
                                    <div className={styles.formData}>
                                        <input name='email'
                                               id='email'
                                               type="text"
                                               value={(this.state.shelter === undefined) ? '' : this.state.shelter.email}
                                               placeholder={`${t(`create_shelter.email`)}`}
                                               onClick={(item) => {
                                                   this.handleChanges("email", item)
                                               }}
                                               onChange={(item) => {
                                                   this.handleChanges("email", item)
                                               }}
                                               className={styles.input}
                                        />
                                    </div>
                                </div>
                                <button className={styles.btn} onClick={this.submit}>
                                    <a href={`/profileAdmin/` + this.state.userId}>{t(`create_shelter.save`)}</a>
                                </button>
                            </form>
                        </div>
                    }
                }
            </Translation>
        )
    }

}

export default withParams(ChangeShelter);


