import React, {useEffect, useState} from "react";
import styles from '../../css/Admin/AllAnimal.module.css'
import Pagination from "../Admin/PaginationAdmin";
import {fetchAnimal, fetchAnnouncement, fetchAnnouncements, fetchShelter} from "../../api";
import AnnouncementEl from "./AnnouncementEl";

function AllAnnouncement() {
    const [announcement, setAnnouncement] = useState([])
    const [announcementFiltered, setAnnouncementFiltered] = useState([]);
    const [currentPageCurrentAnnouncement, setCurrentPageCurrentAnnouncement] = useState(1);
    const [animalCurrentForPage] = useState(12);

    useEffect(() => {
        const getAnimals = async () => {
            let shelter = JSON.parse(localStorage.getItem('shelter_id'));

            let res = await fetchShelter(shelter[0]).then(resolve => resolve.data);

            setAnnouncement(res[0].announcements)
            setAnnouncementFiltered(res[0].announcements)
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
                <AnnouncementEl
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

export default AllAnnouncement;
