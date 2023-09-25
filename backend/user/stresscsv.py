import os
import csv
import cloudinary
import cloudinary.uploader
from decouple import config

cloudinary.config( 
  cloud_name = config('CLOUD_NAME'), 
  api_key = config('API_KEY'), 
  api_secret = config('API_SECRET') 
)

question = [
    'How would you describe your overall mood lately?',
    'How would you rate your sleep patterns?',
    'Have you noticed any changes in your appetite or weight recently?',
    'How would you describe your energy levels during the day?',
    'Do you find it difficult to concentrate or make decisions?',
    'How do you typically react to stress or challenging situations?',
    'Are you experiencing any physical symptoms like headaches or stomachaches without a clear medical cause?',
    'Do you have a support system, such as friends or family, with whom you can share your feelings and concerns?',
    'How often do you engage in activities or hobbies that you used to enjoy?',
    'Have you had thoughts of self-harm or suicide?'
]

def create_csv(username, answer):
    print(answer,answer[2])
    # Ensure the 'csv_files' directory exists
    if not os.path.exists("csv_files"):
        os.makedirs("csv_files")

    filename = f"form_{username}.csv"
    file_path = os.path.join("csv_files", filename).replace("\\", "/")

    # Create and write data to the CSV file
    with open(file_path, mode='w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["question", "answer"])
        for ques, ans in zip(question, answer):
            writer.writerow([ques, ans])

    upload_result = cloudinary.uploader.upload(
        file_path,
        resource_type="raw",
        public_id=file_path,
        overwrite=True
    )
    csv_url = upload_result['secure_url']
    return csv_url

# print(create_csv('dhruvin', [1, 1, 2, 3, 1, 4, 1, 2, 3, 1]))
