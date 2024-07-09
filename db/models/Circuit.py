from pydantic import BaseModel
from typing import Optional, List
from db.models.Team import Result

class TeamResult(Result):
  team: str

class Circuit(BaseModel):
  name: str
  picture: str
  date: str
  conditions: str
  results: List[TeamResult]