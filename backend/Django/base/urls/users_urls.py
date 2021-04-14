from django.urls import path
from base.views import user_views as views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,

)

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getUsers, name="users"),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('upload/', views.UseruploadImage, name="upload-profile"),
    path('profile/update/', views.updateUserProfile, name="user-update"),
    path('register/', views.registerUser, name="user-register"),
    path('delete/<str:pk>/', views.deleteUser, name="user-delete"),
    path('<str:pk>/', views.getUserById, name="user-update"),
    path('update/<str:pk>/', views.updateUser, name="user-update"),

]
