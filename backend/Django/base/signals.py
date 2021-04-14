from django.db.models.signals import pre_save
from .models import CustomerUser

def updateUser(sender,instance,**kwargs):
    user = instance
    if user.email != '':
        username = user.email
    

pre_save.connect(updateUser,sender=CustomerUser)
    