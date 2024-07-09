from fastapi import APIRouter, HTTPException, status
from db.client import db_client
from db.models.Circuit import Circuit
from routers.auth import validate_key
from db.schemas.circuit_schema import circuits_schema, circuit_schema
from bson import ObjectId

router = APIRouter(prefix="/circuits",
                   tags=["/circuits"],
                   responses={404 : {"mensaje":"no encontrado"}})


def search_circuit(key:str, value:str):
  
  try:
    circuit = circuit_schema(db_client.circuits.find_one({key:value}))
    return Circuit(**circuit)
  except:
    return "no se ha encontrado el circuito"


@router.get("/api_key={key}", response_model=list[Circuit])
async def get_circuits(key: str):
  validation = validate_key(key)
  if validation:
    return circuits_schema(db_client.circuits.find())
  else:
    return status.HTTP_401_UNAUTHORIZED
  
@router.get("/{circuit}", response_model= Circuit)  
async def get_circuit(circuit:str):
  return search_circuit("name", circuit)

@router.post("/", response_model=Circuit, status_code=status.HTTP_201_CREATED)
async def create_circuit(circuit: Circuit):
  circuit_dict = dict(circuit)
  circuit_dict["results"] = [dict(result) for result in circuit.results]
  
  if "id" in circuit_dict:
    del circuit_dict["id"]
    
  inserted_id = db_client.circuits.insert_one(circuit_dict).inserted_id
  
  new_circuit = db_client.circuits.find_one({"_id": ObjectId(inserted_id)})
  if new_circuit is None:
    raise HTTPException(status_code=404, detail="Circuit not found")
  
  return Circuit(**circuit_schema(new_circuit))
  