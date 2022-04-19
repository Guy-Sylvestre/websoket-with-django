from django.urls import path
from . import views

urlpatterns = [
    path('', views.frontalPage, name='frontalpage'),
    path('signup/', views.signUp, name='signup'),
]