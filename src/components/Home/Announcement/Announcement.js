import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import styles from '../../../css/Auth/Announcement.module.css'
import {fetchAnimal, fetchShelter} from "../../../api";
import food from '../../../img/food.png'
import dishes from '../../../img/dishes.png'
import toys from '../../../img/toys.png'
import medicines from '../../../img/medicines.png'
import moment from "moment/moment";
import {useTranslation} from "react-i18next";

require('moment/locale/ru');

const Announcement = ({announcement}) => {
    const params = useParams();
    const {t, i18n} = useTranslation();


    return (
        <div className={styles.announcement}>
            {
                announcement.map((announcement) => {
                    return (
                        <div className={styles.el}>
                            <div className={styles.shelter}>{announcement.shelters.name}</div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.needs')}</strong></p>
                                {
                                    announcement.topic === 'dishes' && <p>{t('create_announcement.type.dishes')}</p>
                                    || announcement.topic === "toys" && <p>{t('create_announcement.type.toys')}</p>
                                    || announcement.topic === "food" && <p>{t('create_announcement.type.food')}</p>
                                    || announcement.topic === "medicines" &&
                                    <p>{t('create_announcement.type.medicines')}</p>
                                }
                            </div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.description')}</strong></p>
                                {announcement.description}
                            </div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.place')}:</strong></p>
                                {announcement.shelters.city}
                            </div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.address')}:</strong></p>
                                {announcement.shelters.address}
                            </div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.phone')} :</strong></p>
                                {announcement.shelters.phone}
                            </div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.dateAnnouncement')}</strong></p>
                                {moment(announcement.shelters.created_at).format('ll')}
                            </div>
                            <div className={styles.info}>
                                <p><strong>{t('announcements.status')}</strong></p>
                                <p className={styles.red}>
                                    {announcement.done === null
                                        ? `${t('announcements.notDone')}`
                                        : `${t('announcements.done')}`
                                    }
                                </p>
                            </div>
                            <div className={styles.img}>
                                {
                                    announcement.topic === 'food' && <img src={food} alt=""/>
                                    || announcement.topic === 'dishes' && <img src={dishes} alt=""/>
                                    || announcement.topic === 'toys' && <img src={toys} alt=""/>
                                    || announcement.topic === 'medicines' && <img src={medicines} alt=""/>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Announcement
