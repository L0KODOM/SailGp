from pydantic import BaseModel


class ApiKey(BaseModel):
  username: str
  value: str 