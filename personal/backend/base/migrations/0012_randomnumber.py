# Generated by Django 4.2.7 on 2023-12-13 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_bookmark_bookmarked_product_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RandomNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('generated_number', models.CharField(blank=True, editable=False, max_length=6)),
            ],
        ),
    ]
