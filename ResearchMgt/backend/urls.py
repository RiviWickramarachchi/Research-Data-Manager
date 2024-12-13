from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.UserTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.UserRegisterView.as_view(), name='user_register'),
    path('test/', views.testEndPoint, name='test'),
    path('generateid/', views.generate_unique_id, name='generate_id'),
    # path('addaddress/', views.add_post_address, name='add_post_address'),
    # path('postaddresses/',views.get_addresses, name='get_vals'),
    # path('updateaddressviewstats/<str:address_id>/',views.update_addressViewStat,name='update_address_view_stat'),
    # path('deleteaddress/<str:address_id>/', views.delete_address, name = 'delete_address'),
    #path('', views.getRoutes),
    #get post addresses
    #path('getAddress/<int:pk>',views.GetPostAddressDetails.as_view(), name='get_address_details'),
]