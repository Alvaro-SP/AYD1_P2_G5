import mysql.connector
import bcrypt

def log_user(request):
    # Parsear data
    data = request.get_json()

    # Capturar datos
    email = (data['email']).lower()
    password = data['pass']

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
            "type": 0
        }

    # Crear un cursor para interactuar con la base de datos
    cursor = conection.cursor()

    # Preparar la consulta
    sql = "SELECT * FROM user WHERE correo = %s"
    valores = (email,)

    # Ejecutar la consulta
    cursor.execute(sql, valores)

    # Obtener el usuario
    user = cursor.fetchone()

    # Cerar la conexión
    conection.close()

    # Verificar si el usuario existe
    if user:
        # Verificar si la contraseña es correcta
        if bcrypt.checkpw(password.encode('utf-8'), user[4].encode('utf-8')):
            # Retornar usuario
            return {
                "res": True,
                "user": {
                    "id": user[0],
                    "name": user[1],
                    "lastname": user[2],
                    "email": user[3]
                }
            }

    # Retornar error si las credenciales son incorrectas
    return {
        "res": False,
        "type": 1
    }
