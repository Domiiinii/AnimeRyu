from rest_framework import serializers
from .models import Anime, WatchlistItem

class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = ['mal_id', 'title', 'image_url', 'trailer_url']

class WatchlistItemSerializer(serializers.ModelSerializer):
    anime = AnimeSerializer()
    class Meta:
        model = WatchlistItem
        fields = ['anime', 'added_at']
