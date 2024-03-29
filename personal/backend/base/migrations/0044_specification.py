# Generated by Django 4.2.7 on 2023-12-25 06:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0043_bookmark_bookmarked_product_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Specification',
            fields=[
                ('specification_one', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_two', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_three', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_four', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_five', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_six', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_seven', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_eight', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_nine', models.CharField(blank=True, max_length=264, null=True)),
                ('specification_ten', models.CharField(blank=True, max_length=264, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
