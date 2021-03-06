# Generated by Django 3.1.7 on 2021-04-06 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_auto_20210406_0423'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customeruser',
            name='profile_pic',
            field=models.ImageField(blank=True, default='profile.png', null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='post',
            name='post_image',
            field=models.ImageField(blank=True, default='placeholder.png', null=True, upload_to=''),
        ),
    ]
