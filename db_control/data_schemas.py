import numpy as np
import random
import threading
from db_control.validations import get_valid_input, get_valid_name
from db_control.main_requests import get_data


RACES = ["Canada", "Spain", "Italy", "EEUU"]

team_last_positions = []

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
    f"Posicion Season {race}: ",
    'position'
  )
  points_race = get_valid_input(
    f"Puntos Season {race}: ",
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
    f"Edad de {name}",
    'age'
  )
  position = input("Posición del tripulante")
      
  return {
    "name" : name,
    "age" : age,
    "position" : position
  }
    
def define_team(type):
  
  country = get_valid_name("Nombre del país: ")
  
  if type != 'post':
    data = get_data(country)
    data_id = data["id"]
    
  nickname = get_valid_name("Apodo: ")  
  picture = input("Url de la imagen: ")
  
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
    "picture": picture
  }
  
  if type != 'post':
    data["id"] = data_id
  
  return data
    