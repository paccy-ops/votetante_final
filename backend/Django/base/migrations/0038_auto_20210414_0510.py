# Generated by Django 3.1.7 on 2021-04-14 05:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0037_vote_post'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vote',
            name='post',
        ),
        migrations.AlterField(
            model_name='vote',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
