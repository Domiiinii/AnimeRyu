from django.urls import path
from .views import WatchlistViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('watchlist/', WatchlistViewSet.as_view({'get': 'list', 'post': 'add'})),
    path('watchlist/remove/', WatchlistViewSet.as_view({'post': 'remove'})),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
