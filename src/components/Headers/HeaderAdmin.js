import React, {useEffect, useState} from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import styles from '../../css/Headers/HeaderUnathorized.module.css'
import {useTranslation} from "react-i18next";


const HeaderAdmin = () => {
    const [id, setId] = useState('')
    const [shelter, setShelter] = useState('')
    const {t, i18n} = useTranslation();


    const exit = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('role')
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenDate");
        window.location.replace('/');
    }

    useEffect(() => {
        let store = localStorage.getItem('id')
        let shelter = localStorage.getItem('shelter_id')
        setShelter(shelter[0])
        setId(store)
    }, [])

    const dropA = {
        position: 'relative',
        top: '-8px',
        right: '5px',
    }
    const drop = {
        padding: '20px',
        zIndex:'40'
    }

    function setLocale(locale, event) {
        event.preventDefault();
        i18n.changeLanguage(locale).then(
            localStorage.setItem('locale', locale)
        );
    }

    return (
        <div className={styles.wrapper}>
            <Navbar bg="#FFE552" expand="lg">
                <Container fluid>
                    <nav className={styles.logo} href="#">ShelterHelper</nav>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                        >
                        </Nav>
                        <Form className="d-flex">
                            <div className={styles.links}>
                                <Link to={'/admin/home/' + id}>{t('admin_header.main')}</Link>
                                <div className={styles.droplist}>
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" style={dropA}  href="#" id="navbarDropdown" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            {t('admin_header.create')}
                                        </a>
                                        <ul className="dropdown-menu" id = "lang" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" style={drop}  href={"/createShelter/" + id}>{t('admin_header.createShelter')}</a></li>
                                            <li> {
                                                JSON.parse(localStorage.getItem('shelter_id')).length > 0
                                                    ? <a className="dropdown-item" style={drop} href={"/createAnimal/" + id}>{t('admin_header.createAnimal')}</a>
                                                    : ''
                                            }</li>
                                            <li> {
                                                JSON.parse(localStorage.getItem('shelter_id')).length > 0
                                                    ? <a className="dropdown-item" style={drop} href={"/createAnnouncement"}>{t('admin_header.createAnnouncements')}</a>
                                                    : ''
                                            }</li>
                                        </ul>
                                    </div>
                                </div>
                                <Link to={'/admin/home/chart/' + id}>{t('admin_header.reports')}</Link>
                                <Link to={'/admin/home/announcement'}>{t('admin_header.announcements')}</Link>
                                <a href={"/profileAdmin/" + id}>{t('admin_header.profile')}</a>
                                <div className={styles.droplist}>
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" style={dropA} href="#"
                                           id="navbarDropdown" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            {
                                                localStorage.getItem('locale') === 'uk'
                                                    ? 'UA'
                                                    : "EN"
                                            }
                                        </a>
                                        <ul className="dropdown-menu" id="lang" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item"
                                                   onClick={event => setLocale('uk', event)}>Ua</a></li>
                                            <li><a className="dropdown-item"
                                                   onClick={event => setLocale('en', event)}>En</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <button className={styles.exitButton} onClick={exit}>{t('admin_header.logout')}</button>
                            </div>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default HeaderAdmin;