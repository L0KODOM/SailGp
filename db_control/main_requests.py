import requests
import json


RACES = ["CHICAGO", "LOS ANGELES", "SAINT-TROPEZ", "CADIZ", "DUBAI", "ABU DHABI", "SIDNEY", "CHRISTCHURCH", "BERMUDA", "HALIFAX", "NEW YORK"]


URL = "http://127.0.0.1:8000/teams/"

URL_CIRCUITS = "http://127.0.0.1:8000/circuits/"

HEADERS = {"Content-Type" : "application/json"}

def send_team(data):
  data_json = json.dumps(data, ensure_ascii=False)
  
  try: 
    response = requests.post(URL, data= data_json, headers=HEADERS)
    if response.status_code == 201:
        print(f"Equipo enviado con éxito {response.status_code}")
    else:
        print(f"Ocurrió un error al enviar el equipo. Código de estado: {response.status_code}")
  except:
    print("ha sucecido un error")
    
def send_circuit(data):
  data_json = json.dumps(data, ensure_ascii=False)
  
  try:
    response = requests.post(URL_CIRCUITS, data=data_json, headers= HEADERS)
    if response.status_code == 201:
      print(f"Circuito enviado con éxito {response.status_code}")
    else:
      print(f"Ocurrió un error al enviar el equipo. Código de estado: {response.status_code}")
  except:
    print("ha sucecido un error")
    
def get_data(country, parameter= '', number= '', option= '', value= '', type= ''):
  
  try: 
    url = (f"{URL}{country}")
    response = requests.get(url)
    text_response = response.text.replace("'",'"')
    response_data = json.loads(text_response)
    
    if type == 'patch':
      if parameter in ["seasons_results", "last_results", "crew"]:
        response_data[parameter][number - 1][option] = value
      else:
        response_data[parameter] = value
      
    response_data_corrected = json.dumps(response_data)
    return response_data_corrected
  except:
    print("ha sucecido un error en get")  
   
def get_positions() -> dict:
  
  token = "5ecdf18e-c543-4fa3-aff7-dbade6f04407" 
  races_results = {}
  
  try:
    url = (f"{URL}api_key={token}")
    response = requests.get(url)
    text_response = response.text.replace("'", '"')
    response_data = json.loads(text_response)
    
    for result in response_data:
      country = result['country']
      if country not in races_results:
        races_results[country] = []
      for race in result["last_results"]:
        races_results[country].append(race["position"])
    
    return races_results
    
    
  except:
    print("ha sucecido un error en get")
    
def get_circuit_results(name):
  
  token = "5ecdf18e-c543-4fa3-aff7-dbade6f04407" 
  circuit_results = []
  
  try:
    response = requests.get(f"{URL}api_key={token}")
    text_response = response.text.replace("'", '"')
    response_data = json.loads(text_response)
    
    for result in response_data:
      team = result["country"]
      team_results = result["last_results"]
      circuit_index = RACES.index(name)
      circuit_result = team_results[circuit_index]
      
      data = {
        "team": team,
        "position": circuit_result["position"],
        "points": circuit_result["points"]
      }
      
      circuit_results.append(data)
      
    return circuit_results
    
  except:
    print("Error en get equipos")
 
def send_update(country, parameter, number, option, value):
  
  response_data_corrected = get_data(country, parameter, number, option, value, 'patch')
  
  try:
    patch_response = requests.patch(URL, data=response_data_corrected, headers=HEADERS)
    if patch_response.status_code == 201:
      print(f"Equipo remplazado con éxito {patch_response.status_code}")
    else:
      print(f"Ocurrió un error al enviar el equipo. Código de estado: {patch_response.status_code}")
  except:
    print("ha sucecido un error en patch")
    
def send_delete(data_id):
  
  url_to_use = f"{URL}{data_id}"
  
  try:
    response = requests.delete(url=url_to_use, headers=HEADERS)
    if response.status_code == 204:
      print(f"Borrado con éxito {response.status_code}")
    else:
      print(f"Ocurrió un error al borrar el equipo. Código de estado: {response.status_code}")
  except:
    print(f"Ha sucedido un error")