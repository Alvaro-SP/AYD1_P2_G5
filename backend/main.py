from flask import Flask, request, jsonify
# from src.Vercatalogo import vercatalogo
# from src.Cargamasiva import cargamasiva
from src.AddUser import add_user
from src.LogUser import log_user
# from src.AddWatchlist import addwatchlist
# from src.VerWatchlist import verwatchlist
# from src.Getpeliporuser import getpeliporuser
# from src.PromedioTotal import promediototal
# from src.QuitWatchlist import quitwatchlist
from src.GetInfoActor import get_info_actor

from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True
# #! Endpoint para obtener todas las MOVIES
# @app.route('/vercatalogo', methods=['GET'])
# def ver_catalogo():
#     response = vercatalogo()
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# #! Endpoint para la carga masiva
# @app.route('/cargamasiva', methods=['POST'])
# def carga_masiva():
#     resprev = cargamasiva(request)
#     resprev.headers.add('Access-Control-Allow-Origin', '*')
#     return resprev

#! Endpoint para agregar un usuario
@app.route('/register', methods=['POST'])
def agregar_usuario():
    resprev = add_user(request)
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#! Endpoint para loguear un usuario
@app.route('/login', methods=['POST'])
def login():
    resprev = log_user(request)
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# #! Endpoint para agregar a la lista WATCHLIST
# @app.route('/addwatchlist', methods=['POST'])
# def add_watchlist():
#     response = addwatchlist(request)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# #! Endpoint para ver la lista de WATCHLIST de un usuario dado su ID
# @app.route('/verwatchlist', methods=['POST'])
# def ver_watchlist():
#     response = verwatchlist(request)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# #! Endpoint para ver
# @app.route('/verinfopelicula', methods=['POST'])
# def ver_peliporuser():
#     response = getpeliporuser(request)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# #! Endpoint para promedio
# @app.route('/promediototal', methods=['POST'])
# def promedio_total():
#     response = promediototal(request)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

# #! Endpoint para quitar watchlist
# @app.route('/quitwatchlist', methods=['POST'])
# def quit_watchlist():
#     response = quitwatchlist(request)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

#! Endpoint para quitar watchlist
@app.route('/info-actor', methods=['POST'])
def obtener_info_actor():
    resprev = get_info_actor(request)
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()