from django.urls import path
from .views import UserRegister,UserList,UserDetails,MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('token/',MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(),name='token_refresh'),
    path('user-list/',UserList.as_view(),name='user_list'),
    path('user-detail/<int:id>/',UserDetails.as_view(),name='user_details'),
    path('user-register/',UserRegister.as_view(),name="user_register"),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
