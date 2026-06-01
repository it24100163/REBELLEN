from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User

router = APIRouter()


class UserCreate(BaseModel):

    username: str
    email: str
    password: str


@router.post("/register")
def register(user: UserCreate):

    db: Session = SessionLocal()

    new_user = User(
        username=user.username,
        email=user.email,
        password=user.password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    db.close()

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(user: UserCreate):

    if user.email == "admin@rebellen.com" and user.password == "admin123":

      return {
          "message": "Login successful",
          "username": "Admin",
          "email": "admin@rebellen.com",
          "role": "admin"
    }

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email,
        User.password == user.password
    ).first()

    db.close()

    if existing_user:

        return {
    "message": "Login successful",
    "username": existing_user.username,
    "email": existing_user.email,
    "role": existing_user.role
}

    return {
        "message": "Invalid credentials"
    }