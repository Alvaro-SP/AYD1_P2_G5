import bcrypt

def encrypt_pass(password):
    # Encriptar contraseña
    password = password.encode('utf-8')
    salt = bcrypt.gensalt()
    password = bcrypt.hashpw(password, salt)
    # password = password.decode('utf-8')

    # Retornar contraseña encriptada
    return password
