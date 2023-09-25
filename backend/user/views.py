from django.shortcuts import render
from rest_framework.mixins import  CreateModelMixin
from rest_framework.generics import GenericAPIView
from .models import FormSubmitByUser
from .serializers import StressFormSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class SubmitFormView(GenericAPIView,CreateModelMixin):
    permission_classes = [IsAuthenticated]
    queryset  = FormSubmitByUser.objects.all()
    serializer_class = StressFormSerializer
    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)