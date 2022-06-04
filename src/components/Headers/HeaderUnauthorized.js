import React from 'react';
import styles from '../../css/Headers/HeaderUnathorized.module.css'
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {useTranslation} from "react-i18next";


const HeaderUnauthorized = () => {
    const {t, i18n} = useTranslation();

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
                                <a href={"/aboutUs"}>{t('unauth_header.about')}</a>
                                {/*<a href={"/chart"}>Графіки допомоги системи</a>*/}
                                <div className={styles.droplist}>
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" style={dropA} href="#"
                                           id="navbarDropdown" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            {t('unauth_header.charts')}
                                        </a>
                                        <ul className="dropdown-menu" id="lang" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" style={drop}
                                                   href="/chart">{t('unauth_header.chart_animals')}</a></li>
                                            <li><a className="dropdown-item" style={drop}
                                                   href="/chartCreateShelter">{t('unauth_header.chart_shelters')}</a>
                                            </li>
                                            <li><a className="dropdown-item" style={drop}
                                                   href="/chartCreateAnnouncement">{t('unauth_header.chart_announcement_create')}</a>
                                            </li>
                                            <li><a className="dropdown-item" style={drop}
                                                   href="/chartDoneAnnouncement">{t('unauth_header.chart_announcement_done')}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <a href={"/allAnimalHome"}>{t('unauth_header.animals')}</a>
                                <a href={"/allAnnouncement"}>{t('unauth_header.announcements')}</a>
                                <a href={"/login"}>{t('unauth_header.login')}</a>
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
                            </div>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default HeaderUnauthorized;
