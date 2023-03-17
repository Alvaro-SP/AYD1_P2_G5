import mysql.connector

def rate_movie(request):
    # Parsear data
    data = request.get_json()

    # Capturar datos
    id_user = data['id_user']
    id_movie = data['id_movie']
    rate = data['rate']

    # Intentar conexión con la base de datos
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

    # Preparar la transacción
    sql = "INSERT INTO movie_rating (rating, user_iduser, movie_idmovie) VALUES (%s, %s, %s)"
    vals = (rate, id_user, id_movie)

    # Ejecutar la transacción
    cursor.execute(sql, vals)

    # Confirmar la inserción en la base de datos
    conection.commit()
    print("Calificación insertada correctamente.")

    # Cerrar la conexión
    conection.close()

    # Retornar respuesta
    return {
        "res": True
    }