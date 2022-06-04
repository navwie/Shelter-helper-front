import React from 'react';
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2';
import {useEffect} from "react";
import {useState} from "react";
import style from '../../css/Bar.module.css'
import {allAnimal, animals} from "../../api";
import moment from "moment/moment";
import {useTranslation} from "react-i18next";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
require('moment/locale/ru');

const ChartShelterAnimal = () => {
    const [animal, setAnimal] = useState([])
    const {t, i18n} = useTranslation();

    useEffect(() => {
        let shelter = JSON.parse(localStorage.getItem('shelter_id'))[0]
        let auth = localStorage.getItem('authToken')

        const getAllAnimals = async () => {
            const allAnimals = await animals(shelter,auth).then(resolve => resolve.data);
            setAnimal(allAnimals.animals);
        }
        getAllAnimals()
    }, [])

    const options = {
        responsive: true,
        legend: {
            show: false
        }
    };

    const prepareChart = () => {
        let actionsData = animal;
        let monthMoney = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        console.log('123')
        actionsData.forEach(data => {
            if (data.is_archive !== null) {
                console.log(moment(data.is_archive).month())
                monthMoney[moment(data.is_archive).month()] += 1
            }
        })

        return {
            labels: moment.months(),
            datasets: [{
                label: `${t('charts.yourAnimal')}`,
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
                borderWidth: 2
            }]
        };
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => 100),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const bar = {
        width: '80%',
        margin: '0 auto'
    }

    return (
        <div>
            <h2>{t('charts.animalGiven')}</h2>
            <Bar style={bar} data={prepareChart() !== undefined ? prepareChart() : []} options={options}/>
        </div>
    )
}

export default ChartShelterAnimal;