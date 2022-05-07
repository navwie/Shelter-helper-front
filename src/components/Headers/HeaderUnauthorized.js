import React from 'react';
import styles from '../../css/Headers/HeaderUnathorized.module.css'
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";


const HeaderUnauthorized = () => {
    return (
        <div className={styles.wrapper}>
            <Navbar bg="#FFE552" expand="lg">
                <Container fluid>
                    <Navbar.Brand className={styles.logo} href="#">ShelterHelper</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                        >
                        </Nav>
                        <Form className="d-flex">
                            <div className={styles.links}>
                                <a href={"/"}>Главная</a>
                                <a href={"/register"}>Регистрация</a>
                                <a href={"/changeUser"}>Изменить профиль</a>
                                <a href={"/profileUser"}>Профиль</a>
                                <a href={"/login"}>Авторизация</a>
                                <a href={"/profileAdmin"}>Профиль(админ)</a>
                                <a href={"/createShelter"}>Створити притулок</a>
                                <a href={"/createAnimal"}>Нова тваринка</a>
                                <a href={"/createAnnouncement"}>Нова об'ява</a>
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

export default HeaderUnauthorized;
