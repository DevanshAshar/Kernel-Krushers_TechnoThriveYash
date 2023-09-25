import React from "react";
import "../index.css"
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function getInitialSelectedOptionsArray()
{
    let initialSelectedOptionsArray = []
    for(let i = 0; i < 10; i++)
    {
        initialSelectedOptionsArray.push({ id: i, selectedOption: null });
    }
    return initialSelectedOptionsArray;
}

export default function QuestionnaireForm()
{
    const [selectedOptionsArray, setSelectedOptionsArray] = React.useState(getInitialSelectedOptionsArray);
    console.log(selectedOptionsArray);
    const navigate=useNavigate()
    const handleOptionChange = (e) => {
        const { name, value } = e.target;
        setSelectedOptionsArray((prevSelectedOptionsArray) => {
            return prevSelectedOptionsArray.map((object) => {
                if(object.id == name)
                {
                    return ({
                        ...object, 
                        selectedOption: value
                    });
                }
                else
                {
                    return ({
                        ...object
                    });
                }
            })
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        // You can perform any action with the selected option here.
        try {
            const optionarray = selectedOptionsArray.map(item => item.selectedOption);
            const answer_array = `[${optionarray.map(option => `'${option}'`).join(',')}]`;
            const res=await axios.post(`${process.env.REACT_APP_API}/user/submitForm/`,{answer_array})
            toast.success('Response submitted')
            navigate('/')
        } catch (error) {
            console.log(error.message)
            toast.error('Something went wrong')
        }

    };

    return (
        <Layout>
            <div className="with-bg-size" style={{position:"fixed", top:"0px", left:"0px", zIndex:"-2", width:"100%", margin:"auto"}}>
                <div id="color-overlay"></div>
            </div>

            <h1 className="form-header">Cognitive Mapping Assessment</h1>

            <form className="questionnaire-form" onSubmit={handleSubmit}>
                <h6 className = "questions">1. How would you describe your overall mood lately?</h6>
                <label>
                    <input className="radio-button" type="radio" name="0" value="Very Happy" checked={selectedOptionsArray[0].selectedOption === "Very Happy"} onChange={handleOptionChange} />
                    A - Very Happy
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="0" value="Generally Content" checked={selectedOptionsArray[0].selectedOption === "Generally Content"} onChange={handleOptionChange} />
                    B - Generally Content
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="0" value="Somewhat Anxious" checked={selectedOptionsArray[0].selectedOption === "Somewhat Anxious"} onChange={handleOptionChange} />
                    C - Somewhat Anxious
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="0" value="Consistently Depressed" checked={selectedOptionsArray[0].selectedOption === "Consistently Depressed"} onChange={handleOptionChange} />
                    D - Consistently Depressed
                </label>
                <br />

                <h6 className = "questions">2. How would you rate your sleep patterns?</h6>
                <label>
                    <input className="radio-button" type="radio" name="1" value="Excellent, I sleep well every night" checked={selectedOptionsArray[1].selectedOption === "Excellent, I sleep well every night"} onChange={handleOptionChange} />
                    A - Excellent, I sleep well every night
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="1" value="Mostly good, but occasional disturbances" checked={selectedOptionsArray[1].selectedOption === "Mostly good, but occasional disturbances"} onChange={handleOptionChange} />
                    B - Mostly good, but occasional disturbances
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="1" value="Frequent trouble falling or staying asleep" checked={selectedOptionsArray[1].selectedOption === "Frequent trouble falling or staying asleep"} onChange={handleOptionChange} />
                    C - Frequent trouble falling or staying asleep
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="1" value="Severe insomnia, I rarely get a good night's sleep" checked={selectedOptionsArray[1].selectedOption === "Severe insomnia, I rarely get a good night's sleep"} onChange={handleOptionChange} />
                    D - Severe insomnia, I rarely get a good night's sleep
                </label>
                <br />

                <h6 className = "questions">3. Have you noticed any changes in your appetite or weight recently?</h6>
                <label>
                    <input className="radio-button" type="radio" name="2" value="No changes" checked={selectedOptionsArray[2].selectedOption === "No changes"} onChange={handleOptionChange} />
                    A - No changes
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="2" value="Slight fluctuations, but nothing major" checked={selectedOptionsArray[2].selectedOption === "Slight fluctuations, but nothing major"} onChange={handleOptionChange} />
                    B - Slight fluctuations, but nothing major
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="2" value="Significant appetite or weight changes" checked={selectedOptionsArray[2].selectedOption === "Significant appetite or weight changes"} onChange={handleOptionChange} />
                    C - Significant appetite or weight changes
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="2" value="Extreme and sudden changes in appetite and weight" checked={selectedOptionsArray[2].selectedOption === "Extreme and sudden changes in appetite and weight"} onChange={handleOptionChange} />
                    D - Extreme and sudden changes in appetite and weight
                </label>
                <br />

                <h6 className = "questions">4. How would you describe your energy levels during the day?</h6>
                <label>
                    <input className="radio-button" type="radio" name="3" value="Full of energy, even more than usual" checked={selectedOptionsArray[3].selectedOption === "Full of energy, even more than usual"} onChange={handleOptionChange} />
                    A - Full of energy, even more than usual
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="3" value="Average energy levels" checked={selectedOptionsArray[3].selectedOption === "Average energy levels"} onChange={handleOptionChange} />
                    B - Average energy levels
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="3" value="Fatigued most of the time" checked={selectedOptionsArray[3].selectedOption === "Fatigued most of the time"} onChange={handleOptionChange} />
                    C - Fatigued most of the time
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="3" value="Overwhelming fatigue and lack of energy" checked={selectedOptionsArray[3].selectedOption === "Overwhelming fatigue and lack of energy"} onChange={handleOptionChange} />
                    D - Overwhelming fatigue and lack of energy
                </label>
                <br />

                <h6 className = "questions">5. Do you find it difficult to concentrate or make decisions?</h6>
                <label>
                    <input className="radio-button" type="radio" name="4" value="No difficulties" checked={selectedOptionsArray[4].selectedOption === "No difficulties"} onChange={handleOptionChange} />
                    A - No difficulties
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="4" value="Occasional difficulties" checked={selectedOptionsArray[4].selectedOption === "Occasional difficulties"} onChange={handleOptionChange} />
                    B - Occasional difficulties
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="4" value="Frequently struggle with concentration and decision-making" checked={selectedOptionsArray[4].selectedOption === "Frequently struggle with concentration and decision-making"} onChange={handleOptionChange} />
                    C - Frequently struggle with concentration and decision-making
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="4" value="Severe impairment in concentration and decision-making" checked={selectedOptionsArray[4].selectedOption === "Severe impairment in concentration and decision-making"} onChange={handleOptionChange} />
                    D - Severe impairment in concentration and decision-making
                </label>
                <br />

                <h6 className = "questions">6. How do you typically react to stress or challenging situations?</h6>
                <label>
                    <input className="radio-button" type="radio" name="5" value="Manage stress effectively" checked={selectedOptionsArray[5].selectedOption === "Manage stress effectively"} onChange={handleOptionChange} />
                    A - Manage stress effectively
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="5" value="Manage stress most of the time" checked={selectedOptionsArray[5].selectedOption === "Manage stress most of the time"} onChange={handleOptionChange} />
                    B - Manage stress most of the time
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="5" value="Often overwhelmed by stress" checked={selectedOptionsArray[5].selectedOption === "Often overwhelmed by stress"} onChange={handleOptionChange} />
                    C - Often overwhelmed by stress
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="5" value="Unable to cope with stress at all" checked={selectedOptionsArray[5].selectedOption === "Unable to cope with stress at all"} onChange={handleOptionChange} />
                    D - Unable to cope with stress at all
                </label>
                <br />

                <h6 className = "questions">7. Are you experiencing any physical symptoms like headaches or stomachaches without a clear medical cause?</h6>
                <label>
                    <input className="radio-button" type="radio" name="6" value="No physical symptoms" checked={selectedOptionsArray[6].selectedOption === "No physical symptoms"} onChange={handleOptionChange} />
                    A - No physical symptoms
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="6" value="Occasional mild physical symptoms" checked={selectedOptionsArray[6].selectedOption === "Occasional mild physical symptoms"} onChange={handleOptionChange} />
                    B - Occasional mild physical symptoms
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="6" value="Frequent moderate physical symptoms" checked={selectedOptionsArray[6].selectedOption === "Frequent moderate physical symptoms"} onChange={handleOptionChange} />
                    C - Frequent moderate physical symptoms
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="6" value="Severe and constant physical symptoms" checked={selectedOptionsArray[6].selectedOption === "Severe and constant physical symptoms"} onChange={handleOptionChange} />
                    D - Severe and constant physical symptoms
                </label>
                <br />

                <h6 className = "questions">8. Do you have a support system, such as friends or family, with whom you can share your feelings and concerns?</h6>
                <label>
                    <input className="radio-button" type="radio" name="7" value="Strong support system" checked={selectedOptionsArray[7].selectedOption === "Strong support system"} onChange={handleOptionChange} />
                    A - Strong support system
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="7" value="Some support, but not consistent" checked={selectedOptionsArray[7].selectedOption === "Some support, but not consistent"} onChange={handleOptionChange} />
                    B - Some support, but not consistent
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="7" value="Limited support, feel isolated at times" checked={selectedOptionsArray[7].selectedOption === "Limited support, feel isolated at times"} onChange={handleOptionChange} />
                    C - Limited support, feel isolated at times
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="7" value="No support system, completely isolated" checked={selectedOptionsArray[7].selectedOption === "No support system, completely isolated"} onChange={handleOptionChange} />
                    D - No support system, completely isolated
                </label>
                <br />

                <h6 className = "questions">9. How often do you engage in activities or hobbies that you used to enjoy?</h6>
                <label>
                    <input className="radio-button" type="radio" name="8" value="Regularly participate in enjoyable activities" checked={selectedOptionsArray[8].selectedOption === "Regularly participate in enjoyable activities"} onChange={handleOptionChange} />
                    A - Regularly participate in enjoyable activities
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="8" value="Occasionally engage in hobbies" checked={selectedOptionsArray[8].selectedOption === "Occasionally engage in hobbies"} onChange={handleOptionChange} />
                    B - Occasionally engage in hobbies
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="8" value="Rarely find joy in activities" checked={selectedOptionsArray[8].selectedOption === "Rarely find joy in activities"} onChange={handleOptionChange} />
                    C - Rarely find joy in activities
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="8" value="Completely lost interest in previously enjoyed activities" checked={selectedOptionsArray[8].selectedOption === "Completely lost interest in previously enjoyed activities"} onChange={handleOptionChange} />
                    D - Completely lost interest in previously enjoyed activities
                </label>
                <br />

                <h6 className = "questions">10. Have you had thoughts of self-harm or suicide?</h6>
                <label>
                    <input className="radio-button" type="radio" name="9" value="No thoughts of self-harm or suicide" checked={selectedOptionsArray[9].selectedOption === "No thoughts of self-harm or suicide"} onChange={handleOptionChange} />
                    A - No thoughts of self-harm or suicide
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="9" value="Occasional fleeting thoughts but no plans" checked={selectedOptionsArray[9].selectedOption === "Occasional fleeting thoughts but no plans"} onChange={handleOptionChange} />
                    B - Occasional fleeting thoughts but no plans
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="9" value="Frequent thoughts with some planning" checked={selectedOptionsArray[9].selectedOption === "Frequent thoughts with some planning"} onChange={handleOptionChange} />
                    C - Frequent thoughts with some planning
                </label>
                <br />
                <label>
                    <input className="radio-button" type="radio" name="9" value="Persistent thoughts with a detailed plan" checked={selectedOptionsArray[9].selectedOption === "Persistent thoughts with a detailed plan"} onChange={handleOptionChange} />
                    D - Persistent thoughts with a detailed plan
                </label>
                <br />


                <button className="form-button" type="submit">Submit</button>
            </form>
        </Layout>
    );
}