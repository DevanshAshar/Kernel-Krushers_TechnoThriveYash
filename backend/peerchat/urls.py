from django.urls import path,include
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('roomlist/',GetRoomAPI.as_view(),name='list-room'),
    path('chatresponse/',ChatAPI.as_view(),name='chat-response'),
    path('chatcsv',ChatCSV.as_view(),name='csv'),
    path('stressuser/',StressUserView.as_view(),name='stress_user')
]

