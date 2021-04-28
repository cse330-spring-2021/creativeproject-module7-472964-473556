import React, { useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Line, Bar, Pie} from 'react-chartjs-2';
//import { useStateWithCallbackLazy } from 'use-state-with-callback';


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

                    let score = document.getElementById("scoreLabel");
                    score.innerHTML = chartData[0]["score"][chartData[0]["score"].length - 1] + "&#37;";
                    let mood = document.getElementById("moodResults");
                    let moodScore = chartData[0]["mood"][chartData[0]["score"].length - 1];
                    if(moodScore == 25){
                        mood.innerHTML = "You were happy: spread the joy!";
                    }
                    else if(moodScore == 7){
                        mood.innerHTML = "You were sad: don't be sad because sad backwards is das, and das not good!";
                    }
                    else if(moodScore == 19){
                        mood.innerHTML = "You were okay: a smile can make your day brighter!";
                    }
                    else{
                        mood.innerHTML = "You were tired: take a nap and catch up on some sleep!";
                    }


                    let symptoms = document.getElementById("symptomsResults");
                    let symptomsScore = chartData[0]["mood"][chartData[0]["score"].length - 1];
                    if(symptomsScore == 25){
                        symptoms.innerHTML = "You had no symptoms: get some exercise if you're feeling up to it";
                    }
                    else if(symptomsScore == 19){
                        symptoms.innerHTML = "You had one symptom: wash your hands and mask up!";
                    }
                    else if(symptomsScore == 16){
                        symptoms.innerHTML = "You had two symptoms: make sure to hydrate!";
                    }
                    else if(symptomsScore == 11){
                        symptoms.innerHTML = "You had three symptoms: stay in bed and have some soup!";
                    }
                    else if(symptomsScore == 2){
                        symptoms.innerHTML = "You had one symptom: have you tried DayQuil?";
                    }
                    else{
                        symptoms.innerHTML = "You had five symptoms: maybe it is time to see a doctor";
                    }


                    let stress = document.getElementById("stressResults");
                    let stressScore = chartData[0]["mood"][chartData[0]["score"].length - 1];
                    if(stressScore == 25){
                        stress.innerHTML = "You weren't stressed: keep up the good work!";
                    }
                    else if(stressScore == 17){
                        stress.innerHTML = "You were a little stressed: take time out of your day to take care of YOU";
                    }
                    else if(stressScore == 12){
                        stress.innerHTML = "You were moderately stressed: try taking three deep breaths";
                    }
                    else if(stressScore == 6){
                        stress.innerHTML = "You were very stressed: treat yourself!";
                    }
                    else{
                        stress.innerHTML = "You were extremely stressed: maybe you should talk to someone about how you are feeling";
                    }


                    let sleep = document.getElementById("sleepResults");
                    let sleepScore = chartData[0]["mood"][chartData[0]["score"].length - 1];
                    if(sleepScore == 25){
                        sleep.innerHTML = "You got 7-9 hours of sleep: way to go!";
                    }
                    else if(sleepScore == 24){
                        sleep.innerHTML = "You got 10-12 hours of sleep: you should be ready to take on the day!";
                    }
                    else if(sleepScore == 15){
                        sleep.innerHTML = "You got 13+ hours of sleep: too much is never enough";
                    }
                    else if(sleepScore == 14){
                        sleep.innerHTML = "You got 4-6 hours of sleep: try going to bed earlier tonight";
                    }
                    else{
                        sleep.innerHTML = "You got 0-3 hours of sleep: make sleep your priority";
                    }

                    document.getElementById("inspirationalQuote").innerHTML = quote;
                    document.getElementById("inspirationalAuthor").innerHTML = "-" + author;
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
                if(chartData[0]["score"].length == 0){
                    document.getElementById("userData").style.display = "none";
                }
                else{
                    document.getElementById("userData").style.display = "block";
                }
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

        // // if(colorScheme == e){
        // //     setChart();
        // // }
        // console.log(colorScheme);

        // // setColor2();
        setChart();


        // setColorScheme(e, () => {
        //     setChart();
        //  });

        // setColorScheme({
        //     e
        //   },() => { setChart() })

        //console.log(colorScheme[2].toString());
    }

    // const setColor2 = useCallback(() => {
    //     // validate based on the CURRENT value of 'memberId'
    //     // this function gets updated whenever memberId is updated,
    //     // so we know it will be the most recent id you just set
    //     console.log("setting again");
    //     setChart();
    // }, [colorScheme]);
    

    return(
        <div className="home">
            {redirectToForm()}
            {redirectToLogin()}
            {gotData ? console.log("true") : getChartData()}
            {gotQuotes ? console.log("true") : fetchQuote()}
            <h1>Welcome {username}!</h1>
            <div id="inspiration">
                <h2>Inspirational Quote of the Day</h2>
                <p id="inspirationalQuote">Quote</p>
                <p id="inspirationalAuthor">Author</p>
            </div>
            <label>Complete daily COVID-19 and mood form: </label><button id="takeForm" onClick={takeSurvey}> &#8594;</button>
            <div id="userData">
                <p>Results from your last survey:</p>
                <label>Score: </label>
                <label id="scoreLabel">the actual percent</label>
                <p><strong>Your ~mental~ breakdown:</strong></p>
                <ul id="formResults">
                    <li id="moodResults">Mood</li>
                    <li id="symptomsResults">Symptoms</li>
                    <li id="stressResults">Stress</li>
                    <li id="sleepResults">Sleep</li>
                </ul>
                <div id="colorButtons">
                    <button id="blueGraph" height="100" width="100" value={[blues]} onClick={e=>setColor(blues)}></button>
                    <button id="redGraph" height="100" width="100" value={[reds]} onClick={e=>setColor(reds)}></button>
                    <button id="greenGraph" height="100" width="100" value={[greens]} onClick={e=>setColor(greens)}></button>
                    <button id="purpleGraph" height="100" width="100" value={purples} onClick={e=>setColor(purples)}></button>
                    <button id="grayGraph" height="100" width="100" value={[grays]} onClick={e=>setColor(grays)}></button>
                </div>


                <div className="scoreGraph">
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
                        width={50}
                        height={25}
                    />
                </div>
                <div className="graphs">
                    <div className="row">
                        <div class="column">
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
                        </div>
                        <div class="column">
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
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
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
                        </div>
                        <div class="column">
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
                        </div>
                    </div>
                </div>
            </div>
 
            <br></br>
            <button id="logoutButton" onClick={checkLogout}>Logout</button>
        </div>
    )
}

export default HomeComponent;

