# Generated by Django 3.1.7 on 2021-04-06 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_auto_20210406_0454'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customeruser',
            name='profile_pic',
        ),
        migrations.AddField(
            model_name='customeruser',
            name='image',
            field=models.ImageField(blank=True, default='', null=True, upload_to=''),
        ),
    ]
