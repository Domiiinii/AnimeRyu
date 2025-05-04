from django.db import models
from django.contrib.auth.models import User

class Anime(models.Model):
    mal_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    trailer_url = models.URLField(blank=True, null=True)

class WatchlistItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'anime')