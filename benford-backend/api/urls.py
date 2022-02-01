from django.contrib import admin
from django.urls import path, include
from api.views import *

urlpatterns = [
    path('data-set', DataSetGenericApiView.as_view()),
    path('data-set/<int:pk>', DataSetGenericApiView.as_view()),
    path('data-set-form-data', get_data_set_form_data)
]
