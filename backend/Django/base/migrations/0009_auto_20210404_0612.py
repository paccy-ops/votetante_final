# Generated by Django 3.1.7 on 2021-04-04 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_auto_20210403_0834'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='address',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='candidate',
            name='bio',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='candidate',
            name='candidate_email',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
