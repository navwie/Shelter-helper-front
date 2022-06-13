import React, {Component} from 'react';
import styles from '../../css/User/ChangeUser.module.css'
import {useParams} from "react-router-dom";
import {fetchUser, updateUser} from "../../api";
import logo from "../../img/icons8-кошачий-след-100 13.png";
import {Translation} from 'react-i18next';


function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class ChangeUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',

        }
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.params;

        this.setState({id: id})
        let store = localStorage.getItem('authToken')
        let role = localStorage.getItem('role')
        this.setState({authRole: role})

        fetchUser(id, store).then(resolve => {
            this.setState({user: resolve.data[0]})
        });

    }

    submit = event => {
        event.preventDefault();
        let store = localStorage.getItem('authToken')
        let user = {
            name: this.state.user.name,
            surname: this.state.user.surname,
            email: this.state.user.email,
            phone: this.state.user.phone,
            password: this.state.password,
            role: this.state.user.role
        }
        updateUser(this.state.id, user, store)
            .then(response => {
                this.state.authRole === 'true'
                    ? window.location.href = `/profileAdmin/${this.state.id}`
                    : window.location.href = `/profileUser/${this.state.id}`
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
            user: {
                ...prevState.user,
                [fieldString]: value.target.value
            }
        }));
    }

    changePassword = event => {
        let state = this.state;
        state.password = event.target.value
        this.setState(state)
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
                                <h2>{t(`register.edit`)} </h2>
                                <div>
                                    <div className={styles.formData}>
                                        <input name='name'
                                               id='name'
                                               type="text"
                                               className={styles.input}
                                               value={(this.state.user === undefined) ? '' : this.state.user.name}
                                               placeholder={`${t(`register.name`)}`}
                                               onClick={(item) => {
                                                   this.handleChanges("name", item)
                                               }}
                                               onChange={(item) => {
                                                   this.handleChanges("name", item)
                                               }}
                                        />
                                    </div>
                                    <div className={styles.formData}>
                                        <input name='surname'
                                               id='surname'
                                               type="text"
                                               value={(this.state.user === undefined) ? '' : this.state.user.surname}
                                               placeholder={`${t(`register.surname`)}`}
                                               className={styles.input}
                                               onClick={(item) => {
                                                   this.handleChanges("surname", item)
                                               }}
                                               onChange={(item) => {
                                                   this.handleChanges("surname", item)
                                               }}
                                        />
                                    </div>
                                    <div className={styles.formData}>
                                        <input name='email'
                                               id='email'
                                               type="text"
                                               value={(this.state.user === undefined) ? '' : this.state.user.email}
                                               placeholder={`${t(`register.email`)}`}
                                               className={styles.input}
                                               onClick={(item) => {
                                                   this.handleChanges("email", item)
                                               }}
                                               onChange={(item) => {
                                                   this.handleChanges("email", item)
                                               }}
                                        />
                                    </div>
                                    <div className={styles.formData}>
                                        <input name='phone'
                                               id='phone'
                                               type="text"
                                               className={styles.input}
                                               value={(this.state.user === undefined) ? '' : this.state.user.phone}
                                               placeholder={`${t(`register.phone`)}`}
                                               onClick={(item) => {
                                                   this.handleChanges("phone", item)
                                               }}
                                               onChange={(item) => {
                                                   this.handleChanges("phone", item)
                                               }}
                                        />
                                    </div>
                                    <div className={styles.formData}>
                                        <input name='password'
                                               id='password'
                                               type="text"
                                               value={this.state.password}
                                               placeholder={`${t(`register.password`)}`}
                                               onChange={this.changePassword}
                                               className={styles.input}
                                        />
                                    </div>
                                </div>
                                <button className={styles.btn} onClick={this.submit}>
                                    <a>{t(`register.save`)}</a>
                                </button>
                            </form>
                        </div>
                    }
                }
            </Translation>
        )
    }

}

export default withParams(ChangeUser);


