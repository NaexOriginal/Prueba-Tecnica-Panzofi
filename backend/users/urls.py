from django.urls import path
from .views import RegisterUserView, UserListView, LoginView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('login/', LoginView.as_view(), name='login'),
]
