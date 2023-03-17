import mysql.connector


def get_info_actor(request):
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
    sql = "SELECT * FROM actor WHERE idactor = %s"
    vals = (id,)

    # Ejecutar la consulta
    cursor.execute(sql, vals)

    # Obtener el actor
    actor = cursor.fetchone()
    
    # Preparar la consulta
    sql = " \
        SELECT m.idmovie, m.nombre, m.anio \
        FROM movie m \
        INNER JOIN film_cast fc \
        ON m.idmovie = fc.movie_idmovie \
        INNER JOIN actor a \
        ON fc.actor_idactor = a.idactor \
        WHERE a.idactor = %s \
        ORDER BY m.anio DESC \
        LIMIT 5"
    vals = (id,)
    
    # Ejecutar la consulta
    cursor.execute(sql, vals)
    
    # Obtener las películas
    movies = []
    rows = cursor.fetchall()
    for row in rows:
        # Crear diccionario de valores por cada película
        movies.append({
            "id": row[0],
            "name": row[1],
            "year": row[2]
        })

    # Cerar la conexión
    conection.close()

    # Retornar la información del actor
    return {
        "res": True,
        "actor": {
            "id": actor[0],
            "name": actor[1],
            "summary": actor[2],
            "image": actor[3],
            "date_nac": actor[4]
        },
        "movies": movies
    }
