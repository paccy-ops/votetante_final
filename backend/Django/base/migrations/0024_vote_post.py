# Generated by Django 3.1.7 on 2021-04-07 10:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_auto_20210407_0847'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='post',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.post'),
        ),
    ]