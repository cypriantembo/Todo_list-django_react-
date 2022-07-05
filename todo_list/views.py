from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from todo_list.serializers import TaskSerializer
# Create your views here.


class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer