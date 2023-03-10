from src.EncryptPass import encrypt_pass
import mysql.connector

def add_user(request):
    # Parsear data
    data = request.get_json()
    
    # Capturar datos
    name = data['name']
    lastname = data['lastname']
    email = (data['email']).lower()
    password = encrypt_pass(data['pass'])
    
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
    
    # Preparar la transacción
    sql = "INSERT INTO user (nombre, apellido, correo, contrasena) VALUES (%s, %s, %s, %s)"
    valores = (name, lastname, email, password)
    
    # Intentar ejecutar la transacción
    try:
        cursor.execute(sql, valores)
        
        # Confirmar la inserción en la base de datos
        conection.commit()
        print("Usuario insertado correctamente.")

    except mysql.connector.Error as error:
        # Deshacer la inserción en caso de error
        conection.rollback()
        print(f"No se pudo insertar el usuario: {error}")
        
        # Finalizar la conexión
        conection.close()
        
        # Retornar error en caso de no poder insertar el usuario
        return {
            "res": False,
            "type": 1
        }
    
    # Obtener el id del registro insertado
    id_user = cursor.lastrowid
    
    # Preparar la consulta
    sql = "SELECT * FROM user WHERE iduser = %s"
    valores = (id_user,)
    
    # Ejecutar la consulta
    cursor.execute(sql, valores)
    
    # Recuperar el registro insertado
    user = cursor.fetchone()
    
    # Cerrar la conexión
    conection.close()
    
    # Retornar el registro insertado
    return {
        "res": True,
        "user": {
            "id": user[0],
            "name": user[1],
            "lastname": user[2],
            "email": user[3],
        }
    }
