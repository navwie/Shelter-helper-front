import React, {useEffect, useState} from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import styles from '../../css/Headers/HeaderUnathorized.module.css'
import {useTranslation} from "react-i18next";


const HeaderUser = () => {
    const [id, setId] = useState('')
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
        setId(store)
    }, [])

    const exitB = {
        position: 'relative',
        top: '-6px'
    }
    const dropA = {
        position: 'relative',
        top: '-8px',
        right: '5px',
    }
    const drop = {
        padding: '20px'
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
                                <Link to={'/user/home/' + id}>{t('user_header.main')}</Link>
                                <a href={"/profileUser/" + id}>{t('user_header.profile')}</a>
                                <div className={styles.droplist}>
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" style={dropA} href="#"
                                           id="navbarDropdown" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            {t('user_header.charts')}
                                        </a>
                                        <ul className="dropdown-menu" id="lang" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" style={drop} href="/chart">{t('unauth_header.chart_animals')}
                                            </a></li>
                                            <li><a className="dropdown-item" style={drop} href="/chartCreateShelter">{t('unauth_header.chart_shelters')}
                                            </a></li>
                                            <li><a className="dropdown-item" style={drop}
                                                   href="/chartCreateAnnouncement">{t('unauth_header.chart_announcement_create')}</a></li>
                                            <li><a className="dropdown-item" style={drop} href="/chartDoneAnnouncement">
                                                {t('unauth_header.chart_announcement_done')}</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <a href={"/allAnimalHome"}>{t('user_header.animals')}</a>
                                <a href={"/allAnnouncement"}>{t('user_header.announcements')}</a>
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
                                <button className={styles.exitButton} style={exitB} onClick={exit}>{t('user_header.logout')}</button>
                            </div>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default HeaderUser;