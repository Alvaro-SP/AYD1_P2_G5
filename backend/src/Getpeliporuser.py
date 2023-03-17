import pymysql #pyMySQL is a python library for connecting to a MySQL database server from Python.This module has lots of features like it mad CRUD operations simple.
import pymysql.cursors
from flask import jsonify
import json
def getpeliporuser(request):
    # Obtener el JSON enviado por el cliente
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
            flag=False
            # Read a single record
            sql = '''
                SELECT movie.poster, movie.idmovie, movie.nombre, movie.director, movie.anio, movie.resumen, film_cast.actor_idactor, actor.nombre, actor.foto, movie_image.idimage, movie_image.link_image
                FROM movie
                LEFT JOIN film_cast ON movie.idmovie = film_cast.movie_idmovie
                LEFT JOIN actor ON film_cast.actor_idactor = actor.idactor
                LEFT JOIN movie_image ON movie.idmovie = movie_image.movie_idmovie
                WHERE movie.idmovie = %s;
            '''
            cursor.execute(sql, (idMovie))
            result = cursor.fetchall()
            # print(result)
            movie_info = {}
            actors = {}
            images = {}
            sql0 = '''
                SELECT idwatchlist FROM watchlist WHERE user_iduser = %s AND movie_idmovie = %s
            '''
            cursor.execute(sql0, (idUser, idMovie))
            result1 = cursor.fetchall()
            if (result1==()):
                flag=False
            else:
                flag=True

            sql2 = '''
                SELECT AVG(movie_rating.rating)
                FROM movie_rating
                WHERE movie_rating.movie_idmovie = %s;
            '''
            cursor.execute(sql2, (idMovie,))
            result2 = cursor.fetchone()
            movie_rating = result2
            #  LEFT JOIN movie_rating ON movie.idmovie = movie_rating.movie_idmovie
            for fila in result:
                movie_poster, movie_id, movie_name, movie_director, movie_year, movie_summary,  actor_id, actor_name, actor_photo, image_id, image_link = fila
                # Guardar información de la película
                movie_info = {
                    "id": movie_id,
                    "nombre": movie_name,
                    "director": movie_director,
                    "anio": movie_year,
                    "resumen": movie_summary,
                    "rating": movie_rating,
                    "watchlist": flag,
                    "poster": movie_poster
                }
                
                # Guardar información de los actores
                if actor_id not in actors:
                    actors[actor_id] = {
                        "idactor": actor_id,
                        "nombre": actor_name,
                        "foto": actor_photo
                    }
                
                # Guardar información de las imágenes
                if image_id not in images:
                    images[image_id] = {
                        "idimage": image_id,
                        "link_image": image_link
                    }
            # Convertir diccionarios a listas
            movie_info["actores"] = list(actors.values())
            movie_info["moviesimages"] = list(images.values())
            # Siempre cerrar la conexión a la base de datos
            if connection:
                connection.close()
            return jsonify({'res': movie_info})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if connection:
            connection.close()
        return jsonify({'res': False})