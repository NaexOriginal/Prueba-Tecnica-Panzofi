import os
import django
import random
import string

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin_console.settings')
django.setup()

from users.models import CustomUser, Role 

def generar_contrasena(longitud = 10):
  caracteres = string.ascii_letters + string.digits
  return ''.join(random.choice(caracteres) for _ in range(longitud))

def crear_correos():
  correos_file = 'correos.txt'
  
  with open(correos_file, 'w') as file:
    admin_email = 'admin@gmail.com'
    admin_password = generar_contrasena()
    
    admin_user, created = CustomUser.objects.get_or_create(
      email = admin_email,
      defaults = { 'role': Role.ADMIN }
    )
    
    if created:
      admin_user.set_password(admin_password)
      admin_user.save()
      
    file.write(f'ADMIN: { admin_email }, { admin_password }\n')
    
    for x in range(1, 36):
      user_email = f'usuario{x}@panzofi.com'
      user_password = generar_contrasena()
      
      user, created = CustomUser.objects.get_or_create(
        email = user_email,
        defaults = { 'role': Role.USER }
      )
      
      if created:
        user.set_password(user_password)
        user.save()
        
      file.write(f'USER: { user_email }, { user_password }\n')
      
    print(f'Se ha creado correctamente el administrador y los 35 usuarios regulares. Todos los datos estan en \'{ correos_file }\'')
    
if __name__ == '__main__':
  crear_correos()
  