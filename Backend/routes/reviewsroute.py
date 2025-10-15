from fastapi import APIRouter, Depends
from Database.models import review
from Database.db import get_session
from Auth.auth import get_user
from sqlmodel import Session, select
from typing import List

rrouter = APIRouter()

@rrouter.get("/", response_model=List[review])
def read_reviews(session: Session = Depends(get_session), limit : int =5):
    reviews = session.exec(select(review).order_by(review.id.desc()).limit(limit)).all()
    return reviews

@rrouter.post("/", response_model=review)
def create_review(review: review, session: Session = Depends(get_session), current_user: dict = Depends(get_user)):
    session.add(review)
    session.commit()
    session.refresh(review)
    return review
@rrouter.delete("/{review_id}")
def delete_review(review_id: int, session: Session = Depends(get_session), current_user: dict = Depends(get_user)):
    review_db = session.get(review, review_id)
    if not review_db:
        return {"message": "Review not found"}
    session.delete(review_db)
    session.commit()
    return {"message": "Review deleted successfully"}

