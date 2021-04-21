import React, { useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


function HomeComponent(){
    let username = localStorage.getItem("user");
    const [redirectForm, setRedirectForm] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);
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

    const getChartData = () => {
        axios.post("http://localhost:5000/get_data", {
            'username' : username
        })
        .then(response => response.data)
        .then(data => {
            if(data.username = username) {
                console.log(data);
            }
            else {
                console.log("error in getting chart data")
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    return(
        <div className="home">
            {redirectToForm()}
            {redirectToLogin()}
            {getChartData()}
            <h1>Welcome {username}!</h1>
            <button id="takeForm" onClick={takeSurvey}>Take Form</button>
            <button id="logoutButton" onClick={checkLogout}>Logout</button>
        </div>
    )
}

export default HomeComponent;

