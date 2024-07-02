from db_control.validations import get_valid_input
from db_control.main_requests import send_team, send_update, send_delete, get_data
from db_control.data_schemas import define_team


def post_team():
  
  data = define_team('post')
  
  send_team(data)
    
def patch_team():
  
  country = input('Que país quieres modificar?: ')
  parameter = input("Que parámetro quiere modificar?: ")
  
  prompts = {
    'seasons_results': "Que temporada quiere modificar: ",
    'last_results': "Que regata quiere modificar:: ",
    'crew': "Que miembro quiere modificar: "
  }
  
  if parameter in prompts:
    number_type = 'season' if parameter == 'seasons_results' else 'race' if parameter == 'last_results' else 'crew'
    number= get_valid_input(prompts[parameter], number_type)
  
    option = input("Que quieres modificar: ")
  value = input("Cúal es su valor?: ")
  
  send_update(country, parameter, number, option, value)

def put_team():
  
  data = define_team('put')
  
  send_team(data)

def delete_team():
  
  country = input("Que equipo quieres eliminar?: ")
  
  data = get_data(country)
  data_id = data["id"]
  
  send_delete(data_id)

def handle_action(option):  
  actions = {
        1: post_team,
        2: patch_team,
        3: put_team,
        4: delete_team
    }
  action = actions.get(option, lambda: print("Opción inválida"))
  action()
    
def display_menu():
  
  input("Bienvenido al la base de datos de Sailgp, press enter para entrar.\n\n")
  
  print("\t1. Añadir un equipo\n\t2. Modificar un equipo\n\t3. Remplazar un equipo\n\t4. Borrar un equipo.\n\n")
  
  option = get_valid_input(
    "Elige la opción: ",
    'menu'
  )
  
  handle_action(option)
    
    
if __name__ == "__main__":
  display_menu()