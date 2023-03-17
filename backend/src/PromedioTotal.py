import mysql.connector
from flask import jsonify

def promediototal(request):
    # Parsear data
    data = request.get_json()

    # Capturar datos
    idMovie = data['idmovie']
    idUser = data['iduser']
    #* █████████████████████ CONNECT WITH DATABASE:█████████████████████
    try:
        conection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="2412",
            database="dbayd"
        )
        print("Conexión establecida correctamente.")

    except mysql.connector.Error as error:
        # Retornar error en caso de no poder conectarse
        print(f"No se pudo conectar a la base de datos: {error}")
        return {
            "res": False,
        }
    
    # Crear un cursor para interactuar con la base de datos
    cursor = conection.cursor()

    # Preparar la consulta
    sql = '''
        SELECT rating
        FROM movie_rating mr
        WHERE movie_idmovie = %s AND user_iduser = %s'''
    valores = (idMovie,idUser,)

    # Ejecutar la consulta
    cursor.execute(sql, valores)

    # Obtener el usuario
    res = cursor.fetchone()

    # Cerar la conexión
    conection.close()
    
    if res:
        return jsonify({
            "res": res[0]
        })
    
    return jsonify({
        "res": None
    })
