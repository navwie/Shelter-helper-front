import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import styles from '../../css/Auth/Announcement.module.css'
import {announcementDone, archiveAnimal, fetchAnimal, fetchShelter} from "../../api";
import food from '../../img/food.png'
import dishes from '../../img/dishes.png'
import toys from '../../img/toys.png'
import medicines from '../../img/medicines.png'
import moment from "moment/moment";
import button from "bootstrap/js/src/button";
import {useTranslation} from "react-i18next";

require('moment/locale/ru');

const AnnouncementEl = ({announcement}) => {
    const params = useParams();
    const {t, i18n} = useTranslation();


    const submitAnnouncementDone = (id) => {
        console.log(id)
        let auth = localStorage.getItem('authToken')
        announcementDone(id, auth).then(resolve => window.location.reload())
    }

    const done = {
        backgroundColor : "#B18065",
        width: '190px',
        fontSize: '24px',
        marginTop: "20px",
        borderRadius : '20px',
        color: 'white',
        border: '1px solid #B18065'
    }

    return (
        <div className={styles.announcement}>
            {
                announcement.map((announcement) => {
                    return (
                        <div className={styles.el}>
                            <div className={styles.shelter}>
                                {
                                    announcement.topic === 'dishes' && <p>{t('create_announcement.type.dishes')}</p>
                                    || announcement.topic === "toys" && <p>{t('create_announcement.type.toys')}</p>
                                    || announcement.topic === "food" && <p>{t('create_announcement.type.food')}</p>
                                    || announcement.topic === "medicines" && <p>{t('create_announcement.type.medicines')}</p>
                                }</div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.description')}</strong></p>
                                {announcement.description}
                            </div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.dateAnnouncement')}</strong></p>
                                {moment(announcement.created_at).format('ll')}
                            </div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.status')}</strong></p>
                                <p className={styles.red}>
                                    {announcement.done === null
                                        ?  `${t('announcements.notDone')}`
                                        : `${t('announcements.done')}`
                                    }
                                </p>
                            </div>
                            <div>
                                {
                                    announcement.topic === 'food' && <img src={food} alt=""/>
                                    || announcement.topic === 'dishes' && <img src={dishes} alt=""/>
                                    || announcement.topic === 'toys' && <img src={toys} alt=""/>
                                    || announcement.topic === 'medicines' && <img src={medicines} alt=""/>
                                }
                            </div>

                            {announcement.done === null &&
                                <button style={done} onClick={() => submitAnnouncementDone(announcement.id)}>
                                    {t('announcements.done')}</button>}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default AnnouncementEl
