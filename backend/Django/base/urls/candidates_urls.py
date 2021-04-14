from django.urls import path
from base.views import candidate_views as views

urlpatterns = [
    path('', views.getCandidates, name="candidates"),
    path('update/<str:pk>/', views.updateCandidate, name="candidate-update"),
    path('<str:pk>/cast/', views.castVote, name="candidate-cast"),
    path('<str:pk>/create/', views.CreateCandidate, name="post-create"),
    path('<str:pk>/', views.getCandidate, name="candidate"),
    path('post/<str:pk>/', views.getCandidateByPost, name="post-candidate"),
    path('delete/<str:pk>/', views.deleteCandidate, name="post-delete"),
]
