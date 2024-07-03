from pydantic import BaseModel
from typing import Optional, List

class Result(BaseModel):
  position: int
  points: int
  
class SeasonResult(Result):
  season: int
  
  
class RaceResult(Result):
  race: str
  
class Sailor(BaseModel):
  name:str
  age: int
  

class Team(BaseModel):
  id: Optional[str] = None
  country: str
  nickname: Optional[str]
  seasons_results: List[SeasonResult]
  last_results: List[RaceResult]
  crew: List[Sailor]
  probabilities: float
  picture: str
  flag: str
  



