import pymysql #pyMySQL is a python library for connecting to a MySQL database server from Python.This module has lots of features like it mad CRUD operations simple.
import pymysql.cursors
from flask import jsonify

def addwatchlist(request):
    # Obtener el JSON enviado por el cliente
    print(request.get_json())
    favorito=False
    fav=0
    data = request.get_json()
    idUser = data['iduser']
    idMovie = data['idmovie']
    #* █████████████████████ CONNECT WITH DATABASE:█████████████████████
    connection = pymysql.connect(host='localhost',user='root',password='2412',db='dbayd')
                        # charset='utf8mb4',
                        # cursorclass=pymysql.cursors.DictCursro
    # Ejecutar una consulta para obtener todas las peliculas
    try:
        with connection.cursor() as cursor:
            # Read a single record
            sql0 = '''
                SELECT idwatchlist FROM watchlist WHERE user_iduser = %s AND movie_idmovie = %s
            '''
            cursor.execute(sql0, (idUser, idMovie))
            result = cursor.fetchall()
            print(result)
            if (result==()):
                sql = '''
                    INSERT INTO watchlist (user_iduser, movie_idmovie) VALUES (%s, %s)
                '''
                cursor.execute(sql, (idUser, idMovie))
                favorito=True
                # Siempre cerrar la conexión a la base de datos
                connection.commit()
            else:
                
                sql1 = '''
                    DELETE FROM watchlist WHERE user_iduser = %s AND movie_idmovie = %s
                '''
                cursor.execute(sql1, (idUser, idMovie))
                favorito=False
                # Siempre cerrar la conexión a la base de datos
                connection.commit()

            if connection:
                connection.close()
            return jsonify({'res': favorito})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if connection:
            connection.close()
        return jsonify({'res': False})