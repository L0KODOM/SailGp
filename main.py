from fastapi import FastAPI
from routers import teams, auth, circuits
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

app.include_router(teams.router)
app.include_router(auth.router)
app.include_router(circuits.router)

@app.get("/")
async def hola():
  return "API de SailGP no oficial"