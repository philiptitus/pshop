# Generated by Django 4.2.7 on 2023-12-18 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0032_alter_databasecart_databasecart_product_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='databasecart',
            name='DatabaseCart_product_image',
            field=models.ImageField(blank=True, default='/meganfox.webp', null=True, upload_to=''),
        ),
    ]
