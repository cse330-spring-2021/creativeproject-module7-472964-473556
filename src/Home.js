import React, { useState} from 'react';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import { Dropdown } from 'semantic-ui-react'



function HomeComponent() {
    const [mood, setMood] = useState("");
    const [password, setSymptoms] = useState("");
    const [stress, setStress] = useState("");
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
              key: '0-3',
              text: '0-3',
              value: '0-3',
            },
            {
              key: '4-6',
              text: '4-6',
              value: '4-6',
            },
            {
              key: '7-9',
              text: '7-9',
              value: '7-9',
            },
            {
              key: '10-12',
              text: '10-12',
              value: '10-12',
            },
            {
              key: '13+',
              text: '13+',
              value: '13+',
            },
          ]


    return (
        <div className="Home">
            <div className="Survey">
                <h1>How are you feeling today?</h1>
                <form>
                    {/* radio button - mood */}
                    <h3>Mood</h3>
                    <input type="radio" name="moodInput" id="happy"/><label htmlFor="happy"><img src="icon_images/happy_face.png" alt="Happy"/></label> &nbsp;
                    <input type="radio" name="moodInput" id="sad"/><label htmlFor="sad"><img src="icon_images/sad_face.png" alt="Sad"/></label> &nbsp;
                    <input type="radio" name="moodInput" id="okay"/><label htmlFor="okay"><img src="icon_images/neutral_face.png" alt="Okay"/></label> &nbsp;
                    <input type="radio" name="moodInput" id="tired"/><label htmlFor="tired"><img src="icon_images/tired-emoji.png" alt="Tired"/></label>
                    {/* check boxes - symptoms */}
                    <h3>Symptoms</h3>
                    <input type="checkbox" name="symptoms" id="cough"/><label>Cough</label> &nbsp;
                    <input type="checkbox" name="symptoms" id="fever"/><label>Fever</label> &nbsp;
                    <input type="checkbox" name="symptoms" id="runnyNose"/><label>Runny nose</label> &nbsp;
                    <input type="checkbox" name="symptoms" id="tasteSmell"/><label>No Taste/Smell</label> &nbsp;
                    <input type="checkbox" name="symptoms" id="fatigued"/><label>Fatigue</label>
                    {/* slide bar - stress */}
                    <h3>Stress</h3>
                    <Slider
                            id="disctete-ticks-slider"
                            label="Discrete with ticks and precision"
                            discrete 
                            max={5}
                            step={1}
                            discreteTicks={0.01}
                            valuePrecision={2}
                            marks={marks}
                            valueLabelDisplay="on"
                          />
                    {/* drop down - sleep */}
                    <h3>Sleep</h3>
                    <Dropdown
                        placeholder='Select Sleep'
                        
                        selection
                        options={sleepOptions}
                    />
                    



                </form>
            </div>
            
        </div>
    )
}
             

export default HomeComponent;


