import React, { useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Line, Bar, Pie} from 'react-chartjs-2';


function HomeComponent(){
    let username = localStorage.getItem("user");
    const [redirectForm, setRedirectForm] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [chartData, setChartData] = useState({});
    const [chartScoreState, setScoreChartState] = useState({});
    const [gotData, setGotData] = useState(false);
    const [chartSleepState, setSleepChartState] = useState({});
    const [chartStressState, setStressChartState] = useState({});
    const [chartMoodState, setMoodChartState] = useState({});
    const [chartSymptomsState, setSymptomsChartState] = useState({});

    const takeSurvey = () => {
        console.log("hello");
        setRedirectForm(true);
    }

    const checkLogout = () => {
        console.log("hello");
        setRedirectLogin(true);
    }

    const redirectToForm = () => {
        if(redirectForm){
            return <Redirect to='/form' />
        }
    }

    const redirectToLogin = () => {
        if(redirectLogin){
            localStorage.clear();
            return <Redirect to='/login' />
        }
    }

    //let chartData = {}

    const getChartData = () => {
        console.log("in chart data");
        console.log("getting data");
        axios.post("http://localhost:5000/get_data", {
        'username' : username
        })
        .then(response => response.data)
        .then(data => {
            if(data.username = username) {
                console.log(data);
                setChartData(data);
                //console.log(chartData[0]["score"]); LOOK INTO
                console.log(chartData);
                setGotData(true);
                setChart();
            }
            else {
                console.log("error in getting chart data")
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    const setChart = () => {
        if(chartData != {}){
            let scoreLabels = [];
            let count_1 = 0; //0-3
            let count_2 = 0; //4-6
            let count_3 = 0; //7-9
            let count_4 = 0; //10-12
            let count_5 = 0; //13+

            let happy_count = 0;
            let sad_count = 0;
            let okay_count = 0;
            let tired_count = 0;

            console.log("chart", chartData);

            for(let i = 0; i < chartData[0]["score"].length; i++){
                scoreLabels.push(i);
            }

            for(let i = 0; i < chartData[0]["sleep"].length; i++){
                if(chartData[0]["sleep"][i] == 3){
                    count_1++;
                }
                else if(chartData[0]["sleep"][i] == 14){
                    count_2++;
                }
                else if(chartData[0]["sleep"][i] == 25){
                    count_3++;
                }
                else if(chartData[0]["sleep"][i] == 24){
                    count_4++;
                }
                else{
                    count_5++;
                }
            }

            for(let i = 0; i < chartData[0]["mood"].length; i++){
                if(chartData[0]["mood"][i] == 25){
                    happy_count++;
                }
                else if(chartData[0]["mood"][i] == 7){
                    sad_count++;
                }
                else if(chartData[0]["mood"][i] == 19){
                    okay_count++;
                }
                else{
                    tired_count++;
                }
            }

            let symptomsData = [];
            for(let i = 0; i < chartData[0]["symptoms"].length; i++){
                if(chartData[0]["symptoms"][i] == 25){
                    symptomsData.push(0);
                }
                else if(chartData[0]["symptoms"][i] == 19){
                    symptomsData.push(1);
                }
                else if(chartData[0]["symptoms"][i] == 16){
                    symptomsData.push(2);
                }
                else if(chartData[0]["symptoms"][i] == 11){
                    symptomsData.push(3);
                }
                else if(chartData[0]["symptoms"][i] == 2){
                    symptomsData.push(4);
                }
                else{
                    symptomsData.push(5);
                }
            }

            setScoreChartState({
                labels: scoreLabels,
                datasets: [
                {
                    label: 'Score',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: chartData[0]["score"]
                }
                ]
            })

            setSleepChartState({
                labels: ["0-3", "4-6", "7-9", "10-12", "13+"],
                datasets: [
                {
                    label: 'Sleep (hours)',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [count_1, count_2, count_3, count_4, count_5]
                }
                ]
            })

            setStressChartState({
                labels: scoreLabels,
                datasets: [
                {
                    label: 'Stress',
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: chartData[0]["stress"]
                }
                ]
            })

            setMoodChartState({
                labels: ["Happy", "Sad", "Tired", "Okay"],
                datasets: [
                  {
                    label: 'Rainfall',
                    backgroundColor: [
                      '#B21F00',
                      '#C9DE00',
                      '#2FDE00',
                      '#00A6B4'
                    ],
                    hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350'
                    ],
                    data: [happy_count, sad_count, tired_count, okay_count]
                  }
                ]
            })

            setSymptomsChartState({
                labels: scoreLabels,
                datasets: [
                {
                    label: 'Symptoms',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: symptomsData
                }
                ]
            })
        }
    }

    

    return(
        <div className="home">
            {redirectToForm()}
            {redirectToLogin()}
            {gotData ? console.log("true") : getChartData()}
            <h1>Welcome {username}!</h1>
            <button id="takeForm" onClick={takeSurvey}>Take Form</button>

            <Line
                data={chartScoreState}
                options={{
                    title:{
                    display:true,
                    text:'Score',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />

            <Bar
                data={chartSleepState}
                options={{
                    title:{
                    display:true,
                    text:'Sleep (hours)',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />

            <Line
                data={chartStressState}
                options={{
                    title:{
                    display:true,
                    text:'Stress',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />  

            <Pie
                data={chartMoodState}
                options={{
                    title:{
                    display:true,
                    text:'Mood',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />

            <Bar
                data={chartSymptomsState}
                options={{
                    title:{
                    display:true,
                    text:'Symptoms',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />

            <button id="logoutButton" onClick={checkLogout}>Logout</button>
        </div>
    )
}

export default HomeComponent;

