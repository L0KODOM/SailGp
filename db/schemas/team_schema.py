def team_schema(team) -> dict:
    return {
        "id": str(team["_id"]),
        "country": team["country"],
        "nickname": team["nickname"],
        "seasons_results": [
            {
                "position": season["position"],
                "points": season["points"],
                "season": season["season"]
            } for season in team["seasons_results"]
        ],
        "last_results": [
            {
                "position": race["position"],
                "points": race["points"],
                "race": race["race"]
            } for race in team["last_results"]
        ],
        "crew": [
            {
                "name": sailor["name"],
                "age": sailor["age"]
            } for sailor in team["crew"]
        ],
        "probabilities": team["probabilities"],
        "picture": team["picture"],
        "flag": team["flag"]
    }
    
    
def teams_schema(teams) -> list:
    return[team_schema(team) for team in teams]