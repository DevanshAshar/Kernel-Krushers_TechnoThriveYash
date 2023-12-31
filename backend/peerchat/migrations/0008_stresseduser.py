# Generated by Django 4.2.4 on 2023-09-24 13:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('peerchat', '0007_alter_chatresponse_response'),
    ]

    operations = [
        migrations.CreateModel(
            name='StressedUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('connect_code', models.CharField(max_length=6)),
                ('prompt_csv', models.FileField(upload_to='csv_files/prompt/')),
                ('form_csv', models.FileField(upload_to='csv_files/form/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
