# chat/routing.py
from django.urls import re_path,path

from . import consumers

websocket_urlpatterns = [
    path('<str:lobby_code>/',consumers.ChatConsumer.as_asgi())
]
