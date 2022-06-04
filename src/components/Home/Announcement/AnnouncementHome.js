import React, {useEffect, useState} from "react";
import styles from '../../../css/Admin/AllAnimal.module.css'
import Announcement from "./Announcement";
import Pagination from "../../Admin/PaginationAdmin";
import {fetchAnimal, fetchAnnouncements} from "../../../api";

function AnnouncementHome() {
    const [announcement, setAnnouncement] = useState([])
    const [announcementFiltered, setAnnouncementFiltered] = useState([]);
    const [currentPageCurrentAnnouncement, setCurrentPageCurrentAnnouncement] = useState(1);
    const [animalCurrentForPage] = useState(12);

    useEffect(() => {
        const getAnimals = async () => {
            let res = await fetchAnnouncements().then(resolve => resolve.data);
            console.log(res.announcements)
            setAnnouncement(res.announcements)
            setAnnouncementFiltered(res.announcements)
        }
        getAnimals()
    }, [])

    const lastAnnouncementCurrentIndex = currentPageCurrentAnnouncement * animalCurrentForPage
    const firstAnnouncementCurrentIndex = lastAnnouncementCurrentIndex - animalCurrentForPage
    const currentAnnouncement = announcementFiltered.slice(firstAnnouncementCurrentIndex, lastAnnouncementCurrentIndex)

    const paginateCurrent = pageNumber => setCurrentPageCurrentAnnouncement((pageNumber))
    const nextPageCurrent = () => setCurrentPageCurrentAnnouncement(prev => prev + 1)
    const prevPageCurrent = () => setCurrentPageCurrentAnnouncement(prev => prev - 1)


    return (
        <div className={styles.containerAnimal}>
            <div className="container-fluid">
                <Announcement
                    announcement={currentAnnouncement}
                />
                <Pagination
                    currentPage={currentPageCurrentAnnouncement}
                    prevPage={prevPageCurrent}
                    nextPage={nextPageCurrent}
                    animalForPage={animalCurrentForPage}
                    totalAnimal={announcement.length}
                    paginate={paginateCurrent}
                />
            </div>
        </div>
    );
}

export default AnnouncementHome;
