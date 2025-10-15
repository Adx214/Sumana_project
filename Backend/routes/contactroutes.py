# main.py
import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv
from typing import List

# --- These would be in your other project files ---
from Database.models import Contact
from Database.db import get_session
from sqlmodel import Session, select
from Auth.auth import get_user
# ----------------------------------------------------


# Load environment variables from a .env file
load_dotenv()
 # Ensure this is set in your environment

# --- Configuration ---
# Securely load credentials from environment variables
# NEVER hardcode passwords in your code
conf = ConnectionConfig(
    MAIL_USERNAME= os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),  # App Password from Google
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,   # instead of MAIL_TLS
    MAIL_SSL_TLS=False,   # instead of MAIL_SSL
    USE_CREDENTIALS=True
)

crouter = APIRouter()

@crouter.get("/", response_model=List[Contact])
def get_query(session: Session = Depends(get_session), current_user: dict = Depends(get_user)):
    """
    Retrieves all contact queries, ordered by most recent.
    Requires authentication.
    """
    contacts = session.exec(select(Contact).order_by(Contact.id.desc())).all()
    return contacts

@crouter.post("/", response_model=Contact)
async def post_query(contact: Contact, session: Session = Depends(get_session)):
    """
    Accepts a new contact query, saves it to the database,
    and sends an email notification.
    """
    # Create the email message
    message = MessageSchema(
        subject="New Contact Query Received",
        recipients=[os.getenv("MAIL_RECIEVER")],  # Send the notification to your own email
        body=f"New contact query received from {contact.name} ({contact.email}) regarding {contact.category}.\n\nMessage: {contact.message}",
        subtype="plain"
    )

    fm = FastMail(conf)

    # Send the email in the background
    try:
        await fm.send_message(message)
    except Exception as e:
        # In a real app, you would log this error more formally
        print(f"Error sending email: {e}")
        # Optionally, you could raise an HTTPException if email sending is critical
        # raise HTTPException(status_code=500, detail="Failed to send notification email.")

    # Save the query to the database
    session.add(contact)
    session.commit()
    session.refresh(contact)
    return contact

@crouter.delete("/{contact_id}")
def delete_query(contact_id: int, session: Session = Depends(get_session), current_user: dict = Depends(get_user)):
    """
    Deletes a contact query by its ID.
    Requires authentication.
    """
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    session.delete(contact)
    session.commit()
    return {"message": "Contact deleted successfully"}