from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Anime, WatchlistItem
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import AnimeSerializer, WatchlistItemSerializer

class WatchlistViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        items = WatchlistItem.objects.filter(user=request.user)
        serializer = WatchlistItemSerializer(items, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add(self, request):
        anime_data = request.data.get('anime')
        if not anime_data:
            return Response({'error': 'No anime data provided'}, status=400)

        anime, created = Anime.objects.get_or_create(
            mal_id=anime_data['mal_id'],
            defaults={
                'title': anime_data['title'],
                'image_url': anime_data['image_url'],
                'trailer_url': anime_data.get('trailer_url', '')
            }
        )
        item, created = WatchlistItem.objects.get_or_create(user=request.user, anime=anime)
        return Response({'added': not created})

    @action(detail=False, methods=['post'])
    def remove(self, request):
        mal_id = request.data.get('mal_id')
        try:
            anime = Anime.objects.get(mal_id=mal_id)
            WatchlistItem.objects.get(user=request.user, anime=anime).delete()
            return Response({'removed': True})
        except (Anime.DoesNotExist, WatchlistItem.DoesNotExist):
            return Response({'error': 'Not found'}, status=404)