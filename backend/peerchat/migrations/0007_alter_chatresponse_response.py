# Generated by Django 4.2.4 on 2023-09-24 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('peerchat', '0006_alter_chatresponse_response'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatresponse',
            name='response',
            field=models.TextField(blank=True, null=True),
        ),
    ]
