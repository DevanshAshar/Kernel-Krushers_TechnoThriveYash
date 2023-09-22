import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Modal, Button } from 'antd';
import TextToSpeech from './TextToSpeech';

const RescueSessions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const sessionData = [
    {
      title: 'Understanding why you are feeling lost',
      text: `Text for Session #1: This is the content for the first session.`,
    },
    {
      title: 'Another session title',
      text: `Text for Session #2: This is the content for the second session.`,
    },
    {
      title: 'Yet another session title',
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
      <h1 style={{ textAlign: 'center' }}>Rescue Sessions</h1>

      {sessionData.map((session, index) => (
        <div className="card m-2" key={index}>
          <div className="card-header">{`Session #${index + 1}`}</div>
          <div className="card-body">
            <h5 className="card-title">{session.title}</h5>
            <button onClick={() => openModal(session.title, session.text)} className="btn btn-primary">
              View
            </button>
          </div>
        </div>
      ))}

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
