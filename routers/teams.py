from fastapi import APIRouter, HTTPException, status
from db.client import db_client
from db.schemas.team_schema import team_schema, teams_schema
from db.models.Team import Team
from bson import ObjectId
from pymongo import ReturnDocument
from routers.auth import validate_key

router = APIRouter(prefix="/teams",
                   tags=["/teams"],
                   responses={404 : {"mensaje":"no encontrado"}})

def search_team(key:str, value: str):
  try:
    team = team_schema(db_client.teams.find_one({key:value}))
    return Team(**team)
  except:
    return "No se ha encontrado el equipo"

def convert_to_dict(obj):
    if isinstance(obj, list):
        return [convert_to_dict(i) for i in obj]
    elif hasattr(obj, "__dict__"):
        return {k: convert_to_dict(v) for k, v in obj.__dict__.items() if v is not None}
    else:
        return obj

@router.get("/api_key={key}", response_model=list[Team])
async def get_teams(key: str):
  validation = validate_key(key)
  if validation:
    return teams_schema(db_client.teams.find())
  else:
    return status.HTTP_401_UNAUTHORIZED

@router.get("/{country}", response_model = Team)
async def get_by_country(country: str):
  return search_team("country", country)

@router.post("/", response_model=Team, status_code=status.HTTP_201_CREATED)
async def create_team(team: Team):
    # Convertir todas las instancias de clases Pydantic a diccionarios
    team_dict = dict(team)
    team_dict['seasons_results'] = [dict(season) for season in team.seasons_results]
    team_dict['last_results'] = [dict(race) for race in team.last_results]
    team_dict['crew'] = [dict(sailor) for sailor in team.crew]

    if "id" in team_dict:
        del team_dict["id"]

    # Insertar en MongoDB
    inserted_id = db_client.teams.insert_one(team_dict).inserted_id

    # Recuperar el nuevo equipo para devolverlo en la respuesta
    new_team = db_client.teams.find_one({"_id": ObjectId(inserted_id)})
    if new_team is None:
        raise HTTPException(status_code=404, detail="Team not found")

    return Team(**team_schema(new_team))
  
@router.put("/", response_model=Team, status_code=status.HTTP_201_CREATED)
async def change_team(team:Team):
  team_dict = dict(team)
  del team_dict["id"]
  try:
    db_client.teams.find_one_and_replace({"_id": ObjectId(team.id)}, team_dict)
  except:
    return "No se actualizó el usuario"
  return search_team("_id", ObjectId(team.id))

@router.delete("/{id}", status_code= status.HTTP_204_NO_CONTENT)
async def delete_team(id:str):
  found = db_client.teams.find_one_and_delete({"_id": ObjectId(id)})
  if not found:
    return "No se ha encontrado el equipo"
  
@router.patch("/", response_model=Team, status_code=status.HTTP_201_CREATED)
async def update_team(team: Team):
    team_dict = convert_to_dict(team)
    team_id = team_dict.pop("id")
    
    try:
        updated_team = db_client.teams.find_one_and_update(
            {"_id": ObjectId(team_id)},
            {"$set": team_dict},
            return_document=ReturnDocument.AFTER
        )
        
        if updated_team is None:
            raise HTTPException(status_code=404, detail="Team not found")
        
        return team_schema(updated_team)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")