# Generated by Django 3.1.7 on 2021-04-06 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_auto_20210406_0508'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customeruser',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]