# Generated by Django 4.2.7 on 2023-12-15 19:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0024_usernumber_updating_result'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usernumber',
            name='updating_result',
        ),
    ]
