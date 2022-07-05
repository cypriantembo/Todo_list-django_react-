
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('todo', views.TaskView)
    #http://127.0.0.1:8000/todo/ [get, post]
    #http://127.0.0.1:8000/todo/1 [get put delete]by id


urlpatterns = [
    path('', include(router.urls))
]
