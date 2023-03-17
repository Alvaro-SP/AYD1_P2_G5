import pymysql #pyMySQL is a python library for connecting to a MySQL database server from Python.This module has lots of features like it mad CRUD operations simple.
import pymysql.cursors
from flask import jsonify
def verwatchlist(request):
    # Obtener el JSON enviado por el cliente
    data = request.get_json()
    print(data)
    idUser = data['iduser']
    #* █████████████████████ CONNECT WITH DATABASE:█████████████████████
    connection = pymysql.connect(host='localhost',user='root',password='2412',db='dbayd')
                        # charset='utf8mb4',
                        # cursorclass=pymysql.cursors.DictCursro
    # Ejecutar una consulta para obtener todas las peliculas
    try:
        with connection.cursor() as cursor:
            # Read a single record
            sql = '''
                SELECT nombre, director, anio, resumen, poster,idmovie FROM movie
                INNER JOIN watchlist ON movie.idmovie = watchlist.movie_idmovie
                WHERE watchlist.user_iduser = %s;
            '''
            cursor.execute(sql, idUser)
            result = cursor.fetchall()
            #print(result)
            templist = []
            for fila in result:
                atributos = {'id': fila[5], 'nombre': fila[0], 'director' : fila[1], 'anio' : fila[2], 'resumen' : fila[3], 'poster' : fila[4]}
                templist.append(atributos)
            # Siempre cerrar la conexión a la base de datos
            if connection:
                connection.close()
            return jsonify({'res': templist})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if connection:
            connection.close()
        return jsonify({'res': False})