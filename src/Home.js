import React, { useState} from 'react';
import axios from 'axios';
//import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import { Dropdown } from 'semantic-ui-react'
import { Slider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import happy from './icon_images/happy_face.png'
import sad from './icon_images/sad_face.png'
import okay from './icon_images/neutral_face.png'
import tired from './icon_images/tired-emoji.png'




function HomeComponent() {
    const [mood, setMood] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [stress, setStress] = useState(1);
    const [sleep, setSleep] = useState("");
    const marks = [
        {
          value: 1,
          label: 'Not stressed',
        },
        {
          value: 2,
          label: 'Somewhat stressed',
        },
        {
          value: 3,
          label: 'Kind of stressed',
        },
        {
          value: 4,
          label: 'Really stressed',

        },
        {
            value: 5,
            label: 'Extremely stressed',
            
          }]; 

    const sleepOptions = [
      {
        text: '0-3',
        value: '0-3',
      },
      {
        text: '4-6',
        value: '4-6',
      },
      {
        text: '7-9',
        value: '7-9',
      },
      {
        text: '10-12',
        value: '10-12',
      },
      {
        text: '13+',
        value: '13+',
      },
    ]

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

      console.log("mood ", mood);
      console.log("symptoms, ", symptomsCount);
      console.log("stress", stress);
      console.log("sleep ", sleep);

      // axios.post("http://localhost:5000/home", {
      //     'username' : username,
      //     'password' : password
      // })
      // .then(response => response.data)
      // .then(data => {
      //     if(data.success) {
      //           // set the state of the user
      //         //setUser(data)
      //         // store the user in localStorage
      //         //localStorage.setItem('user', data)
      //         console.log("Successful Login: ", data.username);
      //         //history.push("/");
      //     }
      //     else {
      //         alert("Username or password incorrect")
      //     }
      // })
      // .catch(err => {
      //     console.error(err);
      // });


  };


    return (
        <div className="Home">
            <div className="Survey">
                <h1>How are you feeling today?</h1>
                <form onSubmit={sendForm} method='POST'>
                    {/* radio button - mood */}
                    <h3>Mood</h3>
                    <div id="moodItems">
                      <input type="radio" name="moodInput" id="happy" value="happy" onChange={e=>setMood(e.target.value)}/><label htmlFor="happy"><img src={happy} alt="Happy" height="100" width="100"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="sad" value="sad" onChange={e=>setMood(e.target.value)}/><label htmlFor="sad"><img src={sad} alt="Sad" height="100" width="100"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="okay" value="okay" onChange={e=>setMood(e.target.value)}/><label htmlFor="okay"><img src={okay} alt="Okay" height="100" width="100"/></label> &nbsp;
                      <input type="radio" name="moodInput" id="tired" value="tired" onChange={e=>setMood(e.target.value)}/><label htmlFor="tired"><img src={tired} alt="Tired" height="100" width="100"/></label>
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
                    <Slider
                            id="discrete-ticks-slider"
                            label="Discrete with ticks and precision"
                            discrete 
                            max={4}
                            step={null}
                            discreteTicks={0.01}
                            valuePrecision={2}
                            marks={marks}
                            valueLabelDisplay="on"
                            value={stress} 
                            defaultValue={stress}
                            
                            onChange={e=>setStress(e.target.value)}
                          />
                    {/* drop down - sleep */}
                    <h3>Sleep</h3>
                    <Dropdown
                        placeholder='Select Sleep'
                        fluid
                        selection
                        options={sleepOptions}
                        value={sleep} 
                        onChange={e=>setSleep(e.target.value)}
                    />
                    <input type="submit" id="submitFormButton"/>
                    



                </form>
            </div>
            
        </div>
    )
}
             

export default HomeComponent;


