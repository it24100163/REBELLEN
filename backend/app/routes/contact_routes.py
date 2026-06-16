from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.contact import ContactMessage

router = APIRouter(prefix="/contact", tags=["Contact"])


class ContactCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None
    message: str


@router.post("/")
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    new_message = ContactMessage(
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        message=contact.message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return {"message": "Message sent successfully"}


@router.get("/")
def get_contacts(db: Session = Depends(get_db)):
    return db.query(ContactMessage).all()