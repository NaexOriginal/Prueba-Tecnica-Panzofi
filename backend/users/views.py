from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import CustomUser
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
      access_token = refresh.access_token
      
      role = user.role
      
      return Response({
        'acces': str(access_token),
        'refresh': str(refresh),
        'role': str(role)
      }, status = status.HTTP_200_OK)
    return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST)