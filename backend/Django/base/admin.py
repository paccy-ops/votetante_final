from django.contrib import admin
from .models import *
from .forms import CustomerUserCreationForm
from django.contrib.auth.admin import UserAdmin


# Register your models here.

class CustomerUserAdmin(UserAdmin):
    model = CustomerUser
    add_form = CustomerUserCreationForm

    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'user profile',
            {
                'fields': (
                    'bio',
                    'location',
                    'birth_date',
                    'isCandidate',
                    'image',

                )
            }
        )
    )


admin.site.register(CustomerUser, CustomerUserAdmin)
admin.site.register(Post)
admin.site.register(Candidate)
admin.site.register(Vote)
