from django.urls import path,include
from .views import *

urlpatterns = [
    path('roomlist/',GetRoomAPI.as_view(),name='list-room'),
    path('chatresponse/',ChatAPI.as_view(),name='chat-response'),
    path('chatcsv',ChatCSV.as_view(),name='csv')
]
