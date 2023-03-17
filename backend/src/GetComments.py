import mysql.connector


def get_comments(request):
    # Parsear data
    data = request.get_json()

    # Capturar datos
    id = data['id']

    # Intentar conexión con la base de datos
    try:
        conection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="secret",
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
    sql = " \
        SELECT u.nombre, fc.comment  \
        FROM film_comment fc \
        INNER JOIN `user` u  \
        ON fc.user_iduser = u.iduser  \
        WHERE fc.movie_idmovie = %s \
        ORDER BY fc.idcomment DESC"
    vals = (id,)

    # Ejecutar la consulta
    cursor.execute(sql, vals)

    # Obtener los comentarios
    comments = []
    rows = cursor.fetchall()
    for row in rows:
        # Crear diccionario con el comentario
        comments.append({
            "user": row[0],
            "comment": row[1]
        })

    # Cerrar la conexión
    conection.close()

    # Retornar la información del actor
    return {
        "res": True,
        "comments": comments
    }
