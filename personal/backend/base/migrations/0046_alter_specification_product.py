# Generated by Django 4.2.7 on 2023-12-25 08:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0045_alter_specification_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='specification',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product'),
        ),
    ]
