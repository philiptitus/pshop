# Generated by Django 4.2.7 on 2023-12-24 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0042_product_brand_name_alter_product_brand'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookmark',
            name='bookmarked_product_image',
            field=models.ImageField(blank=True, default='/meganfox.webp', null=True, upload_to=''),
        ),
    ]
