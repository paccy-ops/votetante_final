# Generated by Django 3.1.7 on 2021-04-08 02:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0030_auto_20210407_1558'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='postLive',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='isActive',
            field=models.BooleanField(default=False),
        ),
    ]
