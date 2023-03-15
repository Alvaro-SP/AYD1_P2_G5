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
    valores = (id,)
    
    # Ejecutar la consulta
    cursor.execute(sql, valores)

    # Obtener el actor
    actor = cursor.fetchone()
    
    
    
    # Cerar la conexión
    conection.close()
    
    # Retornar la información del actor
    return {
        "res": True,
        "actor": {
            "id": actor[0]
        }
    }

