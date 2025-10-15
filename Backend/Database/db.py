from sqlmodel import Field, SQLModel, create_engine, Session
DB_URL = "sqlite:///./Database/maindb.db"
engine = create_engine(DB_URL, connect_args={"check_same_thread": False})
def get_session():
    with Session(engine) as session:
        yield session

def init_db():
    print("connected")
    SQLModel.metadata.create_all(engine)
 