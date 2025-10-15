from fastapi import APIRouter, Depends,UploadFile, File, HTTPException
from sqlmodel import Session, select
from Auth.auth import get_user
from fastapi.responses import FileResponse
from Database.models import Image
from Database.db import get_session
import uuid
import os
import shutil 
srouter = APIRouter()

about_us = "This is the about us page."
choose = "This is the choose page"
UPLOAD_DIR = "portfolio_images"
@srouter.get("/about")
def get_about():
    return {"about": about_us}
    

@srouter.post("/about")
def post_about(Body : dict,current_user :dict = Depends(get_user)):
    global about_us
    about_us = Body.get("about")
    return {"message": "About us updated successfully."}

@srouter.get("/choose")
def get_choose():
    return {"choose": choose}

@srouter.post("/choose")
def post_choose(Body : dict,current_user :dict = Depends(get_user)):
    global choose
    choose = Body.get("choose")
    return {"message": "Choose updated successfully."}




