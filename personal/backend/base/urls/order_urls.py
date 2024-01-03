from django.urls import path
from ..views.order_views import  *


urlpatterns = [
    path('', getOrders.as_view(),name='orders'),
    path('add/', addOrderItems.as_view(),name='orders-add'),
    path('myorders/', getMyOrders.as_view(),name='my-orders'),
    path('<str:pk>/deliver/', updateOrderToDelivered.as_view(),name='order-delivered'),
    path('<str:pk>/', getOrderById.as_view(),name='user-order'),
    path('<str:pk>/pay/', updateOrderToPaid.as_view(),name='pay'),


  
]
