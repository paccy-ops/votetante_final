# Generated by Django 3.1.7 on 2021-04-06 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_auto_20210406_0420'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customeruser',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]