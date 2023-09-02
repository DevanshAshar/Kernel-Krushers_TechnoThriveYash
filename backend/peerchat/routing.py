# chat/routing.py
from django.urls import re_path,path

from . import consumers

websocket_urlpatterns = [
    path('ws/message/<str:username>',consumers.ChatConsumer.as_asgi())
]
