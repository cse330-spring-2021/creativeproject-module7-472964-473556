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

    const [inspirationalQuotes, setInspirationQuotes] = useState({});
    const [gotQuotes, setQuotes] = useState(false);

    let blues = ["rgb(13, 0, 132)", "rgb(13, 89, 231)", "rgb(13, 195, 255)", "rgb(0, 0, 255)"];
    let greens = ["rgb(60, 179, 113)", "rgb(0, 117, 96)", "rgb(131, 250, 182)", "rgb(0, 80, 0)"];
    let reds = ["rgb(255, 0, 0)", "rgb(151, 0, 0)", "rgb(255, 117, 122)", "rgb(255, 158, 190)"];
    let grays = ["rgb(240, 240, 240)", "rgb(180, 180, 180)", "rgb(120, 120, 120)", "rgb(60, 60, 60)"];
    let purples = ["rgb(106, 90, 205)", "rgb(230, 206, 255)", "rgb(69, 0, 215)", "rgb(175, 102, 255)"];

    const [colorScheme, setColorScheme] = useState(grays);
    

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

    const fetchQuote = () => {
        axios.get("https://type.fit/api/quotes")
        .then((response) => {
            setInspirationQuotes(response.data);
            console.log("fetching quote", inspirationalQuotes);
            
            if(chartData != {} && chartData != null){
                if(chartData[0] && inspirationalQuotes[chartData[0]["score"].length]){
                    let quote = inspirationalQuotes[chartData[0]["score"].length]["text"];
                    let author = inspirationalQuotes[chartData[0]["score"].length]["author"];
                    console.log(quote);
                    document.getElementById("inspirationalQuote").innerHTML = quote;
                    document.getElementById("inspirationalAuthor").innerHTML = "-" + author;
                    console.log("author",author);
                    setQuotes(true);
                }
                
            }
            else{
                console.log("chart data not defined");
            }

        });
        
    }


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
            console.log("color scheme", colorScheme);

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
                    backgroundColor: colorScheme[0],
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
                    backgroundColor: `${colorScheme[1]}`,
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
                    backgroundColor: `${colorScheme[2]}`,
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
                    backgroundColor: colorScheme,
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
                    backgroundColor: `${colorScheme[3]}`,
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: symptomsData
                }
                ]
            })
        }
    }

    const setColor = (e) => {
        //e.preventDefault();
        console.log(e);
        setColorScheme(e);
        console.log(colorScheme);
        setChart();

        console.log(colorScheme[2].toString());
    }

    

    return(
        <div className="home">
            {redirectToForm()}
            {redirectToLogin()}
            {gotData ? console.log("true") : getChartData()}
            {gotQuotes ? console.log("true") : fetchQuote()}
            <h1>Welcome {username}!</h1>
            <h2>Inspirational Quote of the Day</h2>
            <p id="inspirationalQuote"></p>
            <p id="inspirationalAuthor"></p>
            <button id="takeForm" onClick={takeSurvey}>Take Form</button>

            {/* <input type="radio" name="colorButtons" value="blue"/>
            <input type="radio" name="colorButtons" value="red"/>
            <input type="radio" name="colorButtons" value="green"/>
            <input type="radio" name="colorButtons" value="purple"/>
            <input type="radio" name="colorButtons" value="gray" onclick={}/> */}
            <button id="blueGraph" height="100" width="100" value={[blues]} onClick={e=>setColor(blues)}>Blue</button>
            <button id="redGraph" height="100" width="100" value={[reds]} onClick={e=>setColor(reds)}>Red</button>
            <button id="greenGraph" height="100" width="100" value={[greens]} onClick={e=>setColor(greens)}>Green</button>
            <button id="purpleGraph" height="100" width="100" value={purples} onClick={e=>setColor(purples)}>Purple</button>
            <button id="grayScoreGraph" height="100" width="100" value={[grays]} onClick={e=>setColor(grays)}>Gray</button>

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
            <input type="text" id="dailyHighlight"/>
            <button id="submitHighlight">Enter</button>
            <div id="highlights" height="400" width="400"></div>
            <button id="logoutButton" onClick={checkLogout}>Logout</button>
        </div>
    )
}

export default HomeComponent;

