import uuid
from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

# Create your models here.
class Role(models.TextChoices):
  ADMIN = 'ADMIN', 'Administrador'
  USER = 'USER', 'Usuario Comun'
  
class CustomUserManager(BaseUserManager):
  def create_user(self, email, password=None, **extra_fields):
    if not email:
      raise ValueError("El correo electrónico debe ser proporcionado")
    
    email = self.normalize_email(email)
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_superuser(self, email, password=None, **extra_fields):
    extra_fields.setdefault("role", Role.ADMIN)
    return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
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
  
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['role']
  
  objects = CustomUserManager()
  
  def set_password(self, raw_password):
    self.password = make_password(raw_password)       # Encripta la contraseña antes de guardarla

class SessionLog(models.Model):
  user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
  login_time = models.DateTimeField(auto_now_add = True)
  logout_time = models.DateTimeField(null = True, blank = True)
  
  @property
  def duration(self):
    if self.logout_time:
      total_seconds = (self.logout_time - self.login_time).total_seconds()
      minutes = int(total_seconds // 60)
      seconds = int(total_seconds % 60)      
      return f"{minutes} min {seconds} seg" if minutes > 0 else f"{seconds} seg"
    return 'N/A'
  
class ButtonClick(models.Model):
  user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
  button_number = models.IntegerField(choices = [(1, 'Botón 1'), (2, 'Botón 2')])
  click_time = models.DateTimeField(auto_now_add = True)

class CustomAccessToken(AccessToken):
  def __init__(self, *args, **kargs):
    super().__init__(*args, **kargs)
    self.payload['role'] = self.get('role')