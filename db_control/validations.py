def get_valid_name(input_text):
  while True:
    name = input(input_text) 
    if not all(char.isalpha() or char.isspace() for char in name):
      print("Por favor introduce un texto válido")
    else: 
      return name
    
def get_valid_input(input_text, type):
  
  validations = {
    'points': {
        'error_text': "El número de puntos no puede ser negativo",
        'validation': lambda x: x >= 0
    },
    'position': {
        'error_text': "La posición debe ser entre 1 y 10",
        'validation': lambda x: 1 <= x <= 10
    },
    'menu': {
        'error_text': "Elige una opción válida",
        'validation': lambda x: 1 <= x <= 6
    },
    'season': {
        'error_text': "Elige una temporada válida",
        'validation': lambda x: 1 <= x <= 3
    },
    'race': {
        'error_text': "Elige una regata válida",
        'validation': lambda x: 1 <= x <= 4
    },
    'crew': {
        'error_text': "Elige un miembro válido",
        'validation': lambda x: 1 <= x <= 5
    },
    'age': {
        'error_text': "La edad debe ser entre 18 y 45",
        'validation': lambda x: 18 <= x <= 45
    }
}
  
  while True:
    try:
      value = int(input(input_text))
      if not validations[type]['validation'](value):
        raise ValueError(validations[type]['error_text'])
      return value
    except ValueError as e:
      print(f"por favor, introduce un valor correcto. {e}")
    