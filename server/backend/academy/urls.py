from django.urls import path
from .views import LatestModulesAPIView, SubmitAnswersAPIView, UserProgressAPIView

urlpatterns = [
    path('modules/latest/', LatestModulesAPIView.as_view(), name='latest-modules'),
    path('modules/submit-answers/', SubmitAnswersAPIView.as_view(), name='submit-answers'),
    path('progress/', UserProgressAPIView.as_view(), name='user-progress'),
]
