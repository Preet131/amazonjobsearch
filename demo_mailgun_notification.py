import requests
from dotenv import load_dotenv
import os
def send_email_notification(job_details, recipient_email):
    api_key = os.getenv('MAILGUN_API_KEY')  # Load API key from .env
    domain = os.getenv('MAILGUN_DOMAIN')    # Load domain from .env
    
    return requests.post(
        f"https://api.mailgun.net/v3/{domain}/messages",
        auth=("api", api_key),
        data={"from": f"Mailgun Sandbox <postmaster@{domain}>",
              "to": "preetvaghela131@gmail.com",
              "subject": "New Job Found!",
              "text": f"A new job has been found: {job_details}"})

if __name__ == "__main__":
    # Simulate job search
    job_found = True
    job_details = "Software Engineer at Amazon"

    # Recipient email
    recipient_email = "recipient-email@example.com"  # Replace with your email

    if job_found:
        response = send_email_notification(job_details, recipient_email)
        if response.status_code == 200:
            print("Email sent successfully!")
        else:
            print(f"Failed to send email: {response.text}")