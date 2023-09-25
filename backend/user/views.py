from django.shortcuts import render
from rest_framework.mixins import  CreateModelMixin
from rest_framework.generics import GenericAPIView
from .models import FormSubmitByUser
from .serializers import StressFormSerializer
# Create your views here.

class SubmitFormView(GenericAPIView,CreateModelMixin):
    queryset  = FormSubmitByUser.objects.all()
    serializer_class = StressFormSerializer
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)