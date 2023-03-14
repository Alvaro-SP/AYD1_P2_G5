import pymysql #pyMySQL is a python library for connecting to a MySQL database server from Python.This module has lots of features like it mad CRUD operations simple.
import pymysql.cursors
from flask import jsonify

def quitwatchlist(request):
    # Obtener el JSON enviado por el cliente
    data = request.get_json()
    idUser = data['iduser']
    idMovie = data['idmovie']
    #* █████████████████████ CONNECT WITH DATABASE:█████████████████████
    connection = pymysql.connect(host='localhost',user='myuser',password='24122001.',db='dbayd')
                        # charset='utf8mb4',
                        # cursorclass=pymysql.cursors.DictCursro
    # Ejecutar una consulta para obtener todas las peliculas
    try:
        with connection.cursor() as cursor:
            # Read a single record
            sql = '''
                DELETE FROM watchlist WHERE user_iduser = %s AND movie_idmovie = %s
            '''
            cursor.execute(sql, (idUser, idMovie))
            # Siempre cerrar la conexión a la base de datos
            connection.commit()
            if connection:
                connection.close()
            return jsonify({'res': True})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if connection:
            connection.close()
        return jsonify({'res': False})