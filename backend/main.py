from flask import Flask, request, jsonify
from src.Vercatalogo import vercatalogo
from src.Cargamasiva import cargamasiva
from src.AddUser import add_user

from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

#! Endpoint para obtener todas las MOVIES
@app.route('/Vercatalogo', methods=['GET'])
def ver_catalogo():
    response = vercatalogo()
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#! Endpoint para la carga masiva
@app.route('/Cargamasiva', methods=['POST'])
def carga_masiva():
    resprev = cargamasiva(request)
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#! Endpoint para agregar un usuario
@app.route('/register', methods=['POST'])
def agregar_usuario():
    resprev = add_user(request)
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()