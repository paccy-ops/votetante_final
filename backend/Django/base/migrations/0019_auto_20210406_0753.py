# Generated by Django 3.1.7 on 2021-04-06 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_auto_20210406_0713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customeruser',
            name='image',
            field=models.ImageField(blank=True, default='profile.png', null=True, upload_to=''),
        ),
    ]