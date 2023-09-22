import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import Layout from "../Layout/Layout";
const TextToSpeech = () => {
  const { speak } = useSpeechSynthesis();
  return (
    <>
      <Layout>
        <h1 style={{ textAlign: "center" }}>Rescue Sessions</h1>
        <div className="card m-2">
          <div className="card-header">Session #1</div>
          <div className="card-body">
            <h5 className="card-title">Understanding why are you feeling lost</h5>
            <button 
            onClick={() => speak({ text: `Identification of problem Hi there. In this rescue session, we'll be talking about what causes us to feel lost and how to deal with this feeling.

            If you asked a room full of people: Has anyone ever felt lost? You would find a lot of people's hands up. This is because everyone has felt lost at least once in their lives.
            
            In fact, If the room full of people were to share their thoughts, we might hear a few things that we can relate to. Thoughts like, "I don't know what to do with my life", "I don't know the next steps", "What am I supposed to do without them?", "How do I move on?"
            This is perfectly normal. We've all felt confused, empty or even hopeless. Like we're stuck on what to do next. The truth is, no one really knows all the answers or what the next step is. Sadly, being lost is part of the human condition.
            
            But, don't worry. After this, we'll be going through 2 simple exercises to help clarify your thoughts and overcome your self-doubt.` })}
            className="btn btn-primary">
              Play
            </button>
          </div>
        </div>
        <div className="card m-2">
          <div className="card-header">Session #2</div>
          <div className="card-body">
            <h5 className="card-title">Dealing with over thinking</h5>
            <button
             onClick={() => speak({text:`When we feel lost, it's important to learn how to clarify our thoughts and overcome self-doubt. Here are 2 exercises we're going to try:

             The first exercise is to clarify your thoughts. Start by, Identifying your triggers. Think back to the event that conflicted you. It could be a relationship that ended or a job opportunity that fell through.
             
             Next, dig deeper. Ask yourself, why does this situation affect you? When the relationship ended, did you feel empty because the constant source of affection was gone? Or, Did the failed job opportunity make you question your own talent because
             you fear what people will say?
             
             When you understand the situation and how it affects you, you can look at the situation in a much clearer light.
             
             The second exercise is to stop your self-doubt. When we feel lost, we often feel helpless and start to question who we are and our own abilities. This self-doubt makes us stuck. Unable to move on.
             
             But, imagine if your loved one was in the same situation. What would you say to them? Would you reaffirm their self-doubt? or would you reassure them of their abilities?
             The second exercise is to stop your self-doubt. When we feel lost, we often feel helpless and start to question who we are and our own abilities. This self-doubt makes us stuck. Unable to move on.
             
             But, imagine if your loved one was in the same situation. What would you say to them? Would you reaffirm their self-doubt? or would you reassure them of their abilities? Which do you think is more helpful?
             
             Once you treat yourselves like a loved one, you become kinder to yourself and the situation you're in. Instead of beating yourself up, encourage and reassure. 
             
             doubt and start to move on.`})}
            className="btn btn-primary">
              Play
            </button>
          </div>
        </div>
        <div className="card m-2">
          <div className="card-header">Session #3</div>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <button 
            onClick={() => speak({text:``})}
            className="btn btn-primary">
              Play
            </button>
          </div>
        </div>
        <div className="card m-2">
          <div className="card-header">Session #4</div>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <button 
            onClick={() => speak({text:``})}
            className="btn btn-primary">
              Play
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TextToSpeech;
