from fastapi import FastAPI
from routes.staticroutes import srouter
from fastapi.staticfiles import StaticFiles
from routes.reviewsroute import rrouter
from routes.userroutes import urouter  
from routes.contactroutes import crouter
from Database.db import init_db
from fastapi.middleware.cors import CORSMiddleware
from routes.imageroutes import irouter

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:4173",
    "https://fc5f1eda23be.ngrok-free.app/",
    "https://*.ngrok-free.app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def start():
    init_db()
    print("Database initialized and connected.")



app.mount("/images",StaticFiles(directory="portfolio_images"),name = "images")

app.include_router(srouter)
app.include_router(rrouter,prefix="/reviews")
app.include_router(urouter,prefix="/auth")
app.include_router(crouter,prefix="/contact")
app.include_router(irouter,prefix= "/image")