from typing import List,Optional
from sqlmodel import SQLModel,Field

class review(SQLModel,table = True):
    id :Optional[int] = Field(default=None,primary_key=True)
    Name : str = Field(index=True, max_length=100)
    Review : str = Field(index=True, max_length=500)
    Role : str = Field(index = True, max_length=50)

class User(SQLModel,table = True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, max_length=50)
    email: str = Field(index=True, max_length=100)
    hashed_password: str = Field(max_length=128)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)

class Contact(SQLModel,table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=100)
    email: str = Field(index=True, max_length=100)
    number: str = Field(index=True, max_length=15)
    category: str = Field(index=True, max_length=100)
    message: str = Field(index=True, max_length=1000)

class Image(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    url: str