# Generated by Django 4.2.7 on 2023-12-21 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0036_databasecart_databasecart_product_countinstock'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('name', models.CharField(blank=True, max_length=264, null=True)),
                ('image', models.ImageField(blank=True, default='/meganfox.webp', null=True, upload_to='')),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
    ]
