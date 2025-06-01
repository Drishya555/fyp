from django.urls import path
from . import views

urlpatterns = [
    path('pneumonia/', views.predict_pneumonia),
    path('braintumor/', views.predict_brain_tumor),
]