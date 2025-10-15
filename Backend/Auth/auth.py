from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

# Define the secret key and algorithm for JWT

SECRET_KEY = "ADX214"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 45

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def hashp(password):
    return pwd_context.hash(password)
def verifyP(plain,hashed):
    return pwd_context.verify(plain, hashed)

def create_token(data:dict, expires_delta: Optional[timedelta]= None):
    encoded_data = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    encoded_data.update({"exp": expire})
    return jwt.encode(encoded_data, SECRET_KEY, algorithm=ALGORITHM)
def get_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
def super_uacess(token:str = Depends(get_user)):
    if not token.get("role"):   # role was set to u.is_superuser in login
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not a superuser"
        )
    return token
