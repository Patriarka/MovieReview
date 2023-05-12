from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PublicationViewSet

router = DefaultRouter()
router.register(r'usuarios', UserViewSet)
router.register(r'publicacoes', PublicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('feed/', PublicationViewSet.as_view({ 'get': 'feed' }), name='pegar_feed'),
]