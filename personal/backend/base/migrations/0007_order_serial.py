# Generated by Django 4.2.7 on 2023-12-12 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_product_isfavourite'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='serial',
            field=models.CharField(blank=True, max_length=10, null=True, unique=True),
        ),
    ]
