import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Modal, Button } from "antd";
import TextToSpeech from "./TextToSpeech";

const RescueSessions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const sessionData = [
    {
      title: "Understanding why you are feeling lost",
      text: `Text for Session #1: This is the content for the first session.`,
    },
    {
      title: "Another session title",
      text: `Text for Session #2: This is the content for the second session.`,
    },
    {
      title: "Yet another session title",
      text: `Text for Session #3: This is the content for the third session.`,
    },
  ];

  const openModal = (title, text) => {
    setCurrentTitle(title);
    setCurrentText(text);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>Rescue Sessions</h1>

      <div className="card m-2">
        <div className="card-header">{`Session #1`}</div>
        <div className="card-body">
          <h5 className="card-title">Feeling Lost</h5>
          <button
            onClick={() => openModal('Understanding the Problem', `Hi there. In this rescue session, we'll be talking about what causes us to feel lost and how to deal with this feeling.

            If you asked a room full of people: Has anyone ever felt lost? You would find a lot of people's hands up. This is because everyone has felt lost at least once in their lives.
            
            In fact, If the room full of people were to share their thoughts, we might hear a few things that we can relate to. Thoughts like, "I don't know what to do with my life", "I don't know the next steps", "What am I supposed to do without them?", "How do I move on?"
            This is perfectly normal. We've all felt confused, empty or even hopeless. Like we're stuck on what to do next. The truth is, no one really knows all the answers or what the next step is. Sadly, being lost is part of the human condition.
            
            But, don't worry. After this, we'll be going through 2 simple exercises to help clarify your thoughts and overcome your self-doubt.
            `)}
            className="btn btn-primary m-2"
          >
            Phase 1
          </button>
          <button
            onClick={() => openModal('Dealing with the Problem', `When we feel lost, it's important to learn how to clarify our thoughts and overcome self-doubt. Here are 2 exercises we're going to try:

            The first exercise is to clarify your thoughts. Start by, Identifying your triggers. Think back to the event that conflicted you. It could be a relationship that ended or a job opportunity that fell through.
            
            Next, dig deeper. Ask yourself, why does this situation affect you? When the relationship ended, did you feel empty because the constant source of affection was gone? Or, Did the failed job opportunity make you question your own talent because
            you fear what people will say?
            
            When you understand the situation and how it affects you, you can look at the situation in a much clearer light.
            
            The second exercise is to stop your self-doubt. When we feel lost, we often feel helpless and start to question who we are and our own abilities. This self-doubt makes us stuck. Unable to move on.
            
            But, imagine if your loved one was in the same situation. What would you say to them? Would you reaffirm their self-doubt? or would you reassure them of their abilities?
            The second exercise is to stop your self-doubt. When we feel lost, we often feel helpless and start to question who we are and our own abilities. This self-doubt makes us stuck. Unable to move on.
            
            But, imagine if your loved one was in the same situation. What would you say to them? Would you reaffirm their self-doubt? or would you reassure them of their abilities? Which do you think is more helpful?
            
            Once you treat yourselves like a loved one, you become kinder to yourself and the situation you're in. Instead of beating yourself up, encourage and reassure. 
            
            doubt and start to move on.
            `)}
            className="btn btn-primary m-2"
          >
            Phase 2
          </button>
        </div>
      </div>

      <div className="card m-2">
        <div className="card-header">{`Session #2`}</div>
        <div className="card-body">
          <h5 className="card-title">Staying Focused</h5>
          <button
            onClick={() => openModal('Phase1', `Hello there,

            Are you struggling to keep your mind on track? Do you feel overwhelmed by all the things you need to do?
            
            That's completely normal. After all, in our fast-paced world, there are a hundred different things that demand our attention, from our notifications to our never-ending to-do lists.
            
            You might be trying to suppress all your distracting thoughts. However, the more you try to stop thinking about something, the more you will end up thinking about it.
            Instead of trying to avoid your thoughts, you could try to park your distracting thoughts in a "mental parking lot".
            
            Here's how it works:
            
            First, as soon as you catch yourself being distracted, notice all the thoughts that come up.
            
            Next, write down all the distracting thoughts that have been occupying your mind.
            
            Then, allocate a "distraction period" to do nothing but think about these thoughts. Make sure this distraction
            
            `)}
            className="btn btn-primary m-2"
          >
            Phase 1
          </button>
        
        </div>
      </div>

      <div className="card m-2">
        <div className="card-header">{`Session #3`}</div>
        <div className="card-body">
          <h5 className="card-title">Overcoming Anxiety</h5>
          <button
            onClick={() => openModal('Phase1', `Hi there,
            If you're feeling anxious, stressed, and overwhelmed it's okay; it happens to everyone sometimes.
            Today, let's work on reducing your anxiety to feel more in control.
            Anxiety sometimes leads to unhelpful thoughts and actions.
            For example, we might avoid work when a deadline is near or overreact to a misunderstanding.
            We may have thoughts like "I can't finish my work on time, I can't handle it!" or "Why haven't they replied to my message? Are they angry?". However, it's important to try and manage these thoughts and feelings.
            First, identify what's making you anxious: Who or what is making you feel anxious?
            Second, challenge your thoughts and try to reframe the situation in a healthier way. For example, instead of feeling overwhelmed that you have so many tasks to handle at once, remind yourself that you can make progress by taking one step at a time. If it's something a person said or did that made you anxious, try to consider their speech or have so many tasks to handle at once, remind yourself that you can make progress by taking one step at a time. If it's something a person said or did that made you anxious, try to consider their speech or actions from a different point of view as well.
            Finally, manage your anxious feelings and consider how you can reduce them. In the case of a person making you feel anxious, it might be helpful to speak with them to clarify what they meant, or to minimise contact with them.`)}
            className="btn btn-primary m-2"
          >
            Phase 1
          </button>
        </div>
      </div>

      <Modal
        title={currentTitle}
        visible={modalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        <p>{currentText}</p>
        <TextToSpeech text={currentText} />
      </Modal>
    </Layout>
  );
};

export default RescueSessions;
