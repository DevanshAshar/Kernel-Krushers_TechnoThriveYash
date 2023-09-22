import React from "react";
import "../index.css"

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform any action with the selected option here.
        console.log("Form Submitted!");
    };

    return (
        <>
            <div className="with-bg-size" style={{position:"fixed", top:"0px", left:"0px", zIndex:"-2", width:"100%", margin:"auto"}}>
                <div id="color-overlay"></div>
            </div>

            <h1>Cognitive Mapping Assessment</h1>

            <form onSubmit={handleSubmit}>
                <h6>1. How would you describe your overall mood lately?</h6>
                <label>
                    <input type="radio" name="0" value="Option A" checked={selectedOptionsArray[0].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - Very Happy
                </label>
                <br />
                <label>
                    <input type="radio" name="0" value="Option B" checked={selectedOptionsArray[0].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Generally Content
                </label>
                <br />
                <label>
                    <input type="radio" name="0" value="Option C" checked={selectedOptionsArray[0].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Somewhat Anxious
                </label>
                <br />
                <label>
                    <input type="radio" name="0" value="Option D" checked={selectedOptionsArray[0].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Consistently Depressed
                </label>
                <br />

                <h6>2. How would you rate your sleep patterns?</h6>
                <label>
                    <input type="radio" name="1" value="Option A" checked={selectedOptionsArray[1].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - Excellent, I sleep well every night
                </label>
                <br />
                <label>
                    <input type="radio" name="1" value="Option B" checked={selectedOptionsArray[1].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Mostly good, but occasional disturbances
                </label>
                <br />
                <label>
                    <input type="radio" name="1" value="Option C" checked={selectedOptionsArray[1].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Frequent trouble falling or staying asleep
                </label>
                <br />
                <label>
                    <input type="radio" name="1" value="Option D" checked={selectedOptionsArray[1].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Severe insomnia, I rarely get a good night's sleep
                </label>
                <br />

                <h6>3. Have you noticed any changes in your appetite or weight recently?</h6>
                <label>
                    <input type="radio" name="2" value="Option A" checked={selectedOptionsArray[2].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - No changes
                </label>
                <br />
                <label>
                    <input type="radio" name="2" value="Option B" checked={selectedOptionsArray[2].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Slight fluctuations, but nothing major
                </label>
                <br />
                <label>
                    <input type="radio" name="2" value="Option C" checked={selectedOptionsArray[2].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Significant appetite or weight changes
                </label>
                <br />
                <label>
                    <input type="radio" name="2" value="Option D" checked={selectedOptionsArray[2].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Extreme and sudden changes in appetite and weight
                </label>
                <br />

                <h6>4. How would you describe your energy levels during the day?</h6>
                <label>
                    <input type="radio" name="3" value="Option A" checked={selectedOptionsArray[3].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - Full of energy, even more than usual
                </label>
                <br />
                <label>
                    <input type="radio" name="3" value="Option B" checked={selectedOptionsArray[3].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Average energy levels
                </label>
                <br />
                <label>
                    <input type="radio" name="3" value="Option C" checked={selectedOptionsArray[3].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Fatigued most of the time
                </label>
                <br />
                <label>
                    <input type="radio" name="3" value="Option D" checked={selectedOptionsArray[3].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Overwhelming fatigue and lack of energy
                </label>
                <br />

                <h6>5. Do you find it difficult to concentrate or make decisions?</h6>
                <label>
                    <input type="radio" name="4" value="Option A" checked={selectedOptionsArray[4].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - No difficulties
                </label>
                <br />
                <label>
                    <input type="radio" name="4" value="Option B" checked={selectedOptionsArray[4].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Occasional difficulties
                </label>
                <br />
                <label>
                    <input type="radio" name="4" value="Option C" checked={selectedOptionsArray[4].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Frequently struggle with concentration and decision-making
                </label>
                <br />
                <label>
                    <input type="radio" name="4" value="Option D" checked={selectedOptionsArray[4].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Severe impairment in concentration and decision-making
                </label>
                <br />

                <h6>6. How do you typically react to stress or challenging situations?</h6>
                <label>
                    <input type="radio" name="5" value="Option A" checked={selectedOptionsArray[5].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - Manage stress effectively
                </label>
                <br />
                <label>
                    <input type="radio" name="5" value="Option B" checked={selectedOptionsArray[5].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Manage stress most of the time
                </label>
                <br />
                <label>
                    <input type="radio" name="5" value="Option C" checked={selectedOptionsArray[5].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Often overwhelmed by stress
                </label>
                <br />
                <label>
                    <input type="radio" name="5" value="Option D" checked={selectedOptionsArray[5].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Unable to cope with stress at all
                </label>
                <br />

                <h6>7. Are you experiencing any physical symptoms like headaches or stomachaches without a clear medical cause?</h6>
                <label>
                    <input type="radio" name="6" value="Option A" checked={selectedOptionsArray[6].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - No physical symptoms
                </label>
                <br />
                <label>
                    <input type="radio" name="6" value="Option B" checked={selectedOptionsArray[6].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Occasional mild physical symptoms
                </label>
                <br />
                <label>
                    <input type="radio" name="6" value="Option C" checked={selectedOptionsArray[6].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Frequent moderate physical symptoms
                </label>
                <br />
                <label>
                    <input type="radio" name="6" value="Option D" checked={selectedOptionsArray[6].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Severe and constant physical symptoms
                </label>
                <br />

                <h6>8. Do you have a support system, such as friends or family, with whom you can share your feelings and concerns?</h6>
                <label>
                    <input type="radio" name="7" value="Option A" checked={selectedOptionsArray[7].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - Strong support system
                </label>
                <br />
                <label>
                    <input type="radio" name="7" value="Option B" checked={selectedOptionsArray[7].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Some support, but not consistent
                </label>
                <br />
                <label>
                    <input type="radio" name="7" value="Option C" checked={selectedOptionsArray[7].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Limited support, feel isolated at times
                </label>
                <br />
                <label>
                    <input type="radio" name="7" value="Option D" checked={selectedOptionsArray[7].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - No support system, completely isolated
                </label>
                <br />

                <h6>9. How often do you engage in activities or hobbies that you used to enjoy?</h6>
                <label>
                    <input type="radio" name="8" value="Option A" checked={selectedOptionsArray[8].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - Regularly participate in enjoyable activities
                </label>
                <br />
                <label>
                    <input type="radio" name="8" value="Option B" checked={selectedOptionsArray[8].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Occasionally engage in hobbies
                </label>
                <br />
                <label>
                    <input type="radio" name="8" value="Option C" checked={selectedOptionsArray[8].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Rarely find joy in activities
                </label>
                <br />
                <label>
                    <input type="radio" name="8" value="Option D" checked={selectedOptionsArray[8].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Completely lost interest in previously enjoyed activities
                </label>
                <br />

                <h6>10. Have you had thoughts of self-harm or suicide?</h6>
                <label>
                    <input type="radio" name="9" value="Option A" checked={selectedOptionsArray[9].selectedOption === "Option A"} onChange={handleOptionChange} />
                    A - No thoughts of self-harm or suicide
                </label>
                <br />
                <label>
                    <input type="radio" name="9" value="Option B" checked={selectedOptionsArray[9].selectedOption === "Option B"} onChange={handleOptionChange} />
                    B - Occasional fleeting thoughts but no plans
                </label>
                <br />
                <label>
                    <input type="radio" name="9" value="Option C" checked={selectedOptionsArray[9].selectedOption === "Option C"} onChange={handleOptionChange} />
                    C - Frequent thoughts with some planning
                </label>
                <br />
                <label>
                    <input type="radio" name="9" value="Option D" checked={selectedOptionsArray[9].selectedOption === "Option D"} onChange={handleOptionChange} />
                    D - Persistent thoughts with a detailed plan
                </label>
                <br />


                <button type="submit">Submit</button>
            </form>
        </>
    );
}