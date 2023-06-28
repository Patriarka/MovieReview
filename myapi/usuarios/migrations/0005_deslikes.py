# Generated by Django 4.1.7 on 2023-06-07 13:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0004_favoriteslist_movie_title_favoriteslist_poster_img'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deslikes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publication_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.publication')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]