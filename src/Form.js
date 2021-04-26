import React, { useState} from 'react';
import axios from 'axios';
//import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import { Dropdown } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'
import 'semantic-ui-css/semantic.min.css'
import happy from './icon_images/happy_face.png'
import sad from './icon_images/sad_face.png'
import okay from './icon_images/neutral_face.png'
import tired from './icon_images/tired-emoji.png'
import { Redirect } from 'react-router-dom';




function FormComponent() {
    const [mood, setMood] = useState("");
    const [stress, setStress] = useState({value: 1});
    const [sleep, setSleep] = useState(1);

    const sleepOptions = [
      {
        text: '0-3',
        key: '0-3',
        value: '3',
      },
      {
        text: '4-6',
        key: '4-6',
        value: '14',
      },
      {
        text: '7-9',
        key: '7-9',
        value: '25',
      },
      {
        text: '10-12',
        key: '10-12',
        value: '24',
      },
      {
        text: '13+',
        key: '13+',
        value: '15',
      },
    ]

    const [redirect, setRedirect] = useState(false);

    const sendForm = (e) => {
      e.preventDefault();

      console.log(e.target);
      let symptoms = document.getElementsByName("symptoms");
      console.log(symptoms);
      let symptomsLength = symptoms.length;
      console.log(symptomsLength);
      let symptomsCount = 0;
    
      for(let i = 0; i < symptomsLength; i += 1){
          if(symptoms[i].checked){
              console.log(symptoms[i].id);
              symptomsCount += 1;
          }
          console.log(symptoms[i]);
      }

      if(symptomsCount == 5){
        symptomsCount = 0;
      }
      else if(symptomsCount == 4){
        symptomsCount = 2;
      }
      else if(symptomsCount == 3){
        symptomsCount = 11;
      }
      else if(symptomsCount == 2){
        symptomsCount = 16;
      }
      else if(symptomsCount == 1){
        symptomsCount = 19;
      }
      else {
        symptomsCount = 25;
      }

      let stressVal = 0;
      if(stress.value == 5){
        stressVal = 0;
      }
      else if(stress.value == 4){
        stressVal = 6;
      }
      else if(stress.value == 3){
        stressVal = 12;
      }
      else if(stress.value == 2){
        stressVal = 17;
      }
      else {
        stressVal = 25;
      }

      console.log("mood ", mood);
      console.log("symptoms, ", symptomsCount);
      console.log("stress", stressVal);
      console.log("sleep ", sleep);
      let username = localStorage.getItem("user");
      console.log(username + "= username");

      let total = Number(mood) + Number(stressVal) + Number(symptomsCount) + Number(sleep);
      console.log(total);

      axios.post("http://localhost:5000/form", {
          'mood' : Number(mood),
          'symptomsCount' : Number(symptomsCount),
          'stress' : Number(stressVal),
          'sleep' : Number(sleep),
          'score' : Number(total),
          'username' : username
      })
      .then(response => response.data)
      .then(data => {
          if(data.success) {
                // set the state of the user
              //setUser(data)
              // store the user in localStorage
              //localStorage.setItem('user', data)
              console.log("Successful submit: ", data);
              setRedirect(true);
              //history.push("/");
          }
          else {
              alert("Unsuccessful submit")
          }
      })
      .catch(err => {
          console.error(err);
      });

  };

  const redirectToHome = () => {
    if(redirect){
        return <Redirect to='/' />
    }
  }

  const handleChange = (e, data ) => {
    setSleep(data.value);
  }

  const closeForm = () => {
    setRedirect(true);
  }

  let loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    return (
        <div className="Form">
          {redirectToHome()}
          <button id="closeButton" onClick={closeForm}>X</button>
            <div className="Survey">
                <h1>How are you feeling today?</h1>
                <form onSubmit={sendForm} method='POST'>
                    {/* radio button - mood */}
                    <h3>Mood</h3>
                    <div id="moodItems">
                      <input type="radio" name="moodInput" id="happy" value="25" required="required" onChange={e=>setMood(e.target.value)}/><label htmlFor="happy"><img src={happy} alt="Happy" height="100" width="120"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="sad" value="7" onChange={e=>setMood(e.target.value)}/><label htmlFor="sad"><img src={sad} alt="Sad" height="80" width="80"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="okay" value="19" onChange={e=>setMood(e.target.value)}/><label htmlFor="okay"><img src={okay} alt="Okay" height="80" width="80"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="tired" value="9" onChange={e=>setMood(e.target.value)}/><label htmlFor="tired"><img src={tired} alt="Tired" height="100" width="100"/></label>
                    </div>
                    
                    {/* check boxes - symptoms */}
                    <h3>Symptoms</h3>
                    <div id="symptomItems">
                      <input type="checkbox" name="symptoms" id="cough"/><label>Cough</label> &nbsp;
                      <input type="checkbox" name="symptoms" id="fever"/><label>Fever</label> &nbsp;
                      <input type="checkbox" name="symptoms" id="runnyNose"/><label>Runny nose</label> &nbsp;
                      <input type="checkbox" name="symptoms" id="tasteSmell"/><label>No Taste/Smell</label> &nbsp;
                      <input type="checkbox" name="symptoms" id="fatigued"/><label>Fatigue</label>
                    </div>
                    
                    {/* slide bar - stress */}
                    <h3>Stress</h3>

                      <Slider color="red" inverted={false}
                        settings={{
                          start: 1,
                          min: 1,
                          max: 5,
                          step: 1,
                          // marks: marks,
                          onChange: (value) => {
                            setStress({
                              value
                            })
                          }
                        }} />
                    <p>Not stressed ------- Extremely Stressed</p>
                    {/* drop down - sleep */}
                    <h3>Sleep</h3>
                    <Dropdown
                        placeholder='Select Sleep'
                        fluid
                        selection
                        options={sleepOptions}
                        value={sleep} 
                        //onChange= {e=>setSleep(e.target.value)}
                        onChange= {handleChange}
                    />
                    <input type="submit" id="submitFormButton"/>
                    



                </form>
            </div>
            
        </div>
    )
  }
  else{
    // localStorage.clear();
    return(
      <div className="login">
        <header className="App-header">
        
        <Redirect push to="/login"/>

        </header>
      </div>
      
    )
  }
}
             

export default FormComponent;


