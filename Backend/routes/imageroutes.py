from fastapi import APIRouter, Depends,UploadFile, File, HTTPException
from sqlmodel import Session, select
from Auth.auth import get_user
from fastapi.responses import FileResponse
from Database.models import Image
from Database.db import get_session
import uuid
import os
import shutil 


irouter = APIRouter()
UPLOAD_DIR = "portfolio_images"
@irouter.post("/images")
async def upload_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_user),
    session: Session = Depends(get_session)
):
    # generate unique filename
    ext = os.path.splitext(file.filename)[1]
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # url to serve the image later
    url = f"/images/{unique_name}"

    # save only the url in DB
    new_image = Image(url=url)
    session.add(new_image)
    session.commit()
    session.refresh(new_image)

    return {
        "message": "Image uploaded successfully",
        "id": new_image.id,
        "url": new_image.url
    }



@irouter.get("/images/{filename}")
def get_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(file_path)



@irouter.get("/images")
def list_images(session: Session = Depends(get_session)):
    images = session.exec(select(Image)).all()
    return images

@irouter.get("/images10")
def list_images(session: Session = Depends(get_session)):
    images = session.exec(
        select(Image).order_by(Image.id.desc()).limit(15)
    ).all()
    return images

@irouter.delete("/images/delete/{image_id}")
def delete_image(
    image_id: int,
    current_user: dict = Depends(get_user),
    session: Session = Depends(get_session)
):
    # fetch the image record from DB
    image = session.get(Image, image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found in database")

    # build file path from url (strip leading "/images/")
    filename = image.url.replace("/images/", "")
    file_path = os.path.join(UPLOAD_DIR, filename)

    # delete file from disk if it exists
    if os.path.exists(file_path):
        os.remove(file_path)

    # delete from DB
    session.delete(image)
    session.commit()

    return {"message": "Image deleted successfully"}
