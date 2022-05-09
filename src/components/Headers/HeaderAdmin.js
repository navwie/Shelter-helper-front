import React, {useEffect, useState} from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import styles from '../../css/Headers/HeaderUnathorized.module.css'



const HeaderAdmin = () => {
    const [id, setId] = useState('')
    const exit = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('role')
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenDate");
        window.location.replace('/');
    }

    useEffect(() => {
        let store = localStorage.getItem('id')
        setId(store)
    }, [])

    return (
        <div className={styles.wrapper}>
            <Navbar bg="#FFE552" expand="lg">
                <Container fluid>
                    <Navbar.Brand className={styles.logo} href="#">СinemaWorld</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                        >
                        </Nav>
                        <Form className="d-flex">
                            <div className={styles.links}>
                                <Link to={'/admin/home/' + id}>Главная</Link>
                                <a href={"/changeUser"}>Изменить профиль</a>
                                <a href={"/profileAdmin"}>Профиль(админ)</a>
                                <a href={"/createShelter"}>Створити притулок</a>
                                <a href={"/createAnimal"}>Нова тваринка</a>
                                <a href={"/createAnnouncement"}>Нова об'ява</a>
                                <button  className={styles.exitButton} onClick={exit}>Выход</button>
                            </div>

                            <FormControl
                                type="search"
                                placeholder="Поиск"
                                className={styles.search}
                                aria-label="Найти"
                            />
                            <Button className={styles.searchButton} variant="outline-success">Искать</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default HeaderAdmin;