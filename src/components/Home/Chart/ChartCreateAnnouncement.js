import React from 'react';
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2';
import {useEffect} from "react";
import {useState} from "react";
import {allAnimal, shelters, fetchAnnouncements} from "../../../api";
import moment from "moment/moment";
import {useTranslation} from "react-i18next";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
require('moment/locale/ru');

const ChartCreateAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([])
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const getAllAnnouncements = async () => {
            const allAnnouncements = await fetchAnnouncements().then(resolve => resolve.data);
            setAnnouncements(allAnnouncements.announcements);
        }
        getAllAnnouncements();
    }, [])

    const options = {
        responsive: true,
        legend: {
            show: false
        }
    };

    const prepareAnnouncementsChart = () => {
        let actionsData = announcements;
        console.log(announcements);
        let monthMoney = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        actionsData.forEach(data => {
            if (new Date(data.created_at).getFullYear() === new Date().getFullYear()) {
                monthMoney[moment(data.created_at).month()] += 1
            }
        })

        return {
            labels: moment.months(),
            datasets: [{
                label: `${t('charts.createAnnouncement')}`,
                data: monthMoney,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(39, 174, 96, 0.5)',
                    'rgba(72, 52, 212, 0.5)',
                    'rgba(253, 121, 168, 0.5)',
                    'rgba(162, 155, 254, 0.5)',
                    'rgba(83, 92, 104, 0.5)',
                    'rgba(186, 220, 88, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(39, 174, 96, 1.0)',
                    'rgba(72, 52, 212, 1.0)',
                    'rgba(253, 121, 168, 1.0)',
                    'rgba(162, 155, 254, 1.0)',
                    'rgba(83, 92, 104, 1.0)',
                    'rgba(186, 220, 88, 1.0)'
                ],
                borderWidth: 2,
                borderRadius: 80

            }]
        };
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const bar = {
        width: '80%',
        backgroundColor: 'white',
        margin: '0 auto',
        padding: '50px',
        borderRadius: '50px'
    }

    const h2 = {
        fontFamily: 'Comfortaa cursive',

    }
    return (
        <div>
            <h2 style={h2}>{t('charts.createAnnouncement')}</h2>
            <Bar style={bar} data={prepareAnnouncementsChart()} options={options}/>
        </div>
    )
}

export default ChartCreateAnnouncement;