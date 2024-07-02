


def user_schema(user) -> dict:
  return {
    "id": str(user["_id"]),
    "username": user["username"],
    "full_name": user["full_name"],
    "email": user["email"],
    "disabled": user["disabled"],
    "password": user["password"],  
  }
