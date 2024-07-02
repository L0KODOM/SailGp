from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from datetime import datetime, timedelta
from db.models.User import UserDB
from db.models.ApiKey import ApiKey
from db.schemas.user_schema import user_schema
from db.schemas.key_schema import key_schema
from db.client import db_client
from bson import ObjectId
from passlib.context import CryptContext
import uuid

ALGORYTHM = "HS256"
ACCESS_TOKEN_DURATION = 5
SECRET = "58E8E43B7660A"

crypt = CryptContext(schemes=["bcrypt"])

router = APIRouter(
  prefix="/login",
  tags=["/login"],
  responses={404 : {"mensaje":"no encontrado"}}
)

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

def search_user(key: str, value: str):
    user = db_client.users.find_one({key: value})
    if user:
        return UserDB(**user_schema(user))
    else:
        return None

def generate_key():
  return str(uuid.uuid4())

def validate_key(value:str):
  api_key = db_client.keys.find_one({"value": value})
  if api_key:
    return True
  else:
    return status.HTTP_401_UNAUTHORIZED
  
def show_key(username:str):
  api_key = db_client.keys.find_one({"username": username})
  if api_key:
    return ApiKey(**key_schema(api_key))
  else:
    return status.HTTP_204_NO_CONTENT

@router.get("/{username}")
async def get_key(username:str):
  result = show_key(username)
  return result

@router.post("/")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = search_user("username", form.username)
    if not user_db:
        raise HTTPException(status_code=400, detail="El usuario no es correcto")

    if not crypt.verify(form.password, user_db.password):
        raise HTTPException(status_code=400, detail="La contraseña no es correcta")

    access_token_expiration = timedelta(minutes=ACCESS_TOKEN_DURATION)
    expire = datetime.utcnow() + access_token_expiration

    access_token = {
        "sub": user_db.username,
        "exp": expire
    }

    encoded_jwt = jwt.encode(access_token, SECRET, algorithm=ALGORYTHM)

    return {"access_token": encoded_jwt, "token_type": "bearer"}

@router.get("/")
async def hola():
  return "login"

@router.post("/create", response_model=UserDB, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserDB):
  user_dict= dict(user)
  if "id" in user_dict:
    del user_dict["id"]
    
  api_key = generate_key()
  
  api_key_dict = ApiKey(username=user_dict["username"], value= api_key)
  
  try:
    db_client.keys.insert_one(dict(api_key_dict))
  except: 
    pass
    
  user_dict["password"] = crypt.hash(user_dict["password"])
    
  inserted_id = db_client.users.insert_one(user_dict).inserted_id
  
  new_user = user_schema(db_client.users.find_one({"_id":ObjectId(inserted_id)}))
  
  if new_user is None:
    raise HTTPException(status_code=404, detail="Team not found")
  
  return UserDB(**new_user)


  
  
