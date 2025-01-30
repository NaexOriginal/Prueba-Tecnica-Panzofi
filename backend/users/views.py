from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.utils.timezone import now
from .models import CustomUser, CustomAccessToken, SessionLog, ButtonClick
from .serializer import CustomUserSerializer, LoginSerializer

# Create your views here.
class RegisterUserView(APIView):
  permission_classes = [AllowAny]
  
  def post(self, request):
    serializer = CustomUserSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
  
class UserListView(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self, request):
    users = CustomUser.objects.all()
    user_data = []
    
    for user in users:
      last_session = SessionLog.objects.filter(user = user).order_by('-login_time').first()
      session_duration = last_session.duration if last_session else None
      
      button1_clicks = ButtonClick.Objects.filter(user = user, button_number = 1).count()
      button2_clicks = ButtonClick.Objects.filter(user = user, button_number = 2).count()
      
      user_data.append({
        'id': str(user.id),
        'email': user.email,
        'role': user.role,
        'last_login': last_session.login_time if last_session else None,
        'session_duration': session_duration,
        'button1_clicks': button1_clicks,
        'button2_clicks': button2_clicks
      })
      
    return Response(user_data, status = status.HTTP_200_OK)
      
class LoginView(TokenObtainPairView):
  serializer_class = LoginSerializer
  
  def post(self, request):
    serializer = self.get_serializer(data=request.data)
    
    if serializer.is_valid(raise_exception=True):
      user = serializer.validated_data
      
      refresh = RefreshToken.for_user(user)
      access_token = CustomAccessToken.for_user(user)
      
      role = user.role
      access_token['role'] = role
      
      SessionLog.objects.create(user = user, login_time = now())
      
      return Response({
        'access': str(access_token),
        'refresh': str(refresh),
        'role': str(role)
      }, status = status.HTTP_200_OK)
    return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST)
  
class LogoutView(APIView):
  permission_classes = [IsAuthenticated]
  
  def post(self, request):
    user = request.user
    session = SessionLog.objects.filter(user = user, logout_time__isnull = True).last()
    
    if session:
      session.logout_time = now()
      session.save()
      
    return Response({ 'message': 'Cierre de Sesión Exitoso' }, status = status.HTTP_200_OK)

class ButtonClickView(APIView):
  permission_classes = [IsAuthenticated]
  
  def post(self, request):
    button_number = request.data.get('button_number')
    
    if button_number not in [1, 2]:
      return Response({ 'error': 'Número de bóton no valido' }, status = status.HTTP_400_BAD_REQUEST)
    
    ButtonClick.objects.create(user = request.user, button_number = button_number)
    return Response({ 'message': f'Clic en el botón {button_number} registrado' }, status = status.HTTP_200_OK)

class TokenVerifyView(APIView):
  permission_classes = [IsAuthenticated] 
  
  def post(self, request):
    try:
      auth_header = request.headers.get('Authorization')
      
      if not auth_header:
        return Response({ 'error': 'Falta el encabezado de Autorización' }, status = status.HTTP_400_BAD_REQUEST)
      
      if not auth_header.startswith('Bearer '):
        return Response({ 'error': 'Prefijo de Token Invalido' }, status = status.HTTP_400_BAD_REQUEST)
      
      access_token = auth_header.split(' ')[1]
      
      try: 
        token = CustomAccessToken(access_token)
        role = token['role']
        
        return Response({ 'role': role }, status = status.HTTP_200_OK)
      except Exception as e:
        return Response({ 'error': f'Token inválido: {str(e)}' }, status = status.HTTP_401_UNAUTHORIZED)
            
    except Exception as e:
      return Response({ 'error': str(e) }, status = status.HTTP_401_UNAUTHORIZED)
      