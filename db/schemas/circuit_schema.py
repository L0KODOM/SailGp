def circuit_schema(circuit) -> dict:
  return {
    "id": str(circuit["_id"]),
    "name": circuit["name"],
    "picture": circuit["picture"],
    "date": circuit["date"],
    "conditions": circuit["conditions"],
    "results": [
      {
        "position": team["position"],
        "points": team["points"],
        "team": team["team"]
      } for team in circuit["results"]
    ]
  }
  
def circuits_schema(circuits) -> list:
  return [circuit_schema(circuit) for circuit in circuits]