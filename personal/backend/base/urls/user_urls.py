from django.urls import path
from ..views.user_views import *


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('profile/', GetUserProfile.as_view(), name='user-profile'),
    path('delete/', deleteAccount.as_view(), name='delete'),
    path('profile/update/', UpdateUserProfile.as_view(), name='user-profile-update'),
    path('', GetUsersView.as_view(), name='users'),
    path('<str:pk>/', GetUserById.as_view(), name='user'),
    path('update/<str:pk>/', UpdateUser.as_view(), name='user-update'),
    path('delete/<str:pk>/', deleteUser.as_view(), name='user-delete'),


]
