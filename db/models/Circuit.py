from pydantic import BaseModel
from typing import Optional, List
from db.models.Team import Result

class TeamResult(Result):
  team: str

class Circuit(BaseModel):
  id: Optional[str] = None
  name: str
  picture: str
  date: str
  conditions: str
  results: List[TeamResult]