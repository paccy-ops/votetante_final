from django.urls import path
from base.views import post_views as views

urlpatterns = [
    path('', views.getPosts, name="posts"),
    path('create/', views.createPost, name="post-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('update/<str:pk>/', views.updatePost, name="post-update"),
    path('<str:pk>/', views.getPost, name="post"),
    path('delete/<str:pk>/', views.deletePost, name="post-delete"),

]
