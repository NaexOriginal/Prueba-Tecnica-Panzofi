import uuid
from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.
class Role(models.TextChoices):
  ADMIN = 'ADMIN', 'Administrador'
  USER = 'USER', 'Usuario Comun'

class CustomUser(models.Model):
  id = models.UUIDField(
    primary_key=True,
    default=uuid.uuid4,
    editable=False
  )
  email = models.EmailField(unique=True)
  password = models.CharField(max_length=128)
  role = models.CharField(
    max_length=15,
    choices=Role.choices,
    default=Role.USER
  )
  
  def set_password(self, raw_password):
    # Encripta la contraseña antes de guardarla
    self.password = make_password(raw_password)
