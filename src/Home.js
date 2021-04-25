import React, { useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Line} from 'react-chartjs-2';


function HomeComponent(){
    let username = localStorage.getItem("user");
    const [redirectForm, setRedirectForm] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [chartData, setChartData] = useState({});
    const [chartState, setChartState] = useState({});
    const [gotData, setGotData] = useState(false);

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
                console.log(chartData[0]["score"]);
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

            console.log("chart", chartData);

            for(let i = 0; i < chartData[0]["score"].length; i++){
                scoreLabels.push(i);
            }

            setChartState({
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
                data={chartState}
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

            <button id="logoutButton" onClick={checkLogout}>Logout</button>
        </div>
    )
}

export default HomeComponent;

