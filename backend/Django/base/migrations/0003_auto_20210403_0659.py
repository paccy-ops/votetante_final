# Generated by Django 3.1.7 on 2021-04-03 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_auto_20210329_0344'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customeruser',
            name='image',
            field=models.ImageField(blank=True, default='/placehorder.png', null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='post',
            name='post_image',
            field=models.ImageField(blank=True, default='/placehorder.png', null=True, upload_to=''),
        ),
    ]
