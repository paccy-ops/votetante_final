# Generated by Django 3.1.7 on 2021-04-03 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_auto_20210403_0832'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customeruser',
            name='isApply',
        ),
        migrations.AddField(
            model_name='post',
            name='isApplying',
            field=models.BooleanField(default=False),
        ),
    ]
