import requests
import json


URL = "http://127.0.0.1:8000/teams/"

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
  
  try:
    response = requests.delete(URL, data=data_id, headers=HEADERS)
    if response.status_code == 204:
      print(f"Borrado con éxito {response.status_code}")
    else:
        print(f"Ocurrió un error al enviar el equipo. Código de estado: {response.status_code}")
  except:
    print(f"Ha sucedido un error")