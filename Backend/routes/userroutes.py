from fastapi import APIRouter,Depends,HTTPException
from Database.models import User
from Auth.auth import hashp,verifyP,create_token, get_user,super_uacess
from Database.db import get_session
from sqlmodel import Session,select
from fastapi.security import OAuth2PasswordRequestForm
urouter = APIRouter()

@urouter.get('/cuser')
def get(current_user :dict = Depends(get_user)):
    return{"message":"Hello"}
@urouter.get('/users',response_model=list[User])
def get_users(session: Session = Depends(get_session), current_user: dict = Depends(get_user)):
    super_uacess(current_user)
    users = session.exec(select(User)).all()
    return users
@urouter.post('/signup', response_model=User)
def create_user(user: User, session: Session = Depends(get_session),current_user: dict = Depends(get_user)):
    super_uacess(current_user)
    u = session.exec(
        select(User).where(User.username == user.username)
    ).first()
    if u:
        raise HTTPException(status_code=400, detail="User already exists")
    u_db = User( 
        username=user.username,
        email=user.email,
        hashed_password=hashp(user.hashed_password),
        is_active=user.is_active,
        is_superuser=user.is_superuser
    )
    session.add(u_db)

    session.commit()
    session.refresh(u_db)
    return {"message": "User created", "user":user }

@urouter.post("/login")
def login(data: OAuth2PasswordRequestForm = Depends(),session : Session= Depends(get_session)):
    u = session.exec(select (User).where(User.username == data.username)).first()
    if not u or not verifyP(data.password, u.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_token({"sub": u.username, "role": u.is_superuser})  
    return {"access_token": access_token, "token_type": "bearer"}

@urouter.get("/check-token")
def check_token(payload: dict = Depends(get_user)):
    return {
        "valid": True,
        "user": payload.get("sub"),
        "role": payload.get("role"),
        "exp": payload.get("exp")
    }

@urouter.delete("/users/{user_id}")
def delete_user(user_id: int, session: Session = Depends(get_session), current_user: dict = Depends(get_user)):
    super_uacess(current_user)
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {"message": "User deleted successfully"}