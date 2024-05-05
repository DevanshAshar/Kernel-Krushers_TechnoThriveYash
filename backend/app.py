from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Embedding, LSTM, LayerNormalization, Dense, Dropout
from tensorflow.keras.utils import plot_model

from flask import Flask, request, jsonify,render_template,Response
import json
import numpy as np
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
import re
import random
import cv2
import dlib
import numpy as np
import h5py
app = Flask(__name__)
@app.route('/',methods=['GET'])
def hello():
    return 'hello'
@app.route('/chatbot', methods=['POST'])
def chatbot():
    with open('./intents.json') as f:
        data = json.load(f)

    df = pd.DataFrame(data['intents'])

    # Prepare data for training
    dic = {"tag":[], "patterns":[], "responses":[]}
    for i in range(len(df)):
        ptrns = df[df.index == i]['patterns'].values[0]
        rspns = df[df.index == i]['responses'].values[0]
        tag = df[df.index == i]['tag'].values[0]
        for j in range(len(ptrns)):
            dic['tag'].append(tag)
            dic['patterns'].append(ptrns[j])
            dic['responses'].append(rspns)

    df = pd.DataFrame.from_dict(dic)

    # Tokenization
    tokenizer = Tokenizer(lower=True, split=' ')
    tokenizer.fit_on_texts(df['patterns'])
    vacab_size = len(tokenizer.word_index)
    ptrn2seq = tokenizer.texts_to_sequences(df['patterns'])
    X = pad_sequences(ptrn2seq, padding='post')

    lbl_enc = LabelEncoder()
    y = lbl_enc.fit_transform(df['tag'])
    # Load the model
    load = load_model('./chatbot (3).h5')
    # model = Sequential()
    # model.add(Input(shape=(X.shape[1])))
    # model.add(Embedding(input_dim=vacab_size+1, output_dim=100, mask_zero=True))
    # model.add(LSTM(32, return_sequences=True))
    # model.add(LayerNormalization())
    # model.add(LSTM(32, return_sequences=True))
    # model.add(LayerNormalization())
    # model.add(LSTM(32))
    # model.add(LayerNormalization())
    # model.add(Dense(128, activation="relu"))
    # model.add(LayerNormalization())
    # model.add(Dense(64, activation="relu"))
    # model.add(LayerNormalization())
    # model.add(Dropout(0.2))
    # model.add(Dense(128, activation="relu"))
    # model.add(LayerNormalization())
    # model.add(Dropout(0.2))
    # model.add(Dense(len(np.unique(y)), activation="softmax"))

    data = request.get_json()
    query = data['query']
    print(query)
    # Preprocess the query
    text = []
    txt = re.sub('[^a-zA-Z\']', ' ', query)
    txt = txt.lower()
    txt = txt.split()
    txt = " ".join(txt)
    text.append(txt)

    # Tokenize and pad the sequence
    x_test = tokenizer.texts_to_sequences(text)
    x_test = np.array(x_test).squeeze()
    x_test = pad_sequences([x_test], padding='post', maxlen=X.shape[1])

    # Predict the response
    y_pred = load.predict(x_test)
    y_pred = y_pred.argmax()
    tag = lbl_enc.inverse_transform([y_pred])[0]
    responses = df[df['tag'] == tag]['responses'].values[0]

    response = random.choice(responses)

    return {'response':response}
camera=cv2.VideoCapture(0)

def generate_frames():
    # Initialize the camera
    camera = cv2.VideoCapture(0)

    # Load the facial landmark detector
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("C:\\Users\\Devansh\\Downloads\\shape_predictor_68_face_landmarks.dat")

    # Landmark indices for the nose region
    nose_start = 28
    nose_end = 34

    # Parameters for smoothing
    MOVING_AVG_WINDOW_SIZE = 5
    MOVING_AVG_ALPHA = 0.5

    # Initialize nose position and moving average buffer
    prev_nose_y = None
    moving_avg_buffer = []

    # Initialize new_state
    new_state = "Exhalation"

    while True:
        success, frame = camera.read()
        if not success:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        for face in faces:
            landmarks = predictor(gray, face)
            nose_landmarks = [landmarks.part(i) for i in range(nose_start, nose_end)]

            # Calculate the average y-coordinate of the nose region
            y_coords = [p.y for p in nose_landmarks]
            avg_nose_y = sum(y_coords) / len(y_coords)

            # Smoothing with moving average
            if len(moving_avg_buffer) < MOVING_AVG_WINDOW_SIZE:
                moving_avg_buffer.append(avg_nose_y)
            else:
                moving_avg_buffer.pop(0)
                moving_avg_buffer.append(avg_nose_y)
                avg_nose_y = np.mean(moving_avg_buffer)

            # Detect inhaling or exhaling based on nose region movement
            if prev_nose_y is not None:
                y_change = avg_nose_y - prev_nose_y
                if y_change < -5:  # Threshold for upward movement
                    new_state = "Inhalation"
                elif y_change > 5:  # Threshold for downward movement
                    new_state = "Exhalation"

            prev_nose_y = avg_nose_y

        # Set the text and color based on the breathing state
        if new_state == "Inhalation":
            text = "Inhalation"
            color = (0, 0, 255)  # Red
        else:
            text = "Exhalation"
            color = (0, 255, 0)  # Green

        # Draw the text on the frame
        cv2.putText(frame, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

        # Encode the frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/video')
def video():
    return Response(generate_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=5001)

# print(chatbot('how exercise helps'))