import React, {Component} from 'react';
import styles from '../../css/User/ChangeUser.module.css'
import {useParams} from "react-router-dom";
import {fetchUser, updateUser} from "../../api";

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

        fetchUser(id, store).then(resolve => {
            this.setState({user: resolve.data.data})
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
        }
        updateUser(this.state.id, user, store).then(response => (response));
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
            <div className={styles.wrapper}>
                <h1>Измените данные о себе для изменения </h1>
                <form onSubmit={this.submit} encType="multipart/form-data">
                    <div>
                        <div>
                            <div className="name">
                                <input name='name'
                                       id='name'
                                       type="text"
                                       value={(this.state.user === undefined) ? '' : this.state.user.name}
                                       placeholder="Имя"
                                       onClick={(item) => {
                                           this.handleChanges("name", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("name", item)
                                       }}
                                />
                                <input name='surname'
                                       id='surname'
                                       type="text"
                                       value={(this.state.user === undefined) ? '' : this.state.user.surname}
                                       placeholder=" Фамилия"
                                       onClick={(item) => {
                                           this.handleChanges("surname", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("surname", item)
                                       }}
                                />
                                <input name='email'
                                       id='email'
                                       type="text"
                                       value={(this.state.user === undefined) ? '' : this.state.user.email}
                                       placeholder="Електронная почта"
                                       onClick={(item) => {
                                           this.handleChanges("email", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("email", item)
                                       }}
                                />
                                <input name='phone'
                                       id='phone'
                                       type="text"
                                       value={(this.state.user === undefined) ? '' : this.state.user.phone}
                                       placeholder="Номер телефона"
                                       onClick={(item) => {
                                           this.handleChanges("phone", item)
                                       }}
                                       onChange={(item) => {
                                           this.handleChanges("phone", item)
                                       }}
                                />
                                <input name='password'
                                       id='password'
                                       type="text"
                                       value={this.state.password}
                                       placeholder="Пароль"
                                       onChange={this.changePassword}
                                />
                            </div>

                        </div>
                    </div>
                    <button className={styles.btn}>
                        <a href={`/profile/` + this.state.id}>Изменить</a>
                    </button>
                </form>
            </div>
        )
    }

}

export default withParams(ChangeUser);


