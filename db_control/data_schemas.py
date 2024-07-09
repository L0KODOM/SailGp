import numpy as np
import random
import threading
import json
from validations import get_valid_input, get_valid_name
from main_requests import get_data, get_circuit_results


RACES = ["CHICAGO", "LOS ANGELES", "SAINT-TROPEZ", "CADIZ", "DUBAI", "ABU DHABI", "SIDNEY", "CHRISTCHURCH", "BERMUDA", "HALIFAX", "NEW YORK"]


#RACES = ["CHICAGO", "LOS ANGELES", "SAINT-TROPEZ", "CADIZ", "DUBAI", "ABU DHABI", "SIDNEY", "CHRISTCHURCH", "BERMUDA", "HALIFAX", "NEW YORK"]

team_last_positions = []



def prob_positions(results) -> dict:
  
  num_simulations = 10000
  
  teams_probs = {}
  
  for team, team_results in results.items():
    results_np = np.array(team_results)
    mean = np.mean(results_np)
    desviation = np.std(results_np)
    if team not in teams_probs:
      teams_probs[team] = {}

    for num in range(1,11):
      if num not in teams_probs[team]:
        teams_probs[team][num] = 0
    
    for _ in range(num_simulations):
      simulation = random.gauss(mean, desviation)
      rounded = round(simulation)
      
      for number in range(1,11):
        if rounded == number:
          teams_probs[team][number] += 1
          
  for team, results in teams_probs.items():
    for number in range(1,11):
      results[number] = results[number] / num_simulations
          
  return teams_probs

def race_simulator(simulations= 40000, num_threads = 4):
  
  numpy_array = np.array(team_last_positions)
  mean = np.mean(numpy_array)
  desviation = np.std(numpy_array)
  
  first_pos_counter = 0
  lock = threading.Lock()
  
  def simulate(num_simulations):
    nonlocal first_pos_counter
    local_counter = 0
    
    for _ in range(num_simulations):
      simulation = random.gauss(mean, desviation)
      rounded = round(simulation)
      
      if rounded == 1:
        local_counter += 1
        
    with lock:
      first_pos_counter += local_counter
      
  threads = []
  simulations_per_thread = simulations // num_threads
  
  for _ in range(num_threads):
    thread = threading.Thread( target=simulate, args=(simulations_per_thread, ))
    thread.start()
    threads.append(thread)
  
  for thread in threads:
    thread.join()
  
  first_pos_prob = first_pos_counter / simulations
  return first_pos_prob

def get_seasons_data(season):
  position = get_valid_input(
    f"Posicion Season {season}: ",
    'position'
  )
  points = get_valid_input(
    f"Puntos Season {season}: ",
    'points'
  )
  return  {
    "season": season,
    "position": position,
    "points": points
  }
  
def get_last_results_data(race):
  position_race = get_valid_input(
    f"Posicion {race}: ",
    'position'
  )
  points_race = get_valid_input(
    f"Puntos {race}: ",
    'points'
  )
    
  team_last_positions.append(position_race)
    
  return {
    "race" : race,
    "position": position_race,
    "points" : points_race
  }
  
def get_crew_data():
  name = get_valid_name("Nombre: ")
  age = get_valid_input(
    f"Edad de {name}: ",
    'age'
  )
  picture = input("Foto del tripulante: ")
      
  return {
    "name" : name,
    "age" : age,
    "picture" : picture
  }
  
    
def define_team(type):
  
  country = get_valid_name("Nombre del país: ")
  
  if type != 'post':
    data = get_data(country)
    data_json = json.loads(data)
    data_id = data_json["id"]
    
  nickname = get_valid_name("Apodo: ")  
  picture = input("Url de la imagen: ")
  flag = input("Url de la bandera:")
  
  seasons_data = [get_seasons_data(season) for season in range(1,4)]
  
  last_results_data = [get_last_results_data(race) for race in RACES] 
    
  crew_data = [get_crew_data() for _ in range(1,5)]
    
  data = {
    "country": country,
    "nickname": nickname,
    "seasons_results": seasons_data,
    "last_results": last_results_data,
    "crew": crew_data,
    "probabilities": race_simulator(),
    "picture": picture,
    "flag": flag
  }
  
  if type != 'post':
    data["id"] = data_id
  
  return data

def define_circuit():
  
  name = input("Circuito: ")
  picture = input("Imagen: ")
  conditions = input("Condiciones: ")
  date = input("Fecha: ")
  results = get_circuit_results(name)
  
  data = {
    "name": name,
    "picture": picture,
    "date": date,
    "conditions": conditions,
    "results": results
  }
  
  return data
    