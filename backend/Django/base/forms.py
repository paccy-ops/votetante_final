from django import forms
from .models import *
from django.contrib.auth.forms import UserCreationForm


class CustomerUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomerUser
        fields = '__all__'
