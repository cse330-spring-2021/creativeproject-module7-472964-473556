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
    /* sets states for global use */
    const [mood, setMood] = useState("");
    const [stress, setStress] = useState({value: 1});
    const [sleep, setSleep] = useState(1);
    const [redirect, setRedirect] = useState(false);

    /* set dropdown options */
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

    
    /* sends survey data to server */
    const sendForm = (e) => {
      e.preventDefault();

      let symptoms = document.getElementsByName("symptoms");
      let symptomsLength = symptoms.length;
      let symptomsCount = 0;
    
      for(let i = 0; i < symptomsLength; i += 1){
          if(symptoms[i].checked){
              symptomsCount += 1;
          }
      }
      /* encodes survey results to plot and calculate score */
      
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

      let username = localStorage.getItem("user");

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
              setRedirect(true);
          }
          else {
              alert("Unsuccessful submit")
          }
      })
      .catch(err => {
          console.error(err);
      });

  };

/* redirect to home */
  const redirectToHome = () => {
    if(redirect){
        return <Redirect to='/' />
    }
  }

  /* handles dropdown */
  const handleChange = (e, data ) => {
    setSleep(data.value);
  }

  /* closes the survey */ 
  const closeForm = () => {
    setRedirect(true);
  }

  /* checks if user is logged in and displays their data */
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
                      <input type="radio" name="moodInput" id="happy" value="25" required="required" onChange={e=>setMood(e.target.value)}/><label htmlFor="happy"><img src={happy} alt="Happy" height="95" width="115"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="sad" value="7" onChange={e=>setMood(e.target.value)}/><label htmlFor="sad"><img src={sad} id="sadImage" alt="Sad" height="80" width="80"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="okay" value="19" onChange={e=>setMood(e.target.value)}/><label htmlFor="okay"><img src={okay} id="okayImage" alt="Okay" height="80" width="80"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="tired" value="9" onChange={e=>setMood(e.target.value)}/><label htmlFor="tired"><img src={tired} alt="Tired" height="105" width="105"/></label>
                    </div>
                    
                    {/* check boxes - symptoms */}
                    <h3>Symptoms</h3>
                    <div id="symptomItems">
                      <input type="checkbox" name="symptoms" id="cough"/><label>Cough</label> &nbsp;
                      <input type="checkbox" name="symptoms" id="fever"/><label>Fever</label> &nbsp;
                      <input type="checkbox" name="symptoms" id="runnyNose"/><label>Runny Nose</label> &nbsp;
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
                          onChange: (value) => {
                            setStress({
                              value
                            })
                          }
                        }} />
                    <label class="stress">Low</label><label class="stress" id="moderateStress">Moderate</label><label class="stress">Severe</label>
                    {/* drop down - sleep */}
                    <h3>Sleep</h3>
                    <Dropdown
                        placeholder='Select Sleep'
                        fluid
                        selection
                        options={sleepOptions}
                        value={sleep} 
                        onChange= {handleChange}
                    />
                    <div id="submitButton">
                    <input type="submit" id="submitFormButton"/>
                    </div>
                
                </form>
            </div>
            
        </div>
    )
  }
  else{
 
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


