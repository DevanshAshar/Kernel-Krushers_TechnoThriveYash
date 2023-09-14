from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.core.mail import send_mail
from .models import ChatResponse
from .serializers import ChatResponseSerializer
from user.models import User
from datetime import datetime
from decouple import config
import cloudinary
import cloudinary.uploader
import csv
import os

cloudinary.config( 
  cloud_name = config('CLOUD_NAME'), 
  api_key = config('API_KEY'), 
  api_secret = config('API_SECRET') 
)


def create_csv(username):
    queryset = ChatResponse.objects.filter(user=User.objects.get(username=username))
    serializer = ChatResponseSerializer(queryset, many=True)
    data = serializer.data
    print(data)
    filename = f"data_{username}.csv"
    file_path = os.path.join("csv_files", filename).replace("\\", "/")
    file_exists = os.path.isfile(file_path)
    current_timestamp = datetime.now().strftime('%Y-%m-%d')
    # Create and write data to the CSV file
    with open(file_path, mode='a', newline='') as csv_file:
        writer = csv.writer(csv_file)
        if not file_exists:
            writer.writerow(["Timestamp","user","prompt","response"])
        for row in data:
            writer.writerow([current_timestamp,request.user,row['prompt'],row['response']])

    upload_result = cloudinary.uploader.upload(
        file_path, 
        resource_type="raw", 
        public_id=file_path,  # Set the custom filename
        overwrite=True  # Overwriting the file if it exists
    )
    # Send the URL of the CSV file to the therapist
    admin_email = "therapist@example.com"  # Replace with the therapist email
    csv_url = upload_result['secure_url']

def user_send_mail(username,recipient_mail):
    subject = 'Support for Managing Stress'
    user = User.objects.get(username=username)
    user.stress_count = 0
    user.save()
    # Customize the message with HTML tags
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
        <p>Sincerely,<br>PeacefulPal</p>
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

