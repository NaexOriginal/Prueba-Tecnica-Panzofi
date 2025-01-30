from django.urls import path
from .views import (
    RegisterUserView, UserListView, LoginView, LogoutView,
    TokenVerifyView, ButtonClickView
    
)

urlpatterns = [
    # Autenticación
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # Usuarios
    path('list-users/', UserListView.as_view(), name='user_list'),
    
    # Botones
    path('button-click/', ButtonClickView.as_view(), name = 'button_click'),
]
