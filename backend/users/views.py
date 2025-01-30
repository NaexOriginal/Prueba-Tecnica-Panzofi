from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from .models import CustomUser, CustomAccessToken
from .serializer import CustomUserSerializer, LoginSerializer

# Create your views here.
class RegisterUserView(APIView):
  def post(self, request):
    serializer = CustomUserSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
  
class UserListView(APIView):
  def get(self, request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)
  
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
      
      return Response({
        'access': str(access_token),
        'refresh': str(refresh),
        'role': str(role)
      }, status = status.HTTP_200_OK)
    return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST)
  
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
      