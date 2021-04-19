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




function HomeComponent() {
    const [mood, setMood] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [stress, setStress] = useState({value: 1});
    const [sleep, setSleep] = useState(1);
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
        key: '0-3',
        value: '1',
      },
      {
        text: '4-6',
        key: '4-6',
        value: '2',
      },
      {
        text: '7-9',
        key: '7-9',
        value: '3',
      },
      {
        text: '10-12',
        key: '10-12',
        value: '4',
      },
      {
        text: '13+',
        key: '13+',
        value: '5',
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
      console.log("stress", stress.value);
      console.log("sleep ", sleep);
      let username = localStorage.getItem("user");
      console.log(username + "= username");

      axios.post("http://localhost:5000/home", {
          'mood' : mood,
          'symptomsCount' : symptomsCount,
          'stress' : stress.value,
          'sleep' : sleep,
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

  const handleChange = (e, data ) => {
    setSleep(data.value);
  }


    return (
        <div className="Home">
            <div className="Survey">
                <h1>How are you feeling today?</h1>
                <form onSubmit={sendForm} method='POST'>
                    {/* radio button - mood */}
                    <h3>Mood</h3>
                    <div id="moodItems">
                      <input type="radio" name="moodInput" id="happy" value="happy" required="required" onChange={e=>setMood(e.target.value)}/><label htmlFor="happy"><img src={happy} alt="Happy" height="100" width="100"/></label> &nbsp;
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
                    {/* <Slider
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
                          /> */}

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
             

export default HomeComponent;


