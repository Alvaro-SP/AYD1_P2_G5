import pymysql #pyMySQL is a python library for connecting to a MySQL database server from Python.This module has lots of features like it mad CRUD operations simple.
import pymysql.cursors
from flask import jsonify
import os
import pandas.io.sql as sql
from configparser import ConfigParser
import pandas as pd
import json
actor = []
pelicula = []
reparto = []
recurso = []

#! ████████████████████████ TAKE THE CSV FILES ████████████████████████
def takeCSV(pathactor, pathpelicula, pathreparto, pathrecurso):
    global actor, pelicula, reparto, recurso
    # Tomo en varios DataFrames to Lists
    # Leo los archivos CSV en DataFrames
    df_actor = pd.read_csv(r"backend/src/entradas/actor.csv", delimiter=',')
    df_pelicula = pd.read_csv(r"backend/src/entradas/movies.csv", delimiter=',')
    df_reparto = pd.read_csv(r"backend/src/entradas/reparto.csv", delimiter=',')
    df_recurso = pd.read_csv(r"backend/src/entradas/recursos.csv", delimiter=',')
    # Convierto los DataFrames en listas
    actor = df_actor.values.tolist()
    pelicula = df_pelicula.values.tolist()
    reparto = df_reparto.values.tolist()
    recurso = df_recurso.values.tolist()

def cargamasiva(request):
    # Obtener el JSON enviado por el cliente
    data = request.get_json()
    pathactor = data['pathactor']
    pathpelicula = data['pathpelicula']
    pathreparto = data['pathreparto']
    pathrecurso = data['pathrecurso']
    print(pathactor, " ", pathpelicula, " ", pathreparto, " ", pathrecurso)
    #* █████████████████████  TAKE THE CSV FILES █████████████████████
    takeCSV(pathactor, pathpelicula, pathreparto, pathrecurso)

    #! █████████████████████ CONNECT WITH DATABASE:█████████████████████
    connection = pymysql.connect(host='localhost',user='root',password='secret',db='dbayd')
                        # charset='utf8mb4',
                        # cursorclass=pymysql.cursors.DictCursro
    # Ejecutar la insercion
    try:
        #* █████████████████████ INSERT ALL DATA IN MYSQL MOTOR: █████████████████████
        with connection.cursor() as cursor:
            # ! ↓↓↓↓↓↓↓↓↓ INSERTANDO ACTOR ↓↓↓↓↓↓↓↓↓
            query = "INSERT INTO actor (nombre, resumen, foto, fechanacimiento) VALUES ({}, {}, {}, {})"
            for ca in actor:
                fq=query.format("\'"+ca[0]+"\'", "\'"+ca[1].replace("\'", "\'\'")+"\'", "\'"+ca[2].replace("\'", "\'\'")+"\'", "\'"+ca[3]+"\'");
                print(fq)
                cursor.execute(fq)
            # ! ↓↓↓↓↓↓↓↓↓ INSERTANDO PELICULA ↓↓↓↓↓↓↓↓↓
            query = "INSERT INTO movie (nombre, director, anio, resumen, poster) VALUES ({}, {}, {}, {}, {})"
            for ca in pelicula:
                fq=query.format("\'"+ca[0].replace("\'", "\'\'")+"\'", "\'"+ca[1].replace("\'", "\'\'")+"\'", ca[2], "\'"+ca[3].replace("\'", "\'\'")+"\'", "\'"+ca[4].replace("\'", "\'\'")+"\'");
                print(fq)
                cursor.execute(fq)
            # ! ↓↓↓↓↓↓↓↓↓ INSERTANDO RECURSO ↓↓↓↓↓↓↓↓↓
            query = "INSERT INTO movie_image (link_image, movie_idmovie) VALUES ({}, {})"
            for ca in recurso:
                fq=query.format("\'"+ca[0].replace("\'", "\'\'")+"\'", ca[1]);
                print(fq)
                cursor.execute(fq)
            # connection is not autocommit by default. So you must commit to save
            # your changes.
            
            # ! ↓↓↓↓↓↓↓↓↓ INSERTANDO REPARTO ↓↓↓↓↓↓↓↓↓
            query = "INSERT INTO film_cast (movie_idmovie, actor_idactor) VALUES ({}, {})"
            for ca in reparto:
                fq=query.format( ca[0], ca[1]);
                print(fq)
                cursor.execute(fq)
            connection.commit()
            # Siempre cerrar la conexión a la base de datos
            if connection:
                connection.close()
            return jsonify({'res': True})

    except Exception as ex:
            # Siempre cerrar la conexión a la base de datos
        print(ex)
        if connection:
            connection.close()
        return jsonify({'res': False})