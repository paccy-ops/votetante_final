# Generated by Django 3.1.7 on 2021-04-12 03:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0031_auto_20210408_0220'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='post',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.post'),
        ),
    ]
