from django.urls import path
from .views import RegisterUserView, UserListView, LoginView, TokenVerifyView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('list-users/', UserListView.as_view(), name='user-list'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify-token/', TokenVerifyView.as_view(), name='verify-token')
]
