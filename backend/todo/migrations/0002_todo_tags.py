# Generated by Django 4.2.3 on 2023-07-24 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='tags',
            field=models.CharField(default='', max_length=100),
        ),
    ]
