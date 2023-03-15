import pymysql #pyMySQL is a python library for connecting to a MySQL database server from Python.This module has lots of features like it mad CRUD operations simple.
import pymysql.cursors
from flask import jsonify
def vercatalogo():
    #* █████████████████████ CONNECT WITH DATABASE:█████████████████████
    connection = pymysql.connect(host='localhost',user='myuser',password='24122001.',db='dbayd')
                        # charset='utf8mb4',
                        # cursorclass=pymysql.cursors.DictCursro
    # Ejecutar una consulta para obtener todas las peliculas
    try:
        with connection.cursor() as cursor:
            # Read a single record
            sql = '''
                SELECT nombre, director, anio, resumen, poster,idmovie  FROM movie
            '''
            cursor.execute(sql)
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