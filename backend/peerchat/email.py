from django.core.mail import send_mail, EmailMessage
from django.utils.html import strip_tags
from django.core.mail import send_mail
from .models import ChatResponse
from user.models import User
from datetime import datetime
from decouple import config
import cloudinary
import cloudinary.uploader
import csv
import os
import requests

cloudinary.config( 
  cloud_name = config('CLOUD_NAME'), 
  api_key = config('API_KEY'), 
  api_secret = config('API_SECRET') 
)


def create_csv(username):
    queryset = ChatResponse.objects.filter(user=User.objects.get(username=username))
    print(queryset[0].response)
    filename = f"data_{username}.csv"
    file_path = os.path.join("csv_files", filename).replace("\\", "/")
    file_exists = os.path.isfile(file_path)
    current_timestamp = datetime.now().strftime('%Y-%m-%d')
    # Create and write data to the CSV file
    with open(file_path, mode='w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        if not file_exists:
            writer.writerow(["Timestamp","user","prompt","response"])
        for row in queryset:
            writer.writerow([current_timestamp,username,row.prompt,row.response])

    upload_result = cloudinary.uploader.upload(
        file_path, 
        resource_type="raw", 
        public_id=file_path, 
        overwrite=True  
    )
    csv_url = upload_result['secure_url']
    return csv_url

def user_send_mail(username,recipient_mail,code):
    subject = 'Support for Managing Stress'
    user = User.objects.get(username=username)
    user.stress_count = 0
    user.save()
    html_message = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Support for Managing Stress</title>
    </head>
    <body>
        <p>Hello {username},</p>
        <p>According to an AI chatbot, it seems I can't solve your problem. Instead, you can talk to a therapist.</p>
        <p>We've identified a therapist who can provide you with the support you need:</p>
        <p>Therapist: Dr abc xyz</p>
        <p>Email: <a href="mailto:therapistabc@gmail.com">therapistabc@gmail.com</a></p>
        <p>Please feel free to reach out to  at therapistabc@gmail.com to schedule an appointment or discuss your concerns. Your mental well-being is important to us, and we're here to assist you on your journey to better mental health.</p>
        <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
        <p>Take care and be well.</p>
        <p>You can join the video call using this link localhost:3000/room/{code}</p>
        <p>Sincerely,<br>Mindful Mate</p>
    </body>
    </html>
    """
    
    from_email = config("EMAIL_HOST_USER")  # This should be the same as EMAIL_HOST_USER
    recipient_list = [recipient_mail]  # Replace with the recipient's email address
    
    # Send the email
    send_mail(
        subject,
        strip_tags(html_message),  # Use strip_tags to provide a plain text version as well
        from_email,
        recipient_list,
        html_message=html_message,
    )
    
    
    
def send_therapist_email(therapist_email,username,user_email,code):
    subject = f'User Alert ({username}): Increased Chatbot Usage and problem is not solved'
    csv_url = create_csv(username)
    # print(create_csv(username))
    # Customized the message using HTML tags
    html_message = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Alert: Increased Chatbot Usage</title>
    </head>
    <body>
        <p>Dear Therapist,</p>
        <p>We would like to bring to your attention that the user <strong>{username}</strong> (email: <a href="mailto:{user_email}">{user_email}</a>) is increasingly using the chatbot and has provided the following problem description:</p>
        <p>For the problem description we have attached a file having user messages for your reference:</p>
        
        <!-- Add a file icon and download button -->
        <p>
            <a href="{create_csv(username)}" style="text-decoration: none; background-color: #007BFF; color: #ffffff; padding: 10px 15px; border-radius: 5px; font-weight: bold; display: inline-block;">
                <img src="https://icons8.com/icon/xdyzXTtWRBOu/xls" alt="File Icon" width="32" height="32" style="vertical-align: middle;"> Download File
            </a>
        </p>
        
        <p>Please consider reaching out to the user to provide assistance as needed.</p>
        <p>localhost:3000/room/{code}</p>
        <p>Thank you for your support.</p>
        <p>Sincerely,<br>Mindful Mate Support Team</p>
    </body>
    </html>
    """
    from_email = config("EMAIL_HOST_USER")  
    recipient_list = [therapist_email] 
    send_mail(
        subject,
        strip_tags(html_message),
        from_email,
        recipient_list,
        html_message=html_message,
    )

    return csv_url

